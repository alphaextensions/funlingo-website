-- Learning path: per-user state only. Course content lives in content/courses/*.json
-- and is referenced here by its stable string ids (course_id, scene_id, episode_id).
-- Spec: docs/learning-path/2026-10-24-learning-path-plan.md §7.4–7.5.

-- ---------------------------------------------------------------- tables

create table public.profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  display_name   text,
  native_lang    text,
  ui_locale      text,
  daily_goal_min int not null default 10 check (daily_goal_min between 1 and 240),
  timezone       text,
  email_opt_in   boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table public.enrollments (
  user_id            uuid not null default auth.uid() references auth.users (id) on delete cascade,
  course_id          text not null,
  started_at         timestamptz not null default now(),
  current_episode_id text,
  placement          jsonb, -- {season, score, taken_at}
  primary key (user_id, course_id)
);

create table public.scene_progress (
  user_id         uuid not null references auth.users (id) on delete cascade,
  course_id       text not null,
  scene_id        text not null,
  status          text not null check (status in ('started', 'done')),
  best_score      smallint check (best_score between 0 and 100),
  attempts        int not null default 0,
  content_version int,
  first_done_at   timestamptz,
  updated_at      timestamptz not null default now(),
  primary key (user_id, course_id, scene_id)
);

create table public.finale_attempts (
  id         uuid primary key, -- the event id, so re-sends stay idempotent
  user_id    uuid not null references auth.users (id) on delete cascade,
  course_id  text not null,
  episode_id text not null,
  score      smallint not null check (score between 0 and 100),
  passed     boolean not null,
  answers    jsonb,
  created_at timestamptz not null default now()
);
create index finale_attempts_user_episode on public.finale_attempts (user_id, course_id, episode_id);

-- Append-only log: the sync source of truth and the analytics feed.
create table public.events (
  id         uuid primary key, -- generated on the client
  user_id    uuid not null references auth.users (id) on delete cascade,
  course_id  text not null,
  kind       text not null,
  ref        text,
  payload    jsonb not null default '{}'::jsonb,
  client_ts  timestamptz not null,
  created_at timestamptz not null default now()
);
create index events_user_created on public.events (user_id, created_at desc);

create table public.saved_words (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  course_id  text not null,
  term       text not null,
  lemma      text not null,
  gloss      jsonb,
  context    jsonb, -- {sentence, clip_id, t, still_url}
  source     text not null check (source in ('path', 'extension', 'app')),
  created_at timestamptz not null default now(),
  unique (user_id, course_id, lemma),
  unique (id, user_id) -- target for the owner-matching foreign keys below
);

create table public.review_cards (
  word_id      uuid primary key,
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  due          timestamptz not null default now(),
  stability    real not null default 0,
  difficulty   real not null default 0,
  reps         int not null default 0,
  lapses       int not null default 0,
  state        smallint not null default 0,
  last_review  timestamptz,
  known_marked boolean not null default false,
  foreign key (word_id, user_id) references public.saved_words (id, user_id) on delete cascade
);

create table public.review_logs (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null default auth.uid() references auth.users (id) on delete cascade,
  word_id        uuid not null,
  rating         smallint not null check (rating between 1 and 4),
  reviewed_at    timestamptz not null default now(),
  elapsed_days   real,
  scheduled_days real,
  foreign key (word_id, user_id) references public.saved_words (id, user_id) on delete cascade
);

create table public.watch_daily (
  user_id   uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  day       date not null,
  seconds   int not null default 0 check (seconds >= 0),
  source    text not null check (source in ('path', 'extension', 'app')),
  primary key (user_id, course_id, day, source)
);

-- ---------------------------------------------------------------- profile lifecycle

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.touch_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- privileges & RLS

-- Supabase grants everything to the API roles by default. Nobody anonymous reads
-- anything, nobody truncates (TRUNCATE bypasses RLS), and progress tables are
-- written only through apply_events.
revoke all on
  public.profiles, public.enrollments, public.scene_progress, public.finale_attempts, public.events,
  public.saved_words, public.review_cards, public.review_logs, public.watch_daily
  from anon;
revoke truncate, references, trigger on
  public.profiles, public.enrollments, public.scene_progress, public.finale_attempts, public.events,
  public.saved_words, public.review_cards, public.review_logs, public.watch_daily
  from authenticated;
revoke insert, update, delete on
  public.scene_progress, public.finale_attempts, public.events, public.watch_daily
  from authenticated;
revoke insert, delete on public.profiles from authenticated;

alter table public.profiles        enable row level security;
alter table public.enrollments     enable row level security;
alter table public.scene_progress  enable row level security;
alter table public.finale_attempts enable row level security;
alter table public.events          enable row level security;
alter table public.saved_words     enable row level security;
alter table public.review_cards    enable row level security;
alter table public.review_logs     enable row level security;
alter table public.watch_daily     enable row level security;

create policy own_profile_read on public.profiles for select to authenticated using (id = auth.uid());
create policy own_profile_write on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create policy own_rows on public.enrollments for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.saved_words for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.review_cards for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on public.review_logs for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy own_rows_read on public.scene_progress for select to authenticated using (user_id = auth.uid());
create policy own_rows_read on public.finale_attempts for select to authenticated using (user_id = auth.uid());
create policy own_rows_read on public.events for select to authenticated using (user_id = auth.uid());
create policy own_rows_read on public.watch_daily for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------- sync

-- Applies a batch of client events for the caller. Idempotent per event id; a bad
-- event is reported in "rejected" and skipped without failing the rest of the batch.
-- Merge rules: completion is an OR, best_score is the max, attempts count distinct
-- events, first_done_at is the earliest, watch seconds add up (capped at 24h a day).
-- Guards: client_ts is clamped to [now - 1 year, now], payloads are capped at 4 KB and
-- refs at 128 chars, so one account cannot bloat the database or poison its own stats.
create function public.apply_events(batch jsonb) returns jsonb
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
revoke execute on function public.handle_new_user() from public, anon, authenticated;
