-- Review deck sync: apply_events learns word_reviewed.
-- A review saves the word (lemma = the course word id) once and appends a review log
-- whose id is the event id. Card state is not stored; clients replay the logs with FSRS.
-- Spec: docs/learning-path/2026-10-24-learning-path-plan.md §7.4–7.5.

-- Applies a batch of client events for the caller. Idempotent per event id; a bad
-- event is reported in "rejected" and skipped without failing the rest of the batch.
-- Merge rules: completion is an OR, best_score is the max, attempts count distinct
-- events, first_done_at is the earliest, watch seconds add up (capped at 24h a day).
-- Guards: client_ts is clamped to [now - 1 year, now], payloads are capped at 4 KB and
-- refs at 128 chars, so one account cannot bloat the database or poison its own stats.
create or replace function public.apply_events(batch jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  uid        uuid := auth.uid();
  e          jsonb;
  v_id       uuid;
  v_kind     text;
  v_course   text;
  v_ref      text;
  v_payload  jsonb;
  v_ts       timestamptz;
  v_score    int;
  v_version  int;
  v_day      date;
  v_seconds  int;
  v_source   text;
  v_rating   int;
  v_term     text;
  v_word     uuid;
  n_applied  int := 0;
  n_dups     int := 0;
  rejected   jsonb := '[]'::jsonb;
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  if jsonb_typeof(batch) is distinct from 'array' then
    raise exception 'batch must be a json array' using errcode = '22023';
  end if;
  if jsonb_array_length(batch) > 500 then
    raise exception 'batch too large (max 500 events)' using errcode = '54000';
  end if;

  for e in select value from jsonb_array_elements(batch) loop
    begin
      v_id      := (e ->> 'id')::uuid;
      v_kind    := e ->> 'kind';
      v_course  := e ->> 'course_id';
      v_ref     := nullif(e ->> 'ref', '');
      v_payload := coalesce(e -> 'payload', '{}'::jsonb);
      v_ts      := least(greatest(coalesce((e ->> 'client_ts')::timestamptz, now()), now() - interval '1 year'), now());
      v_score   := null;
      v_version := (v_payload ->> 'content_version')::int;

      if v_id is null then raise exception 'missing id'; end if;
      if v_course is null or v_course !~ '^[a-z]{2}-[a-z]{2}$' then raise exception 'bad course_id'; end if;
      if length(v_ref) > 128 then raise exception 'ref too long (max 128 chars)'; end if;
      if octet_length(v_payload::text) > 4096 then raise exception 'payload too large (max 4 KB)'; end if;

      case v_kind
        when 'scene_started', 'take_done' then
          if v_ref is null then raise exception '% needs ref', v_kind; end if;
        when 'scene_done', 'finale_done' then
          if v_ref is null then raise exception '% needs ref', v_kind; end if;
          v_score := round((v_payload ->> 'score')::numeric)::int;
          if v_score is null or v_score not between 0 and 100 then raise exception 'score must be 0..100'; end if;
        when 'watch_tick' then
          v_day     := (v_payload ->> 'day')::date;
          v_seconds := (v_payload ->> 'seconds')::int;
          v_source  := v_payload ->> 'source';
          if v_day is null then raise exception 'watch_tick needs day'; end if;
          if v_day not between (v_ts at time zone 'UTC')::date - 1 and (v_ts at time zone 'UTC')::date + 1 then
            raise exception 'day must be within a day of the event time';
          end if;
          if v_seconds is null or v_seconds not between 1 and 3600 then raise exception 'seconds must be 1..3600'; end if;
          if v_source is null or v_source not in ('path', 'extension', 'app') then raise exception 'bad source'; end if;
        when 'word_reviewed' then
          if v_ref is null then raise exception 'word_reviewed needs ref'; end if;
          v_rating := (v_payload ->> 'rating')::int;
          if v_rating is null or v_rating not between 1 and 4 then raise exception 'rating must be 1..4'; end if;
          v_term := v_payload ->> 'term';
          if v_term is null or length(v_term) not between 1 and 200 then raise exception 'term must be 1..200 chars'; end if;
        else
          raise exception 'unknown kind %', coalesce(v_kind, 'null');
      end case;

      insert into events (id, user_id, course_id, kind, ref, payload, client_ts)
      values (v_id, uid, v_course, v_kind, v_ref, v_payload, v_ts)
      on conflict (id) do nothing;
      if not found then
        if exists (select 1 from events where id = v_id and user_id <> uid) then
          raise exception 'event id already in use';
        end if;
        n_dups := n_dups + 1;
        continue;
      end if;

      case v_kind
        when 'scene_started' then
          insert into scene_progress (user_id, course_id, scene_id, status, content_version)
          values (uid, v_course, v_ref, 'started', v_version)
          on conflict (user_id, course_id, scene_id) do nothing;
        when 'scene_done' then
          insert into scene_progress (user_id, course_id, scene_id, status, best_score, attempts, content_version, first_done_at)
          values (uid, v_course, v_ref, 'done', v_score, 1, v_version, v_ts)
          on conflict (user_id, course_id, scene_id) do update set
            status          = 'done',
            best_score      = greatest(scene_progress.best_score, excluded.best_score),
            attempts        = scene_progress.attempts + 1,
            content_version = coalesce(excluded.content_version, scene_progress.content_version),
            first_done_at   = least(scene_progress.first_done_at, excluded.first_done_at),
            updated_at      = now();
        when 'watch_tick' then
          insert into watch_daily (user_id, course_id, day, seconds, source)
          values (uid, v_course, v_day, v_seconds, v_source)
          on conflict (user_id, course_id, day, source) do update set
            seconds = least(watch_daily.seconds + excluded.seconds, 86400);
        when 'finale_done' then
          insert into finale_attempts (id, user_id, course_id, episode_id, score, passed, answers, created_at)
          values (v_id, uid, v_course, v_ref, v_score, v_score >= 75, v_payload -> 'answers', v_ts);
        when 'word_reviewed' then
          insert into saved_words (user_id, course_id, term, lemma, source)
          values (uid, v_course, v_term, v_ref, 'path')
          on conflict (user_id, course_id, lemma) do nothing;
          select id into v_word from saved_words where user_id = uid and course_id = v_course and lemma = v_ref;
          insert into review_logs (id, user_id, word_id, rating, reviewed_at)
          values (v_id, uid, v_word, v_rating, v_ts);
        else
          null; -- take_done: logged only
      end case;

      n_applied := n_applied + 1;
    exception when others then
      rejected := rejected || jsonb_build_object('id', coalesce(e ->> 'id', ''), 'reason', sqlerrm);
    end;
  end loop;

  return jsonb_build_object('applied', n_applied, 'duplicates', n_dups, 'rejected', rejected);
end
$$;

revoke execute on function public.apply_events(jsonb) from public, anon;
grant execute on function public.apply_events(jsonb) to authenticated;
