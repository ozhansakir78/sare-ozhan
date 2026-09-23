import type { TopicStudyNote } from '@/types/study';

export const INGILIZCE_NOTES: TopicStudyNote[] = [
  {
    topicId: 'ing-unit-1-friendship',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 1: Friendship',
    lgsFrequency: 'Her yıl kesin 1-2 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Making Offers & Invitations: Would you like to join us? / Why don\'t we...? / How about / What about + V-ing? / Shall we...? / Let\'s + V1.',
      'Accepting (Kabul Etme): Yes, I\'d love to! / Sure, that sounds great! / Awesome! / That would be wonderful!',
      'Refusing & Apologizing (Reddetme ve Mazeret Bildirme): I\'m sorry, but I can\'t. / I\'d love to, but I\'m busy. / I have to study for my exam.',
      'Key Vocabulary - Personality Traits: Honest (dürüst), Generous (cömert), Stubborn (inatçı), Reliable (güvenilir), Tactful (kibar/ince düşünceli), Amusing (eğlenceli).',
      'Key Phrasal Verbs: Count on / Depend on / Trust (güvenmek), Back up / Support (desteklemek), Get on well with (biriyle iyi geçinmek), Have in common (ortak noktası olmak).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Refuses the invitation by making an excuse" (Mazeret bildirerek reddeder) sorusunda mazeretsiz sadece "No, I can\'t" diyen şıkka düşmek! Mazeret (excuse) içeren şıkkı seçmelisin ("I\'d love to, but my cousins are visiting us").',
      'MEB Tuzak 2: "Generous" ile "Jealous" kelimelerini karıştırmak! Generous cömert (olumlu), Jealous kıskanç (olumsuz) demektir.',
    ],
    questionStrategy:
      'Soru kökünde ACCEPT (kabul), REFUSE (reddet) veya EXCUSE (mazeret) kelimelerini daire içine al. Şıklardaki duygu tonuna (+ / -) göre eşleştir.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-1',
    exampleQuestion: {
      questionText: 'Emily invites Sarah to a rock concert on Saturday. Sarah wants to attend, but she has a doctor appointment. Which of the following is Sarah\'s response?',
      solutionSteps: [
        '1. Adım: Sarah katılmak istiyor ama mazereti (doktor randevusu) var.',
        '2. Adım: Cevabı kibar bir ret ve mazeret içermelidir: "I\'d love to, but I have a doctor\'s appointment."',
      ],
      keyTakeaway: '"I\'d love to, but..." kalıbı LGS\'de mazeretli ret kalıplarının kraliçesidir!',
    },
  },
  {
    topicId: 'ing-unit-2-teen-life',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 2: Teen Life',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Expressing Preferences (Prefer): prefer X to Y (X\'i Y\'ye tercih etmek). Prefer + V-ing to V-ing (I prefer reading to watching TV). To\'dan önceki tercih edilendir!',
      'Expressing Likes & Dislikes: Be fond of (düşkün olmak), Keen on (meraklı/düşkün), Crazy about (delisi olmak), Interested in (ilgili olmak).',
      'Dislikes: Can\'t stand (katlanamamak), Unbearable (katlanılmaz/çekilmez), Ridiculous (gülünç/saçma).',
      'Daily Routines: Wake up, get dressed, brush teeth, attend after-school club, have a chat with friends.',
      'Types of Music: Classical, rock, jazz, pop, heavy metal, folk music. Trendy (moda), Terrific (harika), Boring (sıkıcı).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "I prefer pop to rock" cümlesinde to\'dan sonraki değil, TO\'DAN ÖNCEKİ TERCİH EDİLENDİR! (Pop müziği Rock müziğe tercih eder -> Pop sever, rock sevmez).',
      'MEB Tuzak 2: "Can\'t stand" ifadesini olumlu sanmak; can\'t stand NEFRET ETMEK, KATLANAMAMAK demektir (Olumsuzdur).',
    ],
    questionStrategy:
      'Grafik sorularında yüzdeleri oku: %60 olan en çok tercih edilen (most popular), %5 olan en az (least popular) olandır. Prefer cümlelerinde ilk kelimeye odaklan.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-2',
    exampleQuestion: {
      questionText: '"Alex prefers playing basketball to playing tennis." According to the sentence, which sport does Alex like more?',
      solutionSteps: [
        '1. Adım: "prefer A to B" kuralına göre A tercih edilendir.',
        '2. Adım: A = playing basketball.',
        '3. Sonuç: Alex basketbol oynamayı tenise tercih etmektedir (Basketbolu daha çok sever).',
      ],
      keyTakeaway: 'Prefer kalıbında TO\'dan önce gelen spor/etkinlik daima sevilendir.',
    },
  },
  {
    topicId: 'ing-unit-3-in-the-kitchen',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 3: In The Kitchen',
    lgsFrequency: 'Her yıl kesin 1 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Cooking Methods (Pişirme Yöntemleri): Bake (fırında hamur pişirmek), Roast (fırında et/tavuk kızartmak), Fry (yağda kızartmak), Boil (suda kaynatmak), Steam (buharda pişirmek), Grill (ızgarada pişirmek).',
      'Process Words (Aşama Kelimeleri): First (İlk olarak) -> Second (İkinci olarak) -> Then (Daha sonra) -> Next (Sonrasında) -> After that (Ondan sonra) -> Finally (Son olarak).',
      'Kitchen Actions (Mutfak Eylemleri): Chop (doğramak), Dice (küp küp doğramak), Peel (kabuğunu soymak), Slice (dilimlemek), Stir (karıştırmak), Knead (hamur yoğurmak), Pour (dökmek/akıtmak), Squeeze (sıkmak).',
      'Kitchen Tools: Baking tray (fırın tepsisi), Bowl (kase), Grater (rende), Saucepan (tencere), Frying pan (tava), Whisk (çırpıcı).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "What should you do BEFORE / AFTER adding salt?" soruları! "Before" denirse bir önceki adımı, "After" denirse bir sonraki adımı seçmelisin!',
      'MEB Tuzak 2: Fry (yağda kızartma) ile Boil (suda haşlama) kelimelerini karıştırmak.',
    ],
    questionStrategy:
      'Soru kökündeki BEFORE (önce) ve AFTER (sonra) kelimelerine çok dikkat et! Tarif basamaklarını numaralandır (1, 2, 3, 4, 5).',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-3',
    exampleQuestion: {
      questionText: 'Recipe step: "First, peel the potatoes. Next, slice them. Then, fry them in hot oil." What is the step BEFORE frying the potatoes?',
      solutionSteps: [
        '1. Adım: Soru patatesleri kızartmadan (frying) ÖNCEKİ (before) adımı soruyor.',
        '2. Adım: Kızartmadan hemen önceki adım: "Next, slice them" (onları dilimleyin).',
        '3. Sonuç: Doğru adım "Slice the potatoes"dur.',
      ],
      keyTakeaway: 'Before dendiğinde bir önceki adıma, after dendiğinde bir sonraki adıma bakılır.',
    },
  },
  {
    topicId: 'ing-unit-4-on-the-phone',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 4: On The Phone',
    lgsFrequency: 'Her yıl kesin 1 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Answering & Introducing: Hello, this is Mark speaking. / May I speak to John, please? / Who is calling? (Kiminle görüşüyorum?).',
      'Connecting & Waiting: Hang on a minute / Hold on please (Hatta bekleyin). / I\'ll put you through to him (Sizi ona bağlıyorum).',
      'Leaving a Message: Could you tell him to call me back? / Would you like to leave a message? (Mesaj bırakmak ister misiniz?).',
      'Unavailable Responses (Meşgul/Ulaşılamıyor): He is not available right now. / The line is engaged/busy (Hat meşgul). / He has gone out.',
      'Ways of Communication: Text a message, make a phone call, send an email, meet up face-to-face, write a letter, use social networks.',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Hang on" ile "Hang up" kelimelerini karıştırmak! "Hang on" hatta beklemek (bekle), "Hang up" telefonu kapatmaktır!',
      'MEB Tuzak 2: "Put through" ifadesi telefonda birini başkasına bağlamaktır.',
    ],
    questionStrategy:
      'Diyalog sorularında boşluktan hemen önceki ve sonraki cümleyi oku. Eğer karşıdaki "Hang on, I\'ll connect you" diyorsa aranan kişi müsaittir; "Would you like to leave a message?" diyorsa aranan kişi müsait değildir.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-4',
    exampleQuestion: {
      questionText: 'Secretary: "Company XYZ, how can I help you?" - Caller: "Hello, may I speak to Mr. Parker?" - Secretary: "I\'m afraid he is in a meeting. _________?" Which sentence completes the blank?',
      solutionSteps: [
        '1. Adım: Sekreter Mr. Parker\'ın toplantıda olduğunu ve müsait olmadığını belirtiyor.',
        '2. Adım: Bu durumda sekreterin arayana soracağı standart nezaket sorusu "Would you like to leave a message?" (Mesaj bırakmak ister misiniz?) cümlesidir.',
      ],
      keyTakeaway: 'Aranan kişi meşgulse sekreter daima mesaj bırakmak isteyip istemediğini sorar.',
    },
  },
  {
    topicId: 'ing-unit-5-the-internet',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 5: The Internet',
    lgsFrequency: 'Her yıl kesin 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Internet Vocabulary: Web browser (tarayıcı), Search engine (arama motoru), Log in / Sign in (giriş yapmak), Sign up / Register (kaydolmak), Log out (çıkış yapmak).',
      'File Actions: Download (internetten indirmek), Upload (internete yüklemek), Attachment (dosya eki), Delete (silmek), Confirm (onaylamak).',
      'Account Terms: Password (şifre), Username (kullanıcı adı), Connection (bağlantı), Device (cihaz).',
      'Internet Safety Rules (İnternet Güvenlik Kuralları): Don\'t share personal info (Kişisel bilgilerini paylaşma). / Don\'t meet online friends offline (İnternette tanıştığın kişilerle buluşma). / Create a strong password (Güçlü şifre oluştur). / Don\'t open attachments from strangers (Yabancılardan gelen ekleri açma).',
    ],
    mebTraps: [
      'MEB Tuzak 1: Upload (internete göndermek/yüklemek) ile Download (internetten bilgisayara indirmek) kelimelerini ters eşleştirmek.',
      'MEB Tuzak 2: Güvenlik kurallarında "Do" ile "Don\'t" kalıplarını ters okumak.',
    ],
    questionStrategy:
      'İnternet güvenliği sorularında kural basittir: Güçlü şifre (harf + rakam) oluştur, kişisel bilgi (adres, telefon, okul) paylaşma, tanımadığın kişilerin mesajlarına tıklama.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-5',
    exampleQuestion: {
      questionText: 'Which of the following is NOT a safe rule when using the Internet? A) Create a strong password B) Share your home address with online strangers C) Do not believe everything you read online D) Refuse unknown friend requests',
      solutionSteps: [
        '1. Adım: Güvenli olmayan (NOT safe) davranış aranıyor.',
        '2. Adım: B şıkkında "Share your home address with strangers" (Ev adresini yabancılarla paylaş) denmektedir.',
        '3. Sonuç: Bu tehlikeli bir davranıştır, doğru cevap B\'dir.',
      ],
      keyTakeaway: 'İnternet güvenliği sorularında "NOT safe" veya "inappropriate" (uygunsuz) kelimesini görünce kişisel bilgi paylaşımını bulun.',
    },
  },
  {
    topicId: 'ing-unit-6-adventures',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 6: Adventures',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Extreme Sports (Ekstrem Sporlar): Paragliding (yamaç paraşütü), Skydiving (paraşütle atlama), Bungee jumping, White-water rafting, Scuba diving (tüplü dalış), Rock climbing (kaya tırmanışı), Caving (mağaracılık).',
      'Adjectives for Sports: Challenging (zorlu), Dangerous (tehlikeli), Risky (riskli), Eye-catching (göz alıcı), Fascinating (büyüleyici), Adrenaline-seeker (adrenalin tutkunu).',
      'Equipment: Helmet (kask), Life jacket (can yeleği), Wetsuit (dalış kıyafeti), Rope (ip), Parachute (paraşüt), Goggles (koruyucu gözlük).',
      'Comparing Sports: Paragliding is more challenging than trekking. / I think bungee jumping is less dangerous than skydiving.',
    ],
    mebTraps: [
      'MEB Tuzak 1: "More dangerous" (daha tehlikeli) ile "Less dangerous" (daha az tehlikeli) kıyaslamalarını ters anlamak.',
      'MEB Tuzak 2: Ekipman eşleştirmelerinde kaskı (helmet) rafting ve tırmanışla, can yeleğini (life jacket) su sporlarıyla eşleştirmeyi unutmak.',
    ],
    questionStrategy:
      'Metinde adrenalin, heyecan ve risk seven biri varsa (adrenalin junkie / extreme sports lover) rafting veya skydiving seçer; sakinliği ve doğayı seven biri varsa trekking veya caving seçer.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-6',
    exampleQuestion: {
      questionText: 'Tom is an adrenaline seeker and loves water sports. Which extreme sport should Tom try? A) Paragliding B) White-water rafting C) Rock climbing D) Bungee jumping',
      solutionSteps: [
        '1. Adım: Tom hem adrenalin seviyor hem de SU SPORU (water sport) yapmak istiyor.',
        '2. Adım: Şıklardaki tek su sporu "White-water rafting"dir.',
        '3. Sonuç: Doğru cevap B şıkkıdır.',
      ],
      keyTakeaway: 'İpuçlarını eşleştirin: Su sporu dendiğinde rafting veya scuba diving doğrudan cevaptır.',
    },
  },
  {
    topicId: 'ing-unit-7-tourism',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 7: Tourism',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Tourism Types: Historic tourism (ancient ruins, museums, castles), Seaside/Beach tourism (seaside, resorts, sandy beaches), Cultural tourism (traditions, local food), Winter tourism (skiing).',
      'Accommodation (Konaklama): All-inclusive hotel (her şey dahil otel), Bed and breakfast (oda-kahvaltı), Guesthouse (pansiyon), Tent / Camping.',
      'Key Vocabulary: Ancient (antik/eski), Historic site (tarihi mekan), Destination (varış noktası), Climate (iklim), Incredible (inanılmaz), Attraction (turistik çekim yeri), Souvenir (hediyelik eşya).',
      'Present Perfect / Past Experiences: Have you ever been to Rome? / I have visited Pamukkale before.',
    ],
    mebTraps: [
      'MEB Tuzak 1: "All-inclusive" otelin yeme-içme dahil her şeyi kapsadığını, "Bed and breakfast"ın ise sadece kahvaltı sunduğunu unutmak.',
      'MEB Tuzak 2: Tarih seven turiste plaj tatili, deniz seven turiste müze tatili önermek.',
    ],
    questionStrategy:
      'Turistin ilgi alanını belirle: Eğer "interested in history, architecture, old buildings" diyorsa antik kent (Ephesus/Cappadocia); "sunny weather, seaside, swimming" diyorsa sahil (Antalya/Bodrum) eşleştirmesi yap.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-7',
    exampleQuestion: {
      questionText: 'Sarah loves ancient architecture and learning about past civilizations. Which destination is the best for her? A) A seaside resort in Antalya B) Historic ruins of Ephesus C) A ski resort in Uludağ D) An amusement park',
      solutionSteps: [
        '1. Adım: Sarah antik mimari (ancient architecture) ve geçmiş uygarlıkları (past civilizations) seviyor.',
        '2. Adım: Bu ilgi alanına en uygun yer antik kalıntıların bulunduğu Efes (Ephesus)\'tir.',
        '3. Sonuç: Doğru cevap B şıkkıdır.',
      ],
      keyTakeaway: 'İlgi alanındaki anahtar sözcükleri (ancient, civilizations) doğrudan tarihi mekanlarla (Ephesus) eşleştirin.',
    },
  },
  {
    topicId: 'ing-unit-8-chores',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 8: Chores',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Household Chores (Ev İşleri): Mop the floor (yeri paspaslamak), Vacuum the floor (süpürgeyle süpürmek), Dust the furniture (toz almak), Do the laundry (çamaşır yıkamak), Iron the clothes (ütü yapmak), Wash the dishes / Load the dishwasher (bulaşık), Take out the garbage/trash (çöpü çıkarmak), Make the bed (yatağı toplamak), Set the table (masayı kurmak).',
      'Obligation & Responsibilities: Must / Have to / Need to (zorunda olmak). / It is my duty to... (benim görevim). / Be responsible for + V-ing (sorumlu olmak: I am responsible for washing the car).',
      'Rules & Respect: Keep promises (sözünü tutmak), Respect each other (birbirine saygı duymak), Obey the rules (kurallara uymak).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Responsible for" edatından sonra fiilin -ing aldığı kuralını atlamak (responsible for cleaning).',
      'MEB Tuzak 2: Ev işlerinin yapıldığı yerleri karıştırmak: Mutfak işleri (dishes, cooking), yatak odası (make bed), salon (dust furniture).',
    ],
    questionStrategy:
      'Aile tablosu sorularında kimin hangi günden ve hangi işten sorumlu olduğunu küçük notlar alarak eşleştir. "Kitchen chores" derse bulaşık veya yemek hazırlamayı ara.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-8',
    exampleQuestion: {
      questionText: 'Which of the following chores belongs to the KITCHEN? A) Making the bed B) Washing the dishes C) Dusting the shelves D) Mopping the balcony',
      solutionSteps: [
        '1. Adım: Mutfağa ait olan ev işi (kitchen chore) sorulmaktadır.',
        '2. Adım: Bulaşıkları yıkamak (Washing the dishes) mutfakta yapılan bir ev işidir.',
        '3. Sonuç: Doğru cevap B şıkkıdır.',
      ],
      keyTakeaway: 'Mutfak işleri (dishes, cooking, taking out trash) ile yatak odası/salon işlerini mekanlarına göre gruplandırın.',
    },
  },
  {
    topicId: 'ing-unit-9-science',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 9: Science',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Key Science Actions: Discover (keşfetmek - zaten var olanı bulmak: yer çekimi, kıta), Invent (icat etmek - yeni bir cihaz yapmak: telefon, ampul), Conduct an experiment (deney yapmak), Examine (incelemek), Operate (ameliyat etmek/çalıştırmak), Develop (geliştirmek).',
      'Science Vocabulary: Scientist (bilim insanı), Inventor (mucit), Lab / Laboratory (laboratuvar), Test tube (deney tüpü), Microscope (mikroskop), Vaccination / Vaccine (aşı), Cure (tedavi/çare).',
      'Famous Figures: Thomas Edison (ampulün mucidi), Alexander Graham Bell (telefonun mucidi), Isaac Newton (yerçekimi kanunu), Marie Curie (radyoaktivite).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Discover" (Keşfetmek) ile "Invent" (İcat etmek) kelimelerini karıştırmak! Newton yer çekimini İCAT ETMEMİŞTİR, KEŞFETMİŞTİR (discovered). Edison ampulü İCAT ETMİŞTİR (invented).',
      'MEB Tuzak 2: Laboratuvar araçlarını ters eşleştirmek (Test tube: deney tüpü; Microscope: mikroskop).',
    ],
    questionStrategy:
      'Doğada zaten var olan bir şey (yer çekimi, yeni gezegen, elektrik) anlatılıyorsa DISCOVER; insanın tasarladığı mekanik/teknolojik bir aletse INVENT kelimesini seç.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-9',
    exampleQuestion: {
      questionText: 'Alexander Graham Bell __________ the telephone in 1876. Which word correctly completes the sentence? A) discovered B) invented C) examined D) destroyed',
      solutionSteps: [
        '1. Adım: Telefon insan eliyle üretilmiş yeni bir teknolojik cihazdır.',
        '2. Adım: Cihaz ve alet yapımı için "icat etmek" (invent) fiili kullanılır.',
        '3. Sonuç: Doğru kelime INVENTED (B şıkkı)\'dır.',
      ],
      keyTakeaway: 'Telefon, araba, ampul gibi yapay aletler için INVENT; yerçekimi, kıta, elementler için DISCOVER kullanılır.',
    },
  },
  {
    topicId: 'ing-unit-10-natural-forces',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    topicName: 'Unit 10: Natural Forces',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Natural Disasters: Earthquake (deprem), Flood (sel/su baskını), Drought (kuraklık), Avalanche (çığ), Tsunami (dev dalga), Landslide (toprak kayması/heyelan), Volcanic eruption (yanardağ patlaması), Hurricane / Tornado (kasırga/hortum).',
      'Environmental Problems: Global warming (küresel ısınma), Deforestation (ormanların yok edilmesi), Pollution (kirlilik - air, water, soil), Waste of water (su israfı), Melting glaciers (buzulların erimesi).',
      'Precautions & Solutions: Plant trees (ağaç dikmek), Save energy and water (enerji ve su tasarrufu yapmak), Recycle (geri dönüştürmek), Use renewable energy (yenilenebilir enerji kullanmak), Don\'t pollute rivers (nehirleri kirletme).',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Drought" (kuraklık - su eksikliği) ile "Flood" (sel - aşırı su baskını) felaketlerini zıt anlamlar olarak unutmamak.',
      'MEB Tuzak 2: Doğal afetler (earthquake, flood) ile insanların neden olduğu çevre sorunlarını (deforestation, water pollution) karıştırmamak.',
    ],
    questionStrategy:
      '"Lack of rain / water shortage" (yağmur eksikliği) diyorsa DROUGHT; "overflow of water / heavy rain" diyorsa FLOOD; "shaking of the ground" diyorsa EARTHQUAKE işaretlenmelidir.',
    relatedExamSlug: 'lgs-sozel-ingilizce-unite-10',
    exampleQuestion: {
      questionText: '"Because of the lack of rain for months, lakes dried up and farmers couldn\'t water their crops." Which natural disaster is mentioned? A) Avalanche B) Flood C) Drought D) Earthquake',
      solutionSteps: [
        '1. Adım: Metinde aylarca yağmur yağmaması (lack of rain) ve göllerin kuruması (dried up) anlatılıyor.',
        '2. Adım: Su ve yağmur yetersizliğinden kaynaklanan afet "DROUGHT" (kuraklık)\'tır.',
        '3. Sonuç: Doğru cevap C şıkkıdır.',
      ],
      keyTakeaway: 'Lack of rain, water shortage ve dried up ifadeleri doğrudan DROUGHT (kuraklık) afetiyle eşleşir.',
    },
  },
];
