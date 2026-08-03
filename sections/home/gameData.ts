// Option/answer text for the guess game, keyed by concept, resolved into the
// viewer’s native (UI) language. The round structure is unchanged; only the
// meanings are localized. Extends the design’s concept model to our word sets.

export type GameRound = { word: string; bcp: string; flag: string; ans: string; opts: string[] };

export const GAME_ROUNDS: Record<string, GameRound[]> = {
  "es": [
    {
      "word": "playa",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "beach",
      "opts": [
        "plate",
        "beach",
        "game",
        "door"
      ]
    },
    {
      "word": "gato",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "cat",
      "opts": [
        "cat",
        "dog",
        "hat",
        "car"
      ]
    },
    {
      "word": "agua",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "water",
      "opts": [
        "bread",
        "water",
        "fire",
        "money"
      ]
    },
    {
      "word": "feliz",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "happy",
      "opts": [
        "tired",
        "happy",
        "hungry",
        "angry"
      ]
    },
    {
      "word": "libro",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "book",
      "opts": [
        "book",
        "table",
        "shoe",
        "key"
      ]
    },
    {
      "word": "amigo",
      "bcp": "es-ES",
      "flag": "es",
      "ans": "friend",
      "opts": [
        "friend",
        "brother",
        "neighbor",
        "teacher"
      ]
    }
  ],
  "fr": [
    {
      "word": "cadeau",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "gift",
      "opts": [
        "gift",
        "song",
        "key",
        "dog"
      ]
    },
    {
      "word": "chien",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "dog",
      "opts": [
        "cat",
        "dog",
        "bird",
        "fish"
      ]
    },
    {
      "word": "eau",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "water",
      "opts": [
        "bread",
        "water",
        "wine",
        "milk"
      ]
    },
    {
      "word": "heureux",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "happy",
      "opts": [
        "sad",
        "happy",
        "tired",
        "busy"
      ]
    },
    {
      "word": "livre",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "book",
      "opts": [
        "book",
        "pen",
        "chair",
        "window"
      ]
    },
    {
      "word": "ami",
      "bcp": "fr-FR",
      "flag": "fr",
      "ans": "friend",
      "opts": [
        "friend",
        "enemy",
        "cousin",
        "guest"
      ]
    }
  ],
  "it": [
    {
      "word": "felice",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "happy",
      "opts": [
        "tired",
        "happy",
        "hungry",
        "late"
      ]
    },
    {
      "word": "gatto",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "cat",
      "opts": [
        "cat",
        "mouse",
        "horse",
        "cow"
      ]
    },
    {
      "word": "acqua",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "water",
      "opts": [
        "water",
        "bread",
        "salt",
        "oil"
      ]
    },
    {
      "word": "casa",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "house",
      "opts": [
        "house",
        "road",
        "tree",
        "boat"
      ]
    },
    {
      "word": "libro",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "book",
      "opts": [
        "book",
        "lamp",
        "plate",
        "coin"
      ]
    },
    {
      "word": "amico",
      "bcp": "it-IT",
      "flag": "it",
      "ans": "friend",
      "opts": [
        "friend",
        "stranger",
        "doctor",
        "king"
      ]
    }
  ],
  "de": [
    {
      "word": "Freund",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "friend",
      "opts": [
        "bread",
        "friend",
        "morning",
        "street"
      ]
    },
    {
      "word": "Hund",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "dog",
      "opts": [
        "dog",
        "cat",
        "bird",
        "bear"
      ]
    },
    {
      "word": "Wasser",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "water",
      "opts": [
        "water",
        "fire",
        "wind",
        "stone"
      ]
    },
    {
      "word": "glücklich",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "happy",
      "opts": [
        "angry",
        "happy",
        "sleepy",
        "sick"
      ]
    },
    {
      "word": "Buch",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "book",
      "opts": [
        "book",
        "door",
        "clock",
        "spoon"
      ]
    },
    {
      "word": "Haus",
      "bcp": "de-DE",
      "flag": "de",
      "ans": "house",
      "opts": [
        "house",
        "garden",
        "bridge",
        "car"
      ]
    }
  ],
  "ko": [
    {
      "word": "사랑",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "love",
      "opts": [
        "water",
        "money",
        "love",
        "friend"
      ]
    },
    {
      "word": "고양이",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "cat",
      "opts": [
        "cat",
        "dog",
        "fish",
        "bird"
      ]
    },
    {
      "word": "물",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "water",
      "opts": [
        "water",
        "rice",
        "tea",
        "milk"
      ]
    },
    {
      "word": "행복",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "happiness",
      "opts": [
        "sadness",
        "happiness",
        "anger",
        "fear"
      ]
    },
    {
      "word": "책",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "book",
      "opts": [
        "book",
        "pen",
        "bag",
        "phone"
      ]
    },
    {
      "word": "친구",
      "bcp": "ko-KR",
      "flag": "ko",
      "ans": "friend",
      "opts": [
        "friend",
        "teacher",
        "sister",
        "guest"
      ]
    }
  ],
  "ja": [
    {
      "word": "ねこ",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "cat",
      "opts": [
        "book",
        "rain",
        "star",
        "cat"
      ]
    },
    {
      "word": "いぬ",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "dog",
      "opts": [
        "dog",
        "cat",
        "fish",
        "frog"
      ]
    },
    {
      "word": "みず",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "water",
      "opts": [
        "water",
        "fire",
        "tree",
        "gold"
      ]
    },
    {
      "word": "ともだち",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "friend",
      "opts": [
        "friend",
        "stranger",
        "brother",
        "rival"
      ]
    },
    {
      "word": "ほん",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "book",
      "opts": [
        "book",
        "desk",
        "door",
        "hat"
      ]
    },
    {
      "word": "しあわせ",
      "bcp": "ja-JP",
      "flag": "ja",
      "ans": "happiness",
      "opts": [
        "sadness",
        "happiness",
        "anger",
        "worry"
      ]
    }
  ],
  "en": [
    {
      "word": "gift",
      "bcp": "en-US",
      "flag": "en",
      "ans": "gift",
      "opts": [
        "song",
        "gift",
        "key",
        "dog"
      ]
    },
    {
      "word": "cat",
      "bcp": "en-US",
      "flag": "en",
      "ans": "cat",
      "opts": [
        "cat",
        "dog",
        "bird",
        "fish"
      ]
    },
    {
      "word": "water",
      "bcp": "en-US",
      "flag": "en",
      "ans": "water",
      "opts": [
        "bread",
        "water",
        "fire",
        "money"
      ]
    },
    {
      "word": "happy",
      "bcp": "en-US",
      "flag": "en",
      "ans": "happy",
      "opts": [
        "tired",
        "happy",
        "hungry",
        "angry"
      ]
    },
    {
      "word": "book",
      "bcp": "en-US",
      "flag": "en",
      "ans": "book",
      "opts": [
        "book",
        "table",
        "shoe",
        "key"
      ]
    },
    {
      "word": "friend",
      "bcp": "en-US",
      "flag": "en",
      "ans": "friend",
      "opts": [
        "friend",
        "brother",
        "neighbor",
        "teacher"
      ]
    }
  ]
};

export const GAME_OPT: Record<string, Record<string, string>> = {"en":{"beach":"a beach","plate":"a plate","game":"a game","door":"a door","cat":"a cat","dog":"a dog","hat":"a hat","car":"a car","bread":"bread","water":"water","fire":"fire","money":"money","tired":"tired","happy":"happy","hungry":"hungry","angry":"angry","book":"a book","table":"a table","shoe":"a shoe","key":"a key","friend":"a friend","brother":"a brother","neighbor":"a neighbor","teacher":"a teacher","gift":"a gift","song":"a song","bird":"a bird","fish":"a fish","wine":"wine","milk":"milk","sad":"sad","busy":"busy","pen":"a pen","chair":"a chair","window":"a window","enemy":"an enemy","cousin":"a cousin","guest":"a guest","late":"late","mouse":"a mouse","horse":"a horse","cow":"a cow","salt":"salt","oil":"oil","house":"a house","road":"a road","tree":"a tree","boat":"a boat","lamp":"a lamp","coin":"a coin","stranger":"a stranger","doctor":"a doctor","king":"a king","morning":"morning","street":"a street","bear":"a bear","wind":"wind","stone":"a stone","sleepy":"sleepy","sick":"sick","clock":"a clock","spoon":"a spoon","garden":"a garden","bridge":"a bridge","love":"love","rice":"rice","tea":"tea","happiness":"happiness","sadness":"sadness","anger":"anger","fear":"fear","bag":"a bag","phone":"a phone","star":"a star","rain":"rain","frog":"a frog","gold":"gold","desk":"a desk","rival":"a rival","worry":"worry","sister":"a sister"},"es":{"beach":"una playa","plate":"un plato","game":"un juego","door":"una puerta","cat":"un gato","dog":"un perro","hat":"un sombrero","car":"un coche","bread":"pan","water":"agua","fire":"fuego","money":"dinero","tired":"cansado","happy":"feliz","hungry":"hambriento","angry":"enojado","book":"un libro","table":"una mesa","shoe":"un zapato","key":"una llave","friend":"un amigo","brother":"un hermano","neighbor":"un vecino","teacher":"un profesor","gift":"un regalo","song":"una canción","bird":"un pájaro","fish":"un pez","wine":"vino","milk":"leche","sad":"triste","busy":"ocupado","pen":"un bolígrafo","chair":"una silla","window":"una ventana","enemy":"un enemigo","cousin":"un primo","guest":"un invitado","late":"tarde","mouse":"un ratón","horse":"un caballo","cow":"una vaca","salt":"sal","oil":"aceite","house":"una casa","road":"un camino","tree":"un árbol","boat":"un barco","lamp":"una lámpara","coin":"una moneda","stranger":"un desconocido","doctor":"un médico","king":"un rey","morning":"mañana","street":"una calle","bear":"un oso","wind":"viento","stone":"una piedra","sleepy":"soñoliento","sick":"enfermo","clock":"un reloj","spoon":"una cuchara","garden":"un jardín","bridge":"un puente","love":"amor","rice":"arroz","tea":"té","happiness":"felicidad","sadness":"tristeza","anger":"ira","fear":"miedo","bag":"una bolsa","phone":"un teléfono","star":"una estrella","rain":"lluvia","frog":"una rana","gold":"oro","desk":"un escritorio","rival":"un rival","worry":"preocupación","sister":"una hermana"},"pt":{"beach":"uma praia","plate":"um prato","game":"um jogo","door":"uma porta","cat":"um gato","dog":"um cachorro","hat":"um chapéu","car":"um carro","bread":"pão","water":"água","fire":"fogo","money":"dinheiro","tired":"cansado","happy":"feliz","hungry":"faminto","angry":"bravo","book":"um livro","table":"uma mesa","shoe":"um sapato","key":"uma chave","friend":"um amigo","brother":"um irmão","neighbor":"um vizinho","teacher":"um professor","gift":"um presente","song":"uma música","bird":"um pássaro","fish":"um peixe","wine":"vinho","milk":"leite","sad":"triste","busy":"ocupado","pen":"uma caneta","chair":"uma cadeira","window":"uma janela","enemy":"um inimigo","cousin":"um primo","guest":"um convidado","late":"tarde","mouse":"um rato","horse":"um cavalo","cow":"uma vaca","salt":"sal","oil":"óleo","house":"uma casa","road":"uma estrada","tree":"uma árvore","boat":"um barco","lamp":"uma lâmpada","coin":"uma moeda","stranger":"um estranho","doctor":"um médico","king":"um rei","morning":"manhã","street":"uma rua","bear":"um urso","wind":"vento","stone":"uma pedra","sleepy":"sonolento","sick":"doente","clock":"um relógio","spoon":"uma colher","garden":"um jardim","bridge":"uma ponte","love":"amor","rice":"arroz","tea":"chá","happiness":"felicidade","sadness":"tristeza","anger":"raiva","fear":"medo","bag":"uma bolsa","phone":"um telefone","star":"uma estrela","rain":"chuva","frog":"uma rã","gold":"ouro","desk":"uma escrivaninha","rival":"um rival","worry":"preocupação","sister":"uma irmã"},"zh-CN":{"beach":"沙滩","plate":"盘子","game":"游戏","door":"门","cat":"猫","dog":"狗","hat":"帽子","car":"汽车","bread":"面包","water":"水","fire":"火","money":"钱","tired":"累","happy":"开心","hungry":"饿","angry":"生气","book":"书","table":"桌子","shoe":"鞋","key":"钥匙","friend":"朋友","brother":"兄弟","neighbor":"邻居","teacher":"老师","gift":"礼物","song":"歌","bird":"鸟","fish":"鱼","wine":"酒","milk":"牛奶","sad":"伤心","busy":"忙","pen":"笔","chair":"椅子","window":"窗户","enemy":"敌人","cousin":"表亲","guest":"客人","late":"迟到","mouse":"老鼠","horse":"马","cow":"牛","salt":"盐","oil":"油","house":"房子","road":"路","tree":"树","boat":"船","lamp":"灯","coin":"硬币","stranger":"陌生人","doctor":"医生","king":"国王","morning":"早晨","street":"街道","bear":"熊","wind":"风","stone":"石头","sleepy":"困","sick":"生病","clock":"钟","spoon":"勺子","garden":"花园","bridge":"桥","love":"爱","rice":"米饭","tea":"茶","happiness":"幸福","sadness":"悲伤","anger":"愤怒","fear":"恐惧","bag":"包","phone":"手机","star":"星星","rain":"雨","frog":"青蛙","gold":"黄金","desk":"书桌","rival":"对手","worry":"担心","sister":"姐妹"},"zh-TW":{"beach":"沙灘","plate":"盤子","game":"遊戲","door":"門","cat":"貓","dog":"狗","hat":"帽子","car":"車","bread":"麵包","water":"水","fire":"火","money":"錢","tired":"累","happy":"開心","hungry":"餓","angry":"生氣","book":"書","table":"桌子","shoe":"鞋子","key":"鑰匙","friend":"朋友","brother":"兄弟","neighbor":"鄰居","teacher":"老師","gift":"禮物","song":"歌","bird":"鳥","fish":"魚","wine":"酒","milk":"牛奶","sad":"難過","busy":"忙","pen":"筆","chair":"椅子","window":"窗戶","enemy":"敵人","cousin":"表親","guest":"客人","late":"遲到","mouse":"老鼠","horse":"馬","cow":"牛","salt":"鹽","oil":"油","house":"房子","road":"路","tree":"樹","boat":"船","lamp":"燈","coin":"硬幣","stranger":"陌生人","doctor":"醫生","king":"國王","morning":"早晨","street":"街道","bear":"熊","wind":"風","stone":"石頭","sleepy":"睏","sick":"生病","clock":"時鐘","spoon":"湯匙","garden":"花園","bridge":"橋","love":"愛","rice":"米飯","tea":"茶","happiness":"幸福","sadness":"悲傷","anger":"憤怒","fear":"恐懼","bag":"包包","phone":"電話","star":"星星","rain":"雨","frog":"青蛙","gold":"黃金","desk":"書桌","rival":"對手","worry":"擔憂","sister":"姐妹"},"ru":{"beach":"пляж","plate":"тарелка","game":"игра","door":"дверь","cat":"кот","dog":"собака","hat":"шляпа","car":"машина","bread":"хлеб","water":"вода","fire":"огонь","money":"деньги","tired":"усталый","happy":"счастливый","hungry":"голодный","angry":"злой","book":"книга","table":"стол","shoe":"туфля","key":"ключ","friend":"друг","brother":"брат","neighbor":"сосед","teacher":"учитель","gift":"подарок","song":"песня","bird":"птица","fish":"рыба","wine":"вино","milk":"молоко","sad":"грустный","busy":"занятый","pen":"ручка","chair":"стул","window":"окно","enemy":"враг","cousin":"кузен","guest":"гость","late":"поздно","mouse":"мышь","horse":"лошадь","cow":"корова","salt":"соль","oil":"масло","house":"дом","road":"дорога","tree":"дерево","boat":"лодка","lamp":"лампа","coin":"монета","stranger":"незнакомец","doctor":"врач","king":"король","morning":"утро","street":"улица","bear":"медведь","wind":"ветер","stone":"камень","sleepy":"сонный","sick":"больной","clock":"часы","spoon":"ложка","garden":"сад","bridge":"мост","love":"любовь","rice":"рис","tea":"чай","happiness":"счастье","sadness":"грусть","anger":"гнев","fear":"страх","bag":"сумка","phone":"телефон","star":"звезда","rain":"дождь","frog":"лягушка","gold":"золото","desk":"письменный стол","rival":"соперник","worry":"беспокойство","sister":"сестра"},"uk":{"beach":"пляж","plate":"тарілка","game":"гра","door":"двері","cat":"кіт","dog":"собака","hat":"капелюх","car":"машина","bread":"хліб","water":"вода","fire":"вогонь","money":"гроші","tired":"втомлений","happy":"щасливий","hungry":"голодний","angry":"сердитий","book":"книга","table":"стіл","shoe":"черевик","key":"ключ","friend":"друг","brother":"брат","neighbor":"сусід","teacher":"вчитель","gift":"подарунок","song":"пісня","bird":"птах","fish":"риба","wine":"вино","milk":"молоко","sad":"сумний","busy":"зайнятий","pen":"ручка","chair":"стілець","window":"вікно","enemy":"ворог","cousin":"двоюрідний брат","guest":"гість","late":"пізно","mouse":"миша","horse":"кінь","cow":"корова","salt":"сіль","oil":"олія","house":"будинок","road":"дорога","tree":"дерево","boat":"човен","lamp":"лампа","coin":"монета","stranger":"незнайомець","doctor":"лікар","king":"король","morning":"ранок","street":"вулиця","bear":"ведмідь","wind":"вітер","stone":"камінь","sleepy":"сонний","sick":"хворий","clock":"годинник","spoon":"ложка","garden":"сад","bridge":"міст","love":"любов","rice":"рис","tea":"чай","happiness":"щастя","sadness":"сум","anger":"гнів","fear":"страх","bag":"сумка","phone":"телефон","star":"зірка","rain":"дощ","frog":"жаба","gold":"золото","desk":"стіл","rival":"суперник","worry":"тривога","sister":"сестра"},"bg":{"beach":"плаж","plate":"чиния","game":"игра","door":"врата","cat":"котка","dog":"куче","hat":"шапка","car":"кола","bread":"хляб","water":"вода","fire":"огън","money":"пари","tired":"уморен","happy":"щастлив","hungry":"гладен","angry":"ядосан","book":"книга","table":"маса","shoe":"обувка","key":"ключ","friend":"приятел","brother":"брат","neighbor":"съсед","teacher":"учител","gift":"подарък","song":"песен","bird":"птица","fish":"риба","wine":"вино","milk":"мляко","sad":"тъжен","busy":"зает","pen":"химикалка","chair":"стол","window":"прозорец","enemy":"враг","cousin":"братовчед","guest":"гост","late":"късно","mouse":"мишка","horse":"кон","cow":"крава","salt":"сол","oil":"олио","house":"къща","road":"път","tree":"дърво","boat":"лодка","lamp":"лампа","coin":"монета","stranger":"непознат","doctor":"лекар","king":"крал","morning":"утро","street":"улица","bear":"мечка","wind":"вятър","stone":"камък","sleepy":"сънлив","sick":"болен","clock":"часовник","spoon":"лъжица","garden":"градина","bridge":"мост","love":"любов","rice":"ориз","tea":"чай","happiness":"щастие","sadness":"тъга","anger":"гняв","fear":"страх","bag":"чанта","phone":"телефон","star":"звезда","rain":"дъжд","frog":"жаба","gold":"злато","desk":"бюро","rival":"съперник","worry":"тревога","sister":"сестра"},"ko":{"beach":"해변","plate":"접시","game":"게임","door":"문","cat":"고양이","dog":"개","hat":"모자","car":"자동차","bread":"빵","water":"물","fire":"불","money":"돈","tired":"피곤한","happy":"행복한","hungry":"배고픈","angry":"화난","book":"책","table":"탁자","shoe":"신발","key":"열쇠","friend":"친구","brother":"형제","neighbor":"이웃","teacher":"선생님","gift":"선물","song":"노래","bird":"새","fish":"물고기","wine":"와인","milk":"우유","sad":"슬픈","busy":"바쁜","pen":"펜","chair":"의자","window":"창문","enemy":"적","cousin":"사촌","guest":"손님","late":"늦은","mouse":"쥐","horse":"말","cow":"소","salt":"소금","oil":"기름","house":"집","road":"길","tree":"나무","boat":"배","lamp":"램프","coin":"동전","stranger":"낯선 사람","doctor":"의사","king":"왕","morning":"아침","street":"거리","bear":"곰","wind":"바람","stone":"돌","sleepy":"졸린","sick":"아픈","clock":"시계","spoon":"숟가락","garden":"정원","bridge":"다리","love":"사랑","rice":"쌀","tea":"차","happiness":"행복","sadness":"슬픔","anger":"분노","fear":"두려움","bag":"가방","phone":"전화기","star":"별","rain":"비","frog":"개구리","gold":"금","desk":"책상","rival":"경쟁자","worry":"걱정","sister":"자매"},"ja":{"beach":"ビーチ","plate":"皿","game":"ゲーム","door":"ドア","cat":"猫","dog":"犬","hat":"帽子","car":"車","bread":"パン","water":"水","fire":"火","money":"お金","tired":"疲れた","happy":"幸せ","hungry":"空腹","angry":"怒った","book":"本","table":"テーブル","shoe":"靴","key":"鍵","friend":"友達","brother":"兄","neighbor":"隣人","teacher":"先生","gift":"プレゼント","song":"歌","bird":"鳥","fish":"魚","wine":"ワイン","milk":"牛乳","sad":"悲しい","busy":"忙しい","pen":"ペン","chair":"椅子","window":"窓","enemy":"敵","cousin":"いとこ","guest":"客","late":"遅刻","mouse":"ねずみ","horse":"馬","cow":"牛","salt":"塩","oil":"油","house":"家","road":"道","tree":"木","boat":"船","lamp":"ランプ","coin":"コイン","stranger":"見知らぬ人","doctor":"医者","king":"王","morning":"朝","street":"通り","bear":"熊","wind":"風","stone":"石","sleepy":"眠い","sick":"病気","clock":"時計","spoon":"スプーン","garden":"庭","bridge":"橋","love":"愛","rice":"米","tea":"お茶","happiness":"幸福","sadness":"悲しみ","anger":"怒り","fear":"恐怖","bag":"かばん","phone":"電話","star":"星","rain":"雨","frog":"カエル","gold":"金","desk":"机","rival":"ライバル","worry":"心配","sister":"姉妹"},"fr":{"beach":"une plage","plate":"une assiette","game":"un jeu","door":"une porte","cat":"un chat","dog":"un chien","hat":"un chapeau","car":"une voiture","bread":"du pain","water":"de l’eau","fire":"du feu","money":"de l’argent","tired":"fatigué","happy":"heureux","hungry":"affamé","angry":"en colère","book":"un livre","table":"une table","shoe":"une chaussure","key":"une clé","friend":"un ami","brother":"un frère","neighbor":"un voisin","teacher":"un professeur","gift":"un cadeau","song":"une chanson","bird":"un oiseau","fish":"un poisson","wine":"du vin","milk":"du lait","sad":"triste","busy":"occupé","pen":"un stylo","chair":"une chaise","window":"une fenêtre","enemy":"un ennemi","cousin":"un cousin","guest":"un invité","late":"en retard","mouse":"une souris","horse":"un cheval","cow":"une vache","salt":"du sel","oil":"de l’huile","house":"une maison","road":"une route","tree":"un arbre","boat":"un bateau","lamp":"une lampe","coin":"une pièce","stranger":"un inconnu","doctor":"un médecin","king":"un roi","morning":"le matin","street":"une rue","bear":"un ours","wind":"du vent","stone":"une pierre","sleepy":"somnolent","sick":"malade","clock":"une horloge","spoon":"une cuillère","garden":"un jardin","bridge":"un pont","love":"l’amour","rice":"du riz","tea":"du thé","happiness":"le bonheur","sadness":"la tristesse","anger":"la colère","fear":"la peur","bag":"un sac","phone":"un téléphone","star":"une étoile","rain":"la pluie","frog":"une grenouille","gold":"de l’or","desk":"un bureau","rival":"un rival","worry":"l’inquiétude","sister":"une sœur"},"it":{"beach":"una spiaggia","plate":"un piatto","game":"un gioco","door":"una porta","cat":"un gatto","dog":"un cane","hat":"un cappello","car":"un'auto","bread":"pane","water":"acqua","fire":"fuoco","money":"denaro","tired":"stanco","happy":"felice","hungry":"affamato","angry":"arrabbiato","book":"un libro","table":"un tavolo","shoe":"una scarpa","key":"una chiave","friend":"un amico","brother":"un fratello","neighbor":"un vicino","teacher":"un insegnante","gift":"un regalo","song":"una canzone","bird":"un uccello","fish":"un pesce","wine":"vino","milk":"latte","sad":"triste","busy":"occupato","pen":"una penna","chair":"una sedia","window":"una finestra","enemy":"un nemico","cousin":"un cugino","guest":"un ospite","late":"in ritardo","mouse":"un topo","horse":"un cavallo","cow":"una mucca","salt":"sale","oil":"olio","house":"una casa","road":"una strada","tree":"un albero","boat":"una barca","lamp":"una lampada","coin":"una moneta","stranger":"uno sconosciuto","doctor":"un medico","king":"un re","morning":"mattina","street":"una strada","bear":"un orso","wind":"vento","stone":"una pietra","sleepy":"assonnato","sick":"malato","clock":"un orologio","spoon":"un cucchiaio","garden":"un giardino","bridge":"un ponte","love":"amore","rice":"riso","tea":"tè","happiness":"felicità","sadness":"tristezza","anger":"rabbia","fear":"paura","bag":"una borsa","phone":"un telefono","star":"una stella","rain":"pioggia","frog":"una rana","gold":"oro","desk":"una scrivania","rival":"un rivale","worry":"preoccupazione","sister":"una sorella"},"de":{"beach":"ein Strand","plate":"ein Teller","game":"ein Spiel","door":"eine Tür","cat":"eine Katze","dog":"ein Hund","hat":"ein Hut","car":"ein Auto","bread":"Brot","water":"Wasser","fire":"Feuer","money":"Geld","tired":"müde","happy":"glücklich","hungry":"hungrig","angry":"wütend","book":"ein Buch","table":"ein Tisch","shoe":"ein Schuh","key":"ein Schlüssel","friend":"ein Freund","brother":"ein Bruder","neighbor":"ein Nachbar","teacher":"ein Lehrer","gift":"ein Geschenk","song":"ein Lied","bird":"ein Vogel","fish":"ein Fisch","wine":"Wein","milk":"Milch","sad":"traurig","busy":"beschäftigt","pen":"ein Stift","chair":"ein Stuhl","window":"ein Fenster","enemy":"ein Feind","cousin":"ein Cousin","guest":"ein Gast","late":"spät","mouse":"eine Maus","horse":"ein Pferd","cow":"eine Kuh","salt":"Salz","oil":"Öl","house":"ein Haus","road":"eine Straße","tree":"ein Baum","boat":"ein Boot","lamp":"eine Lampe","coin":"eine Münze","stranger":"ein Fremder","doctor":"ein Arzt","king":"ein König","morning":"Morgen","street":"eine Straße","bear":"ein Bär","wind":"Wind","stone":"ein Stein","sleepy":"schläfrig","sick":"krank","clock":"eine Uhr","spoon":"ein Löffel","garden":"ein Garten","bridge":"eine Brücke","love":"Liebe","rice":"Reis","tea":"Tee","happiness":"Glück","sadness":"Traurigkeit","anger":"Wut","fear":"Angst","bag":"eine Tasche","phone":"ein Telefon","star":"ein Stern","rain":"Regen","frog":"ein Frosch","gold":"Gold","desk":"ein Schreibtisch","rival":"ein Rivale","worry":"Sorge","sister":"eine Schwester"},"nl":{"beach":"een strand","plate":"een bord","game":"een spel","door":"een deur","cat":"een kat","dog":"een hond","hat":"een hoed","car":"een auto","bread":"brood","water":"water","fire":"vuur","money":"geld","tired":"moe","happy":"blij","hungry":"hongerig","angry":"boos","book":"een boek","table":"een tafel","shoe":"een schoen","key":"een sleutel","friend":"een vriend","brother":"een broer","neighbor":"een buur","teacher":"een leraar","gift":"een cadeau","song":"een lied","bird":"een vogel","fish":"een vis","wine":"wijn","milk":"melk","sad":"verdrietig","busy":"druk","pen":"een pen","chair":"een stoel","window":"een raam","enemy":"een vijand","cousin":"een neef","guest":"een gast","late":"laat","mouse":"een muis","horse":"een paard","cow":"een koe","salt":"zout","oil":"olie","house":"een huis","road":"een weg","tree":"een boom","boat":"een boot","lamp":"een lamp","coin":"een munt","stranger":"een vreemdeling","doctor":"een dokter","king":"een koning","morning":"ochtend","street":"een straat","bear":"een beer","wind":"wind","stone":"een steen","sleepy":"slaperig","sick":"ziek","clock":"een klok","spoon":"een lepel","garden":"een tuin","bridge":"een brug","love":"liefde","rice":"rijst","tea":"thee","happiness":"geluk","sadness":"verdriet","anger":"woede","fear":"angst","bag":"een tas","phone":"een telefoon","star":"een ster","rain":"regen","frog":"een kikker","gold":"goud","desk":"een bureau","rival":"een rivaal","worry":"zorg","sister":"een zus"},"tr":{"beach":"plaj","plate":"tabak","game":"oyun","door":"kapı","cat":"kedi","dog":"köpek","hat":"şapka","car":"araba","bread":"ekmek","water":"su","fire":"ateş","money":"para","tired":"yorgun","happy":"mutlu","hungry":"aç","angry":"kızgın","book":"kitap","table":"masa","shoe":"ayakkabı","key":"anahtar","friend":"arkadaş","brother":"erkek kardeş","neighbor":"komşu","teacher":"öğretmen","gift":"hediye","song":"şarkı","bird":"kuş","fish":"balık","wine":"şarap","milk":"süt","sad":"üzgün","busy":"meşgul","pen":"kalem","chair":"sandalye","window":"pencere","enemy":"düşman","cousin":"kuzen","guest":"misafir","late":"geç","mouse":"fare","horse":"at","cow":"inek","salt":"tuz","oil":"yağ","house":"ev","road":"yol","tree":"ağaç","boat":"tekne","lamp":"lamba","coin":"madeni para","stranger":"yabancı","doctor":"doktor","king":"kral","morning":"sabah","street":"sokak","bear":"ayı","wind":"rüzgar","stone":"taş","sleepy":"uykulu","sick":"hasta","clock":"saat","spoon":"kaşık","garden":"bahçe","bridge":"köprü","love":"aşk","rice":"pirinç","tea":"çay","happiness":"mutluluk","sadness":"üzüntü","anger":"öfke","fear":"korku","bag":"çanta","phone":"telefon","star":"yıldız","rain":"yağmur","frog":"kurbağa","gold":"altın","desk":"masa","rival":"rakip","worry":"endişe","sister":"kız kardeş"},"vi":{"beach":"bãi biển","plate":"cái đĩa","game":"trò chơi","door":"cánh cửa","cat":"con mèo","dog":"con chó","hat":"cái mũ","car":"chiếc xe","bread":"bánh mì","water":"nước","fire":"lửa","money":"tiền","tired":"mệt","happy":"vui","hungry":"đói","angry":"tức giận","book":"sách","table":"cái bàn","shoe":"chiếc giày","key":"chìa khóa","friend":"bạn","brother":"anh trai","neighbor":"hàng xóm","teacher":"giáo viên","gift":"món quà","song":"bài hát","bird":"con chim","fish":"con cá","wine":"rượu vang","milk":"sữa","sad":"buồn","busy":"bận","pen":"cái bút","chair":"cái ghế","window":"cửa sổ","enemy":"kẻ thù","cousin":"anh em họ","guest":"khách","late":"muộn","mouse":"con chuột","horse":"con ngựa","cow":"con bò","salt":"muối","oil":"dầu","house":"ngôi nhà","road":"con đường","tree":"cái cây","boat":"con thuyền","lamp":"cái đèn","coin":"đồng xu","stranger":"người lạ","doctor":"bác sĩ","king":"vị vua","morning":"buổi sáng","street":"đường phố","bear":"con gấu","wind":"gió","stone":"hòn đá","sleepy":"buồn ngủ","sick":"ốm","clock":"đồng hồ","spoon":"cái thìa","garden":"khu vườn","bridge":"cây cầu","love":"tình yêu","rice":"cơm","tea":"trà","happiness":"hạnh phúc","sadness":"nỗi buồn","anger":"sự tức giận","fear":"nỗi sợ","bag":"cái túi","phone":"điện thoại","star":"ngôi sao","rain":"mưa","frog":"con ếch","gold":"vàng","desk":"cái bàn học","rival":"đối thủ","worry":"nỗi lo","sister":"chị gái"},"hu":{"beach":"strand","plate":"tányér","game":"játék","door":"ajtó","cat":"macska","dog":"kutya","hat":"kalap","car":"autó","bread":"kenyér","water":"víz","fire":"tűz","money":"pénz","tired":"fáradt","happy":"boldog","hungry":"éhes","angry":"mérges","book":"könyv","table":"asztal","shoe":"cipő","key":"kulcs","friend":"barát","brother":"testvér","neighbor":"szomszéd","teacher":"tanár","gift":"ajándék","song":"dal","bird":"madár","fish":"hal","wine":"bor","milk":"tej","sad":"szomorú","busy":"elfoglalt","pen":"toll","chair":"szék","window":"ablak","enemy":"ellenség","cousin":"unokatestvér","guest":"vendég","late":"késő","mouse":"egér","horse":"ló","cow":"tehén","salt":"só","oil":"olaj","house":"ház","road":"út","tree":"fa","boat":"csónak","lamp":"lámpa","coin":"érme","stranger":"idegen","doctor":"orvos","king":"király","morning":"reggel","street":"utca","bear":"medve","wind":"szél","stone":"kő","sleepy":"álmos","sick":"beteg","clock":"óra","spoon":"kanál","garden":"kert","bridge":"híd","love":"szerelem","rice":"rizs","tea":"tea","happiness":"boldogság","sadness":"szomorúság","anger":"harag","fear":"félelem","bag":"táska","phone":"telefon","star":"csillag","rain":"eső","frog":"béka","gold":"arany","desk":"íróasztal","rival":"vetélytárs","worry":"aggodalom","sister":"nővér"},"ar":{"beach":"شاطئ","plate":"صحن","game":"لعبة","door":"باب","cat":"قطة","dog":"كلب","hat":"قبعة","car":"سيارة","bread":"خبز","water":"ماء","fire":"نار","money":"مال","tired":"متعب","happy":"سعيد","hungry":"جائع","angry":"غاضب","book":"كتاب","table":"طاولة","shoe":"حذاء","key":"مفتاح","friend":"صديق","brother":"أخ","neighbor":"جار","teacher":"معلم","gift":"هدية","song":"أغنية","bird":"طائر","fish":"سمكة","wine":"نبيذ","milk":"حليب","sad":"حزين","busy":"مشغول","pen":"قلم","chair":"كرسي","window":"نافذة","enemy":"عدو","cousin":"قريب","guest":"ضيف","late":"متأخر","mouse":"فأر","horse":"حصان","cow":"بقرة","salt":"ملح","oil":"زيت","house":"منزل","road":"طريق","tree":"شجرة","boat":"قارب","lamp":"مصباح","coin":"عملة","stranger":"غريب","doctor":"طبيب","king":"ملك","morning":"صباح","street":"شارع","bear":"دب","wind":"ريح","stone":"حجر","sleepy":"نعسان","sick":"مريض","clock":"ساعة","spoon":"ملعقة","garden":"حديقة","bridge":"جسر","love":"حب","rice":"أرز","tea":"شاي","happiness":"سعادة","sadness":"حزن","anger":"غضب","fear":"خوف","bag":"حقيبة","phone":"هاتف","star":"نجمة","rain":"مطر","frog":"ضفدع","gold":"ذهب","desk":"مكتب","rival":"منافس","worry":"قلق","sister":"أخت"}};

// UI locale -> option-dictionary bucket (mirrors the player/design nbase()).
export function gameBase(code?: string): string {
  if (!code) return "en";
  if (code.indexOf("zh") === 0)
    return code.toLowerCase().includes("tw") || code.includes("Hant") ? "zh-TW" : "zh-CN";
  if (code.indexOf("pt") === 0) return "pt";
  if (code.indexOf("en") === 0) return "en";
  const two = code.split("-")[0];
  return GAME_OPT[code] ? code : GAME_OPT[two] ? two : "en";
}

// Localized word for a concept in the viewer’s language.
export function optWord(locale: string | undefined, concept: string): string {
  const dict = GAME_OPT[gameBase(locale)] || GAME_OPT.en;
  return dict[concept] || concept;
}

// Stable filename for a word's pre-generated pronunciation clip. FNV-1a over
// `${bcp}|${word}` — deterministic across Node and the browser, so the audio
// generator (scripts/generate-game-audio.mjs) and the player compute the same
// name for words that can't be a filesystem-safe slug (CJK, accents, etc).
// NOTE: keep this identical to audioKey() in scripts/generate-game-audio.mjs.
export function audioKey(bcp: string, word: string): string {
  const s = `${bcp}|${word}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}
