// Per-language hero scenes for FunlingoPlayer. Ported verbatim from the 2026
// redesign export (scenes.js): a real still per learning language, its platform
// chip, and three original subtitle lines written in the spirit of the show.
// Every line is translated into all native buckets, and each highlighted word is
// concept-keyed so its gloss resolves in the visitor's own language.
//
// Languages without a scene (fr, it, de, …) fall back to the default gift still.

export type SceneLine = {
  pre: string; hot: string; post: string;
  concept: string; pron: string; pos: string;
};

export type Scene = {
  img: string;
  chip: string;
  dot: string;
  alt: string;
  lines: SceneLine[];
  /** line translations, keyed by the visitor's native language */
  tr: Record<string, string[]>;
};

/** Native-language buckets the scene copy is translated into. */
export const SCENE_NATIVES = ["en","zh-CN","zh-TW","es","pt","ru","ko","ja","fr","it","de","ar","tr","vi","uk","nl","hu","bg","hi"] as const;

/** concept key -> gloss per native bucket */
export const SCENE_CONCEPTS: Record<string, Record<string, string>> = {
  "together": {
    "en": "together",
    "zh-CN": "一起",
    "zh-TW": "一起",
    "es": "juntos",
    "pt": "juntos",
    "ru": "вместе",
    "ko": "함께",
    "ja": "一緒に",
    "fr": "ensemble",
    "it": "insieme",
    "de": "zusammen",
    "ar": "معًا",
    "tr": "birlikte",
    "vi": "cùng nhau",
    "uk": "разом",
    "nl": "samen",
    "hu": "együtt",
    "bg": "заедно",
    "hi": "साथ में"
  },
  "give_up": {
    "en": "to give up",
    "zh-CN": "放弃",
    "zh-TW": "放棄",
    "es": "rendirse",
    "pt": "desistir",
    "ru": "сдаваться",
    "ko": "포기하다",
    "ja": "あきらめる",
    "fr": "abandonner",
    "it": "arrendersi",
    "de": "aufgeben",
    "ar": "يستسلم",
    "tr": "pes etmek",
    "vi": "bỏ cuộc",
    "uk": "здаватися",
    "nl": "opgeven",
    "hu": "feladni",
    "bg": "предавам се",
    "hi": "हार मानना"
  },
  "home": {
    "en": "home",
    "zh-CN": "家",
    "zh-TW": "家",
    "es": "hogar",
    "pt": "lar",
    "ru": "дом",
    "ko": "집",
    "ja": "家",
    "fr": "la maison",
    "it": "casa",
    "de": "Zuhause",
    "ar": "بيت",
    "tr": "ev",
    "vi": "nhà",
    "uk": "дім",
    "nl": "thuis",
    "hu": "otthon",
    "bg": "дом",
    "hi": "घर"
  },
  "plan": {
    "en": "a plan",
    "zh-CN": "计划",
    "zh-TW": "計畫",
    "es": "un plan",
    "pt": "um plano",
    "ru": "план",
    "ko": "계획",
    "ja": "計画",
    "fr": "un plan",
    "it": "un piano",
    "de": "ein Plan",
    "ar": "خطة",
    "tr": "plan",
    "vi": "kế hoạch",
    "uk": "план",
    "nl": "een plan",
    "hu": "terv",
    "bg": "план",
    "hi": "योजना"
  },
  "leave": {
    "en": "to leave",
    "zh-CN": "离开",
    "zh-TW": "離開",
    "es": "salir",
    "pt": "sair",
    "ru": "выходить",
    "ko": "나가다",
    "ja": "出る",
    "fr": "sortir",
    "it": "uscire",
    "de": "hinausgehen",
    "ar": "يخرج",
    "tr": "çıkmak",
    "vi": "ra ngoài",
    "uk": "виходити",
    "nl": "weggaan",
    "hu": "kimenni",
    "bg": "излизам",
    "hi": "बाहर निकलना"
  },
  "trust": {
    "en": "to trust",
    "zh-CN": "相信",
    "zh-TW": "相信",
    "es": "confiar",
    "pt": "confiar",
    "ru": "доверять",
    "ko": "믿다",
    "ja": "信じる",
    "fr": "faire confiance",
    "it": "fidarsi",
    "de": "vertrauen",
    "ar": "يثق",
    "tr": "güvenmek",
    "vi": "tin tưởng",
    "uk": "довіряти",
    "nl": "vertrouwen",
    "hu": "megbízni",
    "bg": "доверявам",
    "hi": "भरोसा करना"
  },
  "game": {
    "en": "a game",
    "zh-CN": "游戏",
    "zh-TW": "遊戲",
    "es": "un juego",
    "pt": "um jogo",
    "ru": "игра",
    "ko": "게임",
    "ja": "ゲーム",
    "fr": "un jeu",
    "it": "un gioco",
    "de": "ein Spiel",
    "ar": "لعبة",
    "tr": "oyun",
    "vi": "trò chơi",
    "uk": "гра",
    "nl": "een spel",
    "hu": "játék",
    "bg": "игра",
    "hi": "खेल"
  },
  "survive": {
    "en": "to survive",
    "zh-CN": "活下去",
    "zh-TW": "活下去",
    "es": "sobrevivir",
    "pt": "sobreviver",
    "ru": "выжить",
    "ko": "살아남다",
    "ja": "生き残る",
    "fr": "survivre",
    "it": "sopravvivere",
    "de": "überleben",
    "ar": "ينجو",
    "tr": "hayatta kalmak",
    "vi": "sống sót",
    "uk": "вижити",
    "nl": "overleven",
    "hu": "túlélni",
    "bg": "оцелявам",
    "hi": "बच निकलना"
  },
  "protect": {
    "en": "to protect",
    "zh-CN": "保护",
    "zh-TW": "保護",
    "es": "proteger",
    "pt": "proteger",
    "ru": "защищать",
    "ko": "지키다",
    "ja": "守る",
    "fr": "protéger",
    "it": "proteggere",
    "de": "beschützen",
    "ar": "يحمي",
    "tr": "korumak",
    "vi": "bảo vệ",
    "uk": "захищати",
    "nl": "beschermen",
    "hu": "megvédeni",
    "bg": "защитавам",
    "hi": "रक्षा करना"
  },
  "dream": {
    "en": "a dream",
    "zh-CN": "梦想",
    "zh-TW": "夢想",
    "es": "un sueño",
    "pt": "um sonho",
    "ru": "мечта",
    "ko": "꿈",
    "ja": "夢",
    "fr": "un rêve",
    "it": "un sogno",
    "de": "ein Traum",
    "ar": "حلم",
    "tr": "hayal",
    "vi": "ước mơ",
    "uk": "мрія",
    "nl": "een droom",
    "hu": "álom",
    "bg": "мечта",
    "hi": "सपना"
  },
  "remember": {
    "en": "to remember",
    "zh-CN": "记得",
    "zh-TW": "記得",
    "es": "recordar",
    "pt": "lembrar",
    "ru": "помнить",
    "ko": "기억하다",
    "ja": "覚えている",
    "fr": "se souvenir",
    "it": "ricordare",
    "de": "sich erinnern",
    "ar": "يتذكر",
    "tr": "hatırlamak",
    "vi": "nhớ",
    "uk": "пам’ятати",
    "nl": "zich herinneren",
    "hu": "emlékezni",
    "bg": "помня",
    "hi": "याद रखना"
  },
  "wait": {
    "en": "to wait",
    "zh-CN": "等",
    "zh-TW": "等",
    "es": "esperar",
    "pt": "esperar",
    "ru": "ждать",
    "ko": "기다리다",
    "ja": "待つ",
    "fr": "attendre",
    "it": "aspettare",
    "de": "warten",
    "ar": "ينتظر",
    "tr": "beklemek",
    "vi": "chờ",
    "uk": "чекати",
    "nl": "wachten",
    "hu": "várni",
    "bg": "чакам",
    "hi": "इंतज़ार करना"
  }
};

/** learning language -> scene */
export const SCENES: Record<string, Scene> = {
  "en": {
    "img": "/scenes/en-avengers.webp",
    "chip": "DISNEY+",
    "dot": "#1F80E0",
    "alt": "Superheroes assembled on a battlefield at dusk",
    "lines": [
      {
        "pre": "We fight ",
        "hot": "together",
        "post": ".",
        "concept": "together",
        "pron": "tuh-GETH-er",
        "pos": "adv"
      },
      {
        "pre": "Nobody ",
        "hot": "gives up",
        "post": " today.",
        "concept": "give_up",
        "pron": "givz UP",
        "pos": "verb"
      },
      {
        "pre": "This is our ",
        "hot": "home",
        "post": ".",
        "concept": "home",
        "pron": "hohm",
        "pos": "noun"
      }
    ],
    "tr": {
      "en": [
        "We fight together.",
        "Nobody gives up today.",
        "This is our home."
      ],
      "zh-CN": [
        "我们一起战斗。",
        "今天谁都不许放弃。",
        "这里是我们的家。"
      ],
      "zh-TW": [
        "我們一起戰鬥。",
        "今天誰都不准放棄。",
        "這裡是我們的家。"
      ],
      "es": [
        "Luchamos juntos.",
        "Hoy nadie se rinde.",
        "Este es nuestro hogar."
      ],
      "pt": [
        "Lutamos juntos.",
        "Ninguém desiste hoje.",
        "Este é o nosso lar."
      ],
      "ru": [
        "Мы сражаемся вместе.",
        "Сегодня никто не сдаётся.",
        "Это наш дом."
      ],
      "ko": [
        "우리는 함께 싸운다.",
        "오늘은 아무도 포기하지 않아.",
        "여기가 우리의 집이야."
      ],
      "ja": [
        "一緒に戦うんだ。",
        "今日は誰もあきらめない。",
        "ここが俺たちの家だ。"
      ],
      "fr": [
        "On se bat ensemble.",
        "Personne n’abandonne aujourd’hui.",
        "C’est notre maison."
      ],
      "it": [
        "Combattiamo insieme.",
        "Oggi nessuno si arrende.",
        "Questa è casa nostra."
      ],
      "de": [
        "Wir kämpfen zusammen.",
        "Heute gibt niemand auf.",
        "Das ist unser Zuhause."
      ],
      "ar": [
        "نقاتل معًا.",
        "لا أحد يستسلم اليوم.",
        "هذا بيتنا."
      ],
      "tr": [
        "Birlikte savaşıyoruz.",
        "Bugün kimse pes etmiyor.",
        "Burası bizim evimiz."
      ],
      "vi": [
        "Chúng ta cùng nhau chiến đấu.",
        "Hôm nay không ai bỏ cuộc.",
        "Đây là nhà của chúng ta."
      ],
      "uk": [
        "Ми б’ємося разом.",
        "Сьогодні ніхто не здається.",
        "Це наш дім."
      ],
      "nl": [
        "We vechten samen.",
        "Niemand geeft vandaag op.",
        "Dit is ons thuis."
      ],
      "hu": [
        "Együtt harcolunk.",
        "Ma senki sem adja fel.",
        "Ez az otthonunk."
      ],
      "bg": [
        "Бием се заедно.",
        "Днес никой не се предава.",
        "Това е нашият дом."
      ],
      "hi": [
        "हम साथ में लड़ते हैं।",
        "आज कोई हार नहीं मानेगा।",
        "यही हमारा घर है।"
      ]
    }
  },
  "es": {
    "img": "/scenes/es-money-heist.webp",
    "chip": "NETFLIX",
    "dot": "#E50914",
    "alt": "Masked figures in red jumpsuits",
    "lines": [
      {
        "pre": "Todo sigue el ",
        "hot": "plan",
        "post": ".",
        "concept": "plan",
        "pron": "plahn",
        "pos": "noun"
      },
      {
        "pre": "Nadie va a ",
        "hot": "salir",
        "post": " de aquí.",
        "concept": "leave",
        "pron": "sah-LEER",
        "pos": "verb"
      },
      {
        "pre": "",
        "hot": "Confía",
        "post": " en mí, Profesor.",
        "concept": "trust",
        "pron": "kon-FEE-ah",
        "pos": "verb"
      }
    ],
    "tr": {
      "en": [
        "Everything follows the plan.",
        "Nobody is leaving here.",
        "Trust me, Professor."
      ],
      "zh-CN": [
        "一切按计划进行。",
        "谁也别想离开这里。",
        "相信我，教授。"
      ],
      "zh-TW": [
        "一切照計畫進行。",
        "誰也別想離開這裡。",
        "相信我，教授。"
      ],
      "es": [
        "Todo sigue el plan.",
        "Nadie va a salir de aquí.",
        "Confía en mí, Profesor."
      ],
      "pt": [
        "Tudo segue o plano.",
        "Ninguém vai sair daqui.",
        "Confie em mim, Professor."
      ],
      "ru": [
        "Всё идёт по плану.",
        "Отсюда никто не выйдет.",
        "Доверься мне, Профессор."
      ],
      "ko": [
        "모든 건 계획대로야.",
        "아무도 여기서 못 나가.",
        "날 믿어요, 교수님."
      ],
      "ja": [
        "すべて計画どおりだ。",
        "誰もここから出られない。",
        "俺を信じて、教授。"
      ],
      "fr": [
        "Tout suit le plan.",
        "Personne ne sortira d’ici.",
        "Fais-moi confiance, Professeur."
      ],
      "it": [
        "Tutto segue il piano.",
        "Nessuno uscirà da qui.",
        "Fidati di me, Professore."
      ],
      "de": [
        "Alles läuft nach Plan.",
        "Niemand kommt hier raus.",
        "Vertrau mir, Professor."
      ],
      "ar": [
        "كل شيء يسير حسب الخطة.",
        "لن يخرج أحد من هنا.",
        "ثق بي يا بروفيسور."
      ],
      "tr": [
        "Her şey plana göre gidiyor.",
        "Kimse buradan çıkmayacak.",
        "Bana güven, Profesör."
      ],
      "vi": [
        "Mọi thứ theo đúng kế hoạch.",
        "Không ai được ra khỏi đây.",
        "Tin tôi đi, Giáo sư."
      ],
      "uk": [
        "Усе йде за планом.",
        "Звідси ніхто не вийде.",
        "Довірся мені, Професоре."
      ],
      "nl": [
        "Alles volgt het plan.",
        "Niemand gaat hier weg.",
        "Vertrouw me, Professor."
      ],
      "hu": [
        "Minden a terv szerint megy.",
        "Innen senki sem megy ki.",
        "Bízz bennem, Professzor."
      ],
      "bg": [
        "Всичко върви по план.",
        "Никой няма да излезе оттук.",
        "Довери ми се, Професоре."
      ],
      "hi": [
        "सब कुछ योजना के हिसाब से है।",
        "यहाँ से कोई बाहर नहीं जाएगा।",
        "मुझ पर भरोसा करो, प्रोफ़ेसर।"
      ]
    }
  },
  "ko": {
    "img": "/scenes/ko-squid-game.webp",
    "chip": "NETFLIX",
    "dot": "#E50914",
    "alt": "Players in green tracksuits",
    "lines": [
      {
        "pre": "이건 그냥 ",
        "hot": "게임",
        "post": "이야.",
        "concept": "game",
        "pron": "ge-im",
        "pos": "noun"
      },
      {
        "pre": "우리 같이 ",
        "hot": "살아남자",
        "post": ".",
        "concept": "survive",
        "pron": "sa-ra-nam-ja",
        "pos": "verb"
      },
      {
        "pre": "",
        "hot": "포기하지",
        "post": " 마!",
        "concept": "give_up",
        "pron": "po-gi-ha-ji",
        "pos": "verb"
      }
    ],
    "tr": {
      "en": [
        "It’s just a game.",
        "Let’s survive together.",
        "Don’t give up!"
      ],
      "zh-CN": [
        "这只是个游戏。",
        "我们一起活下去吧。",
        "别放弃！"
      ],
      "zh-TW": [
        "這只是個遊戲。",
        "我們一起活下去吧。",
        "別放棄！"
      ],
      "es": [
        "Es solo un juego.",
        "Sobrevivamos juntos.",
        "¡No te rindas!"
      ],
      "pt": [
        "É só um jogo.",
        "Vamos sobreviver juntos.",
        "Não desista!"
      ],
      "ru": [
        "Это просто игра.",
        "Давай выживем вместе.",
        "Не сдавайся!"
      ],
      "ko": [
        "이건 그냥 게임이야.",
        "우리 같이 살아남자.",
        "포기하지 마!"
      ],
      "ja": [
        "これはただのゲームだ。",
        "一緒に生き残ろう。",
        "あきらめるな！"
      ],
      "fr": [
        "Ce n’est qu’un jeu.",
        "Survivons ensemble.",
        "N’abandonne pas !"
      ],
      "it": [
        "È solo un gioco.",
        "Sopravviviamo insieme.",
        "Non arrenderti!"
      ],
      "de": [
        "Es ist nur ein Spiel.",
        "Lass uns zusammen überleben.",
        "Gib nicht auf!"
      ],
      "ar": [
        "إنها مجرد لعبة.",
        "لننجُ معًا.",
        "لا تستسلم!"
      ],
      "tr": [
        "Bu sadece bir oyun.",
        "Birlikte hayatta kalalım.",
        "Pes etme!"
      ],
      "vi": [
        "Đây chỉ là một trò chơi.",
        "Chúng ta cùng sống sót nhé.",
        "Đừng bỏ cuộc!"
      ],
      "uk": [
        "Це просто гра.",
        "Давай виживемо разом.",
        "Не здавайся!"
      ],
      "nl": [
        "Het is maar een spel.",
        "Laten we samen overleven.",
        "Geef niet op!"
      ],
      "hu": [
        "Ez csak egy játék.",
        "Éljük túl együtt.",
        "Ne add fel!"
      ],
      "bg": [
        "Това е просто игра.",
        "Нека оцелеем заедно.",
        "Не се предавай!"
      ],
      "hi": [
        "ये बस एक खेल है।",
        "चलो साथ में बच निकलें।",
        "हार मत मानो!"
      ]
    }
  },
  "ja": {
    "img": "/scenes/ja-naruto.webp",
    "chip": "CRUNCHYROLL",
    "dot": "#F47521",
    "alt": "A determined anime ninja",
    "lines": [
      {
        "pre": "俺は絶対に",
        "hot": "あきらめない",
        "post": "！",
        "concept": "give_up",
        "pron": "a-ki-ra-me-nai",
        "pos": "verb"
      },
      {
        "pre": "仲間を",
        "hot": "守る",
        "post": "んだ。",
        "concept": "protect",
        "pron": "ma-mo-ru",
        "pos": "verb"
      },
      {
        "pre": "それが俺の",
        "hot": "夢",
        "post": "だ！",
        "concept": "dream",
        "pron": "yu-me",
        "pos": "noun"
      }
    ],
    "tr": {
      "en": [
        "I will never give up!",
        "I’ll protect my friends.",
        "That’s my dream!"
      ],
      "zh-CN": [
        "我绝对不会放弃！",
        "我要保护同伴。",
        "那就是我的梦想！"
      ],
      "zh-TW": [
        "我絕對不會放棄！",
        "我要保護夥伴。",
        "那就是我的夢想！"
      ],
      "es": [
        "¡Nunca me rendiré!",
        "Voy a proteger a mis amigos.",
        "¡Ese es mi sueño!"
      ],
      "pt": [
        "Eu nunca vou desistir!",
        "Vou proteger meus amigos.",
        "Esse é o meu sonho!"
      ],
      "ru": [
        "Я ни за что не сдамся!",
        "Я защищу своих друзей.",
        "Это моя мечта!"
      ],
      "ko": [
        "난 절대 포기 안 해!",
        "동료들을 지킬 거야.",
        "그게 내 꿈이야!"
      ],
      "ja": [
        "俺は絶対にあきらめない！",
        "仲間を守るんだ。",
        "それが俺の夢だ！"
      ],
      "fr": [
        "Je n’abandonnerai jamais !",
        "Je protégerai mes amis.",
        "C’est mon rêve !"
      ],
      "it": [
        "Non mi arrenderò mai!",
        "Proteggerò i miei amici.",
        "È il mio sogno!"
      ],
      "de": [
        "Ich gebe niemals auf!",
        "Ich beschütze meine Freunde.",
        "Das ist mein Traum!"
      ],
      "ar": [
        "لن أستسلم أبدًا!",
        "سأحمي أصدقائي.",
        "هذا حلمي!"
      ],
      "tr": [
        "Asla pes etmeyeceğim!",
        "Arkadaşlarımı koruyacağım.",
        "Bu benim hayalim!"
      ],
      "vi": [
        "Tôi sẽ không bao giờ bỏ cuộc!",
        "Tôi sẽ bảo vệ đồng đội.",
        "Đó là ước mơ của tôi!"
      ],
      "uk": [
        "Я ніколи не здамся!",
        "Я захищу своїх друзів.",
        "Це моя мрія!"
      ],
      "nl": [
        "Ik geef nooit op!",
        "Ik bescherm mijn vrienden.",
        "Dat is mijn droom!"
      ],
      "hu": [
        "Soha nem adom fel!",
        "Megvédem a barátaimat.",
        "Ez az álmom!"
      ],
      "bg": [
        "Никога няма да се предам!",
        "Ще защитя приятелите си.",
        "Това е моята мечта!"
      ],
      "hi": [
        "मैं कभी हार नहीं मानूँगा!",
        "मैं अपने दोस्तों की रक्षा करूँगा।",
        "यही मेरा सपना है!"
      ]
    }
  },
  "zh": {
    "img": "/scenes/zh-drama.webp",
    "chip": "BILIBILI",
    "dot": "#00A1D6",
    "alt": "Two characters in a moonlit costume drama",
    "lines": [
      {
        "pre": "你还",
        "hot": "记得",
        "post": "那天吗？",
        "concept": "remember",
        "pron": "jì de",
        "pos": "verb"
      },
      {
        "pre": "我会一直",
        "hot": "等",
        "post": "你。",
        "concept": "wait",
        "pron": "děng",
        "pos": "verb"
      },
      {
        "pre": "有你在，就是",
        "hot": "家",
        "post": "。",
        "concept": "home",
        "pron": "jiā",
        "pos": "noun"
      }
    ],
    "tr": {
      "en": [
        "Do you still remember that day?",
        "I’ll always wait for you.",
        "Wherever you are is home."
      ],
      "zh-CN": [
        "你还记得那天吗？",
        "我会一直等你。",
        "有你在，就是家。"
      ],
      "zh-TW": [
        "你還記得那天嗎？",
        "我會一直等你。",
        "有你在，就是家。"
      ],
      "es": [
        "¿Todavía recuerdas aquel día?",
        "Siempre te esperaré.",
        "Donde estás tú, está mi hogar."
      ],
      "pt": [
        "Você ainda se lembra daquele dia?",
        "Vou sempre esperar por você.",
        "Onde você está, é o meu lar."
      ],
      "ru": [
        "Ты ещё помнишь тот день?",
        "Я всегда буду тебя ждать.",
        "Где ты — там и дом."
      ],
      "ko": [
        "그날을 아직 기억해?",
        "난 언제나 널 기다릴게.",
        "네가 있는 곳이 집이야."
      ],
      "ja": [
        "あの日のこと、まだ覚えてる？",
        "ずっと君を待ってる。",
        "君がいれば、そこが家だ。"
      ],
      "fr": [
        "Tu te souviens encore de ce jour-là ?",
        "Je t’attendrai toujours.",
        "Là où tu es, c’est chez moi."
      ],
      "it": [
        "Ricordi ancora quel giorno?",
        "Ti aspetterò sempre.",
        "Dove ci sei tu, è casa."
      ],
      "de": [
        "Erinnerst du dich noch an jenen Tag?",
        "Ich werde immer auf dich warten.",
        "Wo du bist, ist mein Zuhause."
      ],
      "ar": [
        "هل ما زلت تتذكر ذلك اليوم؟",
        "سأنتظرك دائمًا.",
        "حيث تكون، يكون البيت."
      ],
      "tr": [
        "O günü hâlâ hatırlıyor musun?",
        "Seni hep bekleyeceğim.",
        "Sen neredeysen ev orası."
      ],
      "vi": [
        "Bạn còn nhớ ngày hôm đó không?",
        "Anh sẽ luôn chờ em.",
        "Có em ở đâu, đó là nhà."
      ],
      "uk": [
        "Ти ще пам’ятаєш той день?",
        "Я завжди тебе чекатиму.",
        "Де ти — там і дім."
      ],
      "nl": [
        "Weet je die dag nog?",
        "Ik zal altijd op je wachten.",
        "Waar jij bent, is thuis."
      ],
      "hu": [
        "Emlékszel még arra a napra?",
        "Mindig várni foglak.",
        "Ahol te vagy, az az otthon."
      ],
      "bg": [
        "Още ли помниш онзи ден?",
        "Винаги ще те чакам.",
        "Където си ти, там е домът."
      ],
      "hi": [
        "क्या तुम्हें अब भी वो दिन याद है?",
        "मैं हमेशा तुम्हारा इंतज़ार करूँगा।",
        "जहाँ तुम हो, वहीं घर है।"
      ]
    }
  }
};

/** Default still for learning languages with no scene of their own. */
export const DEFAULT_SCENE_IMG = '/hero-scene.jpg';

/** Resolve the scene for a learning language. zh-CN / zh-TW share the zh scene. */
export function sceneFor(lang: string): Scene | null {
  if (SCENES[lang]) return SCENES[lang];
  const base = lang.split('-')[0];
  return SCENES[base] ?? null;
}

/** Gloss for a concept in the visitor's language, falling back to English. */
export function glossFor(concept: string, native: string): string {
  const row = SCENE_CONCEPTS[concept];
  if (!row) return concept;
  return row[native] ?? row[native.split('-')[0]] ?? row.en;
}

/** The translated subtitle line, falling back to English. */
export function translationFor(scene: Scene, index: number, native: string): string {
  const rows = scene.tr[native] ?? scene.tr[native.split('-')[0]] ?? scene.tr.en;
  return (rows && rows[index]) || '';
}
