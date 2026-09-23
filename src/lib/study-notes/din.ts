import type { TopicStudyNote } from '@/types/study';

export const DIN_NOTES: TopicStudyNote[] = [
  {
    topicId: 'din-kader',
    courseKey: 'din',
    courseName: 'Din Kültürü',
    topicName: 'Kader İnancı (Kaza ve Kader)',
    lgsFrequency: 'Her yıl 2-3 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Kader: Allah\'ın her şeyi bir ölçü, düzen ve plana göre takdir etmesidir (Plan, program, ölçü).',
      'Kaza: Takdir edilen planın zamanı ve yeri gelince gerçekleşmesidir (Olayın meydana gelmesi).',
      'EVRENİN YASALARI (SÜNNETULLAH):',
      '1. Fiziksel Yasalar: Madde ve enerjinin yapısı, yer çekimi, suyun kaldırma kuvveti, gece-gündüz oluşumu, mevsimler (Deney ve gözlemle ispatlanabilir cansız varlıklar).',
      '2. Biyolojik Yasalar: Canlıların yapısı, üremesi, fotosentez, solunum, DNA, göçmen kuşların kanat yapısı, develerin hörgüçleri (Canlılar dünyası).',
      '3. Toplumsal Yasalar: İnsanlar arası ilişkiler, adalet, hak, eşitlik, göç, kul hakkı, ahlak, yardımlaşma.',
      'İrade Türleri: Küllî İrade (Allah\'ın sonsuz iradesi - cinsiyetimiz, ırkımız, doğum yerimiz; insan bundan sorumlu DEĞİLDİR). Cüz\'î İrade (İnsanın seçme özgürlüğü - iyiyi/kötüyü seçmek; insan bundan SORUMLUDUR).',
      'Tevekkül: İnsanın üzerine düşen tüm tedbirleri eksiksiz aldıktan sonra sonucu Allah\'a bırakıp güvenmesidir. Tedbir almadan dua etmek tevekkül DEĞİLDİR!',
    ],
    mebTraps: [
      'MEB Tuzak 1: "Hastalığa yakalanmamak için aşı olmak" tedbirdir (Tevekkül). Ancak "Hasta olursam kaderimmiş deyip doktora gitmemek" tembelliktir, yanlış kader anlayışıdır.',
      'MEB Tuzak 2: Gök cisimlerinin hareketi Fiziksel yasadır; canlıların çevreye uyumu Biyolojik yasadır; göç ve savaşlar Toplumsal yasadır.',
      'MEB Tuzak 3: Ecel ve ömür Allah\'ın takdirindedir ancak insanın kendi ihmalinden kaynaklanan kazalarda sorumluluk insanın cüz\'i iradesindedir.',
    ],
    questionStrategy:
      'Ayet veya hadis verildiğinde: Canlıdan (hücre, tohum, deve) bahsediyorsa BİYOLOJİK; gezegen, su, yerçekiminden bahsediyorsa FİZİKSEL; adalet, eşitlik, göçten bahsediyorsa TOPLUMSAL yasayı seç.',
    relatedExamSlug: 'lgs-sozel-din-unite-1',
    exampleQuestion: {
      questionText: '"Güneş ve Ay bir hesaba göre hareket etmektedir." (Rahmân Suresi 5. ayet) hangi evrensel yasaya örnektir?',
      solutionSteps: [
        '1. Adım: Güneş ve Ay gök cismidir, maddedir.',
        '2. Adım: Hareketleri yerçekimi ve yörünge dengesine dayanır.',
        '3. Sonuç: Bu ayet FİZİKSEL YASALAR kapsamındadır.',
      ],
      keyTakeaway: 'Gök cisimleri, yer çekimi ve madde düzeni daima FİZİKSEL yasalardır.',
    },
  },
  {
    topicId: 'din-zekat-sadaka',
    courseKey: 'din',
    courseName: 'Din Kültürü',
    topicName: 'Zekât ve Sadaka İbadeti',
    lgsFrequency: 'Her yıl 2-3 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Zekât: Dinen zengin sayılan Müslümanların yılda bir kez mallarının belirli bir kısmını ihtiyaç sahiplerine vermesidir (FARZDIR).',
      'Nisap Miktarı: Temel ihtiyaçlar ve borçlar dışında 80,18 gram altın veya buna eşdeğer mala sahip olmaktır.',
      'ZEKÂT ORANLARI:',
      '- 1/40 (%2,5): Altın, gümüş, para, ticaret malları, koyun ve keçi (40\'tan 120\'ye kadar 1 koyun).',
      '- 1/30: Sığır ve manda (Her 30 sığır için 2 yaşında bir buzağı).',
      '- 1/10 (Öşür): Masrafsız (yağmur suyuyla) yetiştirilen toprak ürünleri. Masraflıysa (sulama, gübreleme yapılmışsa) 1/20 verilir.',
      '- Deve: Her 5 deve için 1 koyun verilir.',
      'Zekât Kimlere VERİLMEZ (Bakmakla Yükümlü Olduklarımız): Anne, baba, dede, nine (Üstsoy); Çocuklar, torunlar (Altsoy) ve EŞE zekât verilmez!',
      'Sadaka-i Cariye: İnsan öldükten sonra da sevabı devam eden kesintisiz sadakadır: Cami, okul, çeşme, köprü yaptırmak; faydalı ilmi eser bırakmak; hayırlı evlat yetiştirmek.',
      'Fitre (Sadaka-i Fıtır): Ramazan ayında bayram namazından önce verilen vacip sadakadır. Bir kişinin bir günlük yemek masrafı kadardır.',
    ],
    formulas: [
      'Altın, Para, Ticaret Malı = 1/40 (%2,5)',
      'Toprak Ürünleri (Öşür) = Masrafsızsa 1/10, Masraflıysa 1/20',
      'Sığır / Manda = 1/30  |  Koyun / Keçi = 1/40',
    ],
    mebTraps: [
      'MEB Tuzak 1: Zekâtı anneye, babaya veya öz çocuğa vermek! Kişi bakmakla yükümlü olduğu birinci derece yakınlarına zekât VEREMEZ.',
      'MEB Tuzak 2: Sadaka-i Cariye sorularında geçici yardımlarla kalıcı eserleri karıştırmak (Yoksula yemek vermek normal sadakadır; aşevi veya çeşme yaptırmak Sadaka-i Cariye\'dir).',
      'MEB Tuzak 3: Zekât verirken başa kakmak, gösteriş yapmak ibadetin sevabını yok eder ("Sağ elin verdiğini sol el görmemelidir").',
    ],
    questionStrategy:
      'Oran sorularında malın türüne bak: Para/altınsa %2,5; tarım ürünüyse masrafa bak (masrafsızsa 1/10, masraflıysa 1/20). Kimlere verilir sorularında teyze, dayı, amca, fakir komşuya verilebileceğini hatırla.',
    relatedExamSlug: 'lgs-sozel-din-unite-2',
    exampleQuestion: {
      questionText: 'Aşağıdakilerden hangisi bir Müslümanın vefatından sonra da amel defterinin kapanmamasını sağlayan "Sadaka-i Cariye"ye örnek gösterilemez? A) Herkesin faydalandığı bir çeşme yaptırmak B) Bir yoksula bayramlık kıyafet almak C) Öğrencilerin okuduğu bir kütüphane inşa etmek D) İnsanlığa faydalı bir aşı geliştirmek',
      solutionSteps: [
        '1. Adım: Sadaka-i Cariye kalıcı, uzun yıllar faydası devam eden hayırlardır.',
        '2. Adım: Çeşme, kütüphane ve faydalı bilimsel buluş öldükten sonra da fayda sağlar.',
        '3. Adım: Yoksula kıyafet almak tek seferlik güzel bir sadakadır ancak kalıcı Sadaka-i Cariye değildir.',
        '4. Sonuç: Doğru cevap B şıkkıdır.',
      ],
      keyTakeaway: 'Sadaka-i Cariye olması için eserin kalıcı ve sürekli fayda sağlayan nitelikte olması şarttır.',
    },
  },
  {
    topicId: 'din-hayat-haklar',
    courseKey: 'din',
    courseName: 'Din Kültürü',
    topicName: 'Din ve Hayat (Temel Hakların Korunması)',
    lgsFrequency: 'Her yıl 1-2 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'İslam Dininin Korunmasını Emrettiği 5 Temel İlke (Zarurat-ı Hamse):',
      '1. Canın Korunması: Yaşama hakkı en temel haktır. İş güvenliği tedbirleri, sağlık önlemleri, intiharın ve cinayetin yasaklanması ("Bir insanı öldüren bütün insanlığı öldürmüş gibidir").',
      '2. Aklın Korunması: Aklı ve iradeyi zayıflatan alkol, uyuşturucu ve zararlı maddelerin yasaklanması.',
      '3. Neslin Korunması: Toplumun temeli ailedir. Aile kurumunun korunması, nikah, çocukların ahlaklı yetiştirilmesi, zinanın yasaklanması.',
      '4. Malın Korunması: Helal kazanç teşvik edilir; hırsızlık, gasp, faiz, rüşvet, kumar, hileli ölçü ve tartı yasaklanmıştır.',
      '5. Dinin Korunması: Dinin özünün bozulmaması, hurafe ve batıl inançlardan (büyü, fal, muska) arındırılması, din ve vicdan özgürlüğü ("Dinde zorlama yoktur").',
    ],
    mebTraps: [
      'MEB Tuzak 1: İş sağlığı ve güvenliği tedbirleri CANIN korunmasıdır; kader deyip tedbir almamak dinen kabul edilemez.',
      'MEB Tuzak 2: Ölçü ve tartıda hile yapmamak (Mutaffifin Suresi) doğrudan MALIN KORUNMASI kapsamındadır.',
    ],
    questionStrategy:
      'Soru metnindeki eyleme bak: İçki/uyuşturucu geçiyorsa AKIL; aile/evlilik geçiyorsa NESİL; hırsızlık/faiz/tartı geçiyorsa MAL; iş güvenliği/öldürmeme geçiyorsa CAN ilkesine git.',
    relatedExamSlug: 'lgs-sozel-din-unite-3',
    exampleQuestion: {
      questionText: '"Ölçtüğünüz zaman tastamam ölçün ve doğru terazi ile tartın. Bu, hem daha hayırlıdır hem de neticesi bakımından daha güzeldir." (İsrâ Suresi 35. ayet) İslam\'ın korumayı hedeflediği hangi temel ilkeyle ilgilidir?',
      solutionSteps: [
        '1. Adım: Ayette ticaret, ölçü, tartı ve dürüst kazançtan bahsedilmektedir.',
        '2. Adım: Hileli ticaret başkasının malına haksız yere el koymaktır.',
        '3. Sonuç: Doğrudan MALIN KORUNMASI ilkesiyle ilgilidir.',
      ],
      keyTakeaway: 'Ticaret ahlakı, faiz yasağı, hileli tartı ve haksız kazanç doğrudan malın korunmasına girer.',
    },
  },
  {
    topicId: 'din-hz-muhammed',
    courseKey: 'din',
    courseName: 'Din Kültürü',
    topicName: 'Hz. Muhammed\'in Doğruluğu ve Güvenilir Kişiliği',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Muhammedü\'l-Emîn: Güvenilir Muhammed anlamına gelir. Peygamberimiz peygamberlik verilmeden önce de doğruluğuyla tanınmış, Mekkeliler değerli eşyalarını ona emanet etmiştir.',
      'İstişareye (Danışmaya) Verdiği Önem: Toplumu ilgilendiren kararlarda arkadaşlarına danışmıştır (Hendek Savaşı\'nda Selman-ı Farisi\'nin önerisiyle hendek kazılması, Uhud Savaşı\'nda meydan savaşı kararında gençlerin fikrini alması, Bedir\'de ordugah yerinin belirlenmesi).',
      'Merhametli ve Affedici Oluşu: Taif\'te taşlandığı halde onlara beddua etmeyip hidayet dilemesi, Mekke\'nin fethinde kendisine zulmeden Mekkelileri affetmesi.',
      'Hakkı Gözetmedeki Hassasiyeti: Adalet konusunda hiç kimseye ayrıcalık tanımamıştır ("Suç işleyen kızım Fâtıma bile olsa onu cezalandırırım").',
      'Cesaret ve Kararlılığı: "Güneşi sağ elime, ayı sol elime koysalar yine de bu davadan vazgeçmem" sözü.',
    ],
    mebTraps: [
      'MEB Tuzak 1: Peygamberimizin vahiy gelmeyen konularda ashabına danışması onun İSTİŞARE (DANIŞMA) özelliğidir; tek başına karar vermemiştir.',
      'MEB Tuzak 2: Mekke\'nin fethinde müşrikleri bağışlaması AFFEDİCİLİK ve MERHAMET örneğidir.',
    ],
    questionStrategy:
      'Paragrafta ordu düzeni veya strateji için sahabelere fikrini sorması geçiyorsa İSTİŞARE; sözünde durması ve emanete sahip çıkması geçiyorsa GÜVENİLİRLİK (SIDK ve EMANET) ara.',
    relatedExamSlug: 'lgs-sozel-din-unite-4',
    exampleQuestion: {
      questionText: 'Hz. Muhammed\'in Hendek Savaşı öncesinde savunma taktiği konusunda sahabelerle görüş alışverişinde bulunması ve Selman-ı Farisi\'nin "şehir etrafına hendek kazma" fikrini benimsemesi onun hangi özelliğidir?',
      solutionSteps: [
        '1. Adım: Başkalarının fikirlerine başvurma ve fikir alışverişi yapılmıştır.',
        '2. Adım: Bu durum İslam ahlakında "İSTİŞARE" (DANIŞMA) olarak adlandırılır.',
      ],
      keyTakeaway: 'Fikir sorma ve ortak akılla karar alma durumları daima İSTİŞARE ilkesine örnektir.',
    },
  },
  {
    topicId: 'din-kuran-ozellikleri',
    courseKey: 'din',
    courseName: 'Din Kültürü',
    topicName: 'Kur\'an-ı Kerim ve Özellikleri',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Kur\'an\'ın Ana Konuları:',
      '1. İnanç (İtikat): Tevhid inancı (Allah\'ın birliği), meleklere, kitaplara, peygamberlere, ahirete ve kadere iman.',
      '2. İbadet: Namaz, oruç, zekat, hac gibi kulluk görevleri.',
      '3. Ahlak: Doğruluk, adalet, anne-babaya saygı, kul hakkı yememek, merhamet.',
      '4. Muamelat (Sosyal Hayat): Hukuk, miras, evlilik, ticaret ahlakı, borçlanma kuralları.',
      '5. Kıssalar: Geçmiş peygamberlerin ve milletlerin ibret verici hayat hikayeleri (Hz. Yusuf, Hz. Musa, Hz. Nuh kıssaları).',
      'Kur\'an-ı Kerim\'in Temel Özellikleri: İnsanı düşünmeye, akıl yürütmeye ve araştırmaya yöneltir ("Hiç akıl erdirmez misiniz?", "Düşünesiniz diye..."). Açıklayıcı ve yol göstericidir (Hidayet rehberi).',
    ],
    mebTraps: [
      'MEB Tuzak 1: Kıssaların sadece tarihi masal veya hikaye olduğunu sanmak! Kıssaların asıl gayesi insanların geçmiş kavimlerin hatalarından İBRET VE DERS ÇIKARMASIDIR.',
      'MEB Tuzak 2: Kur\'an ayetlerinde sıkça geçen "Akletmez misiniz?" ifadesi İslam\'ın akla ve bilime verdiği önemin kanıtıdır.',
    ],
    questionStrategy:
      'Ayet metninde Hz. Adem, Hz. Nuh veya geçmiş kavimler anlatılıyorsa KISSA; namaz veya oruç geçiyorsa İBADET; dürüstlük veya yardımseverlik geçiyorsa AHLAK konusudur.',
    relatedExamSlug: 'lgs-sozel-din-unite-5',
    exampleQuestion: {
      questionText: 'Kur\'an-ı Kerim\'de geçmişte yaşamış peygamberlerin ve kavimlerin hayatlarından ibret verici kesitlerin aktarıldığı bölümlere ne ad verilir?',
      solutionSteps: [
        '1. Adım: Geçmiş peygamberlerin ve toplulukların ders verici olaylarıdır.',
        '2. Adım: Kur\'an terminolojisinde buna "KISSA" adı verilir.',
      ],
      keyTakeaway: 'Kıssalar ibret alma, ders çıkarma ve öğüt alma amacıyla Kur\'an\'da yer alır.',
    },
  },
];
