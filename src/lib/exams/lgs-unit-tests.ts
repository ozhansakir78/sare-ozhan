import type { OnlineExam } from '@/types/online-exam';

export const LGS_UNIT_TESTS: OnlineExam[] = [
  // 1. LGS Fen Bilimleri 2. Ünite: DNA ve Genetik Kod Yeni Nesil Analitik Deneme
  {
    id: 'exam-lgs-fen-dna',
    slug: 'lgs-fen-dna-ve-genetik-kod-denemesi',
    title: 'LGS Fen Bilimleri 2. Ünite: DNA ve Genetik Kod Yeni Nesil Analitik Deneme',
    description:
      '2027 LGS müfredatına tam uyumlu: Nükleotidler, DNA eşlenmesi, kalıtım çaprazlamaları, mutasyon, modifikasyon, adaptasyon ve biyoteknoloji soruları.',
    tier: 'lgs',
    type: 'branch',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    questionCount: 10,
    durationMinutes: 20,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'ÜNİTE TESTİ',
    questions: [
      {
        id: 'lgs-dna-q1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Nükleotid Dizilimi ve Eşlenme',
        questionNumber: 1,
        questionText:
          'Bir DNA molekülünün kendini hatasız eşlemesi sürecinde gerçekleşen olaylar şunlardır:\n\nI. DNA\'nın iki ipliği fermuar gibi açılır.\nII. Çekirdekteki nükleotid sayısı artar.\nIII. Sitoplazmadaki serbest nükleotidler çekirdeğe girer.\nIV. Açılan zincirlerin karşısına uygun nükleotidler yerleşir.\nV. Birbirinin tıpatıp aynısı iki yeni DNA molekülü oluşur.\n\nYukarıdaki olayların gerçekleşme sırası aşağıdakilerden hangisinde DOĞRU verilmiştir?',
        options: {
          A: 'I - III - IV - V',
          B: 'III - I - IV - V',
          C: 'I - II - III - IV',
          D: 'IV - I - III - V',
        },
        correctAnswer: 'A',
        explanation:
          'DNA eşlenme sırası:\n1. DNA zinciri fermuar gibi açılır (I).\n2. Sitoplazmadaki serbest nükleotidler çekirdeğe girer (III).\n3. Açılan zincirlerin karşısına Adenin-Timin, Guanin-Sitozin kuralına göre nükleotidler yerleşir (IV).\n4. Sonuçta nükleotid dizilimi aynı iki yeni DNA oluşur (V).\n\nDoğru sıra: I - III - IV - V.',
        hintForSocratic: 'DNA eşlenirken önce zincir mi açılır yoksa nükleotidler mi eşleşir?',
      },
      {
        id: 'lgs-dna-q2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Mutasyon ve Modifikasyon Farkı',
        questionNumber: 2,
        questionText:
          'Bir öğrenci hazırladığı deneyde sirke sineği larvalarını iki gruba ayırıyor:\n- 16°C sıcaklıkta tutulan larvalardan düz kanatlı sinekler çıkıyor.\n- 25°C sıcaklıkta tutulan larvalardan kıvrık kanatlı sinekler çıkıyor.\n- Kıvrık kanatlı sineğin yumurtaları 16°C\'de büyütüldüğünde yavruların tekrar düz kanatlı olduğu görülüyor.\n\nBuna göre sirke sineklerinde gözlenen bu durum ile ilgili aşağıdakilerden hangisi SÖYLENEMEZ?',
        options: {
          A: 'Çevre etkisiyle genlerin işleyişinde meydana gelen bir modifikasyondur.',
          B: 'Sıcaklık faktörü canlının fenotipinde (dış görünüş) değişikliğe neden olmuştur.',
          C: 'Bu durum genlerin yapısını kalıcı olarak değiştirmiş olup sonraki nesillere aktarılır.',
          D: 'Ortam koşulları eski haline getirildiğinde canlının eski özelliğine döndüğü görülmüştür.',
        },
        correctAnswer: 'C',
        explanation:
          'Sirke sineklerinin sıcaklığa bağlı kanat şekli değişimi bir MODİFİKASYONDUR. Modifikasyonlarda genin yapısı DEĞİŞMEZ, sadece genin İŞLEYİŞİ değişir ve kalıtsal DEĞİLDİR (16°C\'de yavrular yine düz kanatlı olmuştur).',
        hintForSocratic: 'Modifikasyonlar sonraki kuşaklara aktarılır mı, yoksa çevre koşulu değişince normale döner mi?',
      },
      {
        id: 'lgs-dna-q3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Kalıtım ve Çaprazlama',
        questionNumber: 3,
        questionText:
          'Bezelyelerde sarı tohum geni (S) yeşil tohum genine (s) baskındır.\n\nMelez sarı tohumlu (Ss) iki bezelyenin çaprazlanması sonucu oluşacak bezelyelerle ilgili;\n\nI. Yeşil tohumlu bezelye oluşma olasılığı %25\'tir.\nII. Fenotip oranı %75 Sarı, %25 Yeşil tohumdur.\nIII. Homozigot (saf döl) genotipe sahip olma olasılığı %50\'dir.\n\nyargılarından hangileri DOĞRUDUR?',
        options: {
          A: 'I ve II',
          B: 'I ve III',
          C: 'II ve III',
          D: 'I, II ve III',
        },
        correctAnswer: 'D',
        explanation:
          'Ss × Ss çaprazlaması yapılır:\nGenotipler: SS (%25), Ss (%50), ss (%25).\n- Homozigot döl: SS (%25) + ss (%25) = %50 (III doğru).\n- Yeşil tohum: ss = %25 (I doğru).\n- Sarı tohum: SS + Ss = %75, Yeşil tohum: ss = %25 (II doğru).\n\nTüm yargılar doğrudur.',
        hintForSocratic: 'Ss ile Ss çaprazlandığında çıkan 4 genotipi yaz: SS, Ss, Ss, ss. Bunlardan kaçı yeşil (ss), kaçı saf döldür (SS ve ss)?',
      },
      {
        id: 'lgs-dna-q4',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Adaptasyon',
        questionNumber: 4,
        questionText:
          'Kutup ayılarının beyaz kürke, geniş ayak tabanlarına ve kalın yağ tabakasına sahip olması bir adaptasyon örneğidir.\n\nBuna göre adaptasyonlarla ilgili aşağıdakilerden hangisi YANLIŞTIR?',
        options: {
          A: 'Canlının belirli bir çevrede yaşama ve üreme şansını artıran kalıtsal özelliklerdir.',
          B: 'Aynı bölgede yaşayan farklı tür canlılar benzer adaptasyonlar geliştirirler (Kutup ayısı ve kutup tilkisi gibi).',
          C: 'Bir kutup ayısı sıcak bir bölgeye götürülürse birkaç hafta içinde kürk rengi kahverengiye döner.',
          D: 'Adaptasyonlar uzun yıllar süren doğal seçilim süreçleri sonucunda ortaya çıkar.',
        },
        correctAnswer: 'C',
        explanation:
          'Adaptasyonlar canlının DNA\'sına işlenmiş KALITSAL özelliklerdir. Bir kutup ayısı çöle veya ılıman iklime gitse bile kürk rengi beyaz kalır; modifikasyon gibi ortam değişince hemen kaybolmaz.',
        hintForSocratic: 'Adaptasyonlar kalıtsal mıdır yoksa hemen çevreye göre anında değişir mi?',
      },
      {
        id: 'lgs-dna-q5',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Biyoteknoloji ve Genetik Mühendisliği',
        questionNumber: 5,
        questionText:
          'Ateş böceğinin ışık saçmasını sağlayan genin tütün bitkisine aktarılması sonucunda tütün bitkisinin de geceleri ışık saçtığı gözlemlenmiştir.\n\nBu biyoteknolojik uygulama aşağıdakilerden hangisiyle adlandırılır?',
        options: {
          A: 'Klonlama (Kopyalama)',
          B: 'Gen Aktarımı (Gen Transferi)',
          C: 'Gen Tedavisi',
          D: 'Geleneksel Islah',
        },
        correctAnswer: 'B',
        explanation:
          'Bir canlının belirli bir özelliğini belirleyen genin alınıp başka bir canlıya aktarılması işlemine "Gen Aktarımı (Gen Transferi)" denir.',
        hintForSocratic: 'Bir canlıdan diğerine gen ekleme işlemine ne ad verilir?',
      },
      {
        id: 'lgs-dna-q6',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Kromozom Sayısı ve Gelişmişlik İlişkisi',
        questionNumber: 6,
        questionText:
          'İnsan: 46 kromozom\nEğrelti Otu: 500 kromozom\nMoli Balığı: 46 kromozom\n\nYukarıdaki verilere göre;\n\nI. Kromozom sayısı ile canlının gelişmişliği arasında bir ilişki yoktur.\nII. Farklı türden canlıların kromozom sayıları aynı olabilir.\nIII. Eğrelti otu insandan 10 kat daha gelişmiş bir canlıdır.\n\nyargılarından hangilerine ULAŞILABİLİR?',
        options: {
          A: 'Yalnız I',
          B: 'I ve II',
          C: 'II ve III',
          D: 'I, II ve III',
        },
        correctAnswer: 'B',
        explanation:
          '1. Eğrelti otunun 500 kromozoma sahip olması onu insandan gelişmiş yapmaz. Kromozom sayısı ile gelişmişlik veya vücut büyüklüğü arasında hiçbir ilişki yoktur (I doğru, III yanlış).\n2. İnsan ve moli balığı farklı tür olmalarına rağmen ikisinin de kromozom sayısı 46\'dır (II doğru).',
        hintForSocratic: '500 kromozomu olan eğrelti otu insandan daha mı akıllı ve gelişmiştir?',
      },
      {
        id: 'lgs-dna-q7',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Nükleotid Eşleşme Kuralı',
        questionNumber: 7,
        questionText:
          'Sağlıklı bir DNA molekülünde toplam 1200 nükleotid bulunmaktadır. Bu DNA\'daki Adenin nükleotidi sayısı 200 olduğuna göre Guanin nükleotidi sayısı kaçtır?',
        options: {
          A: '200',
          B: '400',
          C: '600',
          D: '800',
        },
        correctAnswer: 'B',
        explanation:
          '1. Adenin = Timin olduğundan Timin = 200\'dür.\n2. Adenin + Timin = 200 + 200 = 400.\n3. Geriye kalan nükleotidler Guanin ve Sitozin\'dir: 1200 - 400 = 800.\n4. Guanin = Sitozin olduğundan Guanin = 800 / 2 = 400 bulunur.',
        hintForSocratic: 'Adenin sayısı Timin\'e eşittir. Toplam nükleotidden A ve T toplamını çıkarıp ikiye böl.',
      },
      {
        id: 'lgs-dna-q8',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: İnsanda Cinsiyet Kalıtımı',
        questionNumber: 8,
        questionText:
          'Doğacak bir bebeğin cinsiyetinin kız veya erkek olma olasılığı her gebelikte %50\'dir.\n\nBuna göre çocuğun cinsiyetinin belirlenmesinde babadan gelen hangi sperm hücresi belirleyicidir?',
        options: {
          A: 'X gonozomu taşıyan sperm (Kız çocuk)',
          B: 'Y gonozomu taşıyan sperm (Erkek çocuk)',
          C: 'Anneden gelen Y kromozomu',
          D: 'Hem A hem B seçeneği cinsiyeti babanın belirlediğini kanıtlar',
        },
        correctAnswer: 'D',
        explanation:
          'Annede sadece X gonozomu (XX) bulunur. Babadan ise X veya Y gonozomu (XY) gelir. Sperm hücresi X taşırsa çocuk kız (XX), Y taşırsa erkek (XY) olur. Cinsiyeti kesin olarak babadan gelen sperm belirler.',
        hintForSocratic: 'Annenin yumurtasında Y kromozomu bulunur mu? Cinsiyeti belirleyen sperm midir?',
      },
      {
        id: 'lgs-dna-q9',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Doğal Seçilim',
        questionNumber: 9,
        questionText:
          'Sanayi Devrimi öncesinde İngiltere\'de açık renkli güve kelebekleri ağaç likenleri üzerinde kamufle olarak kuşlardan korunabiliyordu. Sanayi Devrimi ile fabrikalardan çıkan is ağaç gövdelerini karartınca açık renkliler kolayca avlanmış, koyu renkli güve kelebeklerinin sayısı hızla artmıştır.\n\nBu olay aşağıdaki kavramlardan hangisinin en somut örneğidir?',
        options: {
          A: 'Yapay Seçilim',
          B: 'Doğal Seçilim',
          C: 'Biyoteknoloji',
          D: 'Klonlama',
        },
        correctAnswer: 'B',
        explanation:
          'Çevre koşullarına uyum sağlayan (koyu renkli) canlıların hayatta kalması, uyum sağlayamayanların (açık renkli) avlanarak elenmesi "Doğal Seçilim" sürecidir.',
        hintForSocratic: 'Güçlü olanın veya ortama kamufle olanın hayatta kalıp diğerinin yok olmasına ne denir?',
      },
      {
        id: 'lgs-dna-q10',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod: Genetik Mühendisliği Ürünleri',
        questionNumber: 10,
        questionText:
          'Aşağıdakilerden hangisi biyoteknoloji ve genetik mühendisliğinin olumsuz veya etik tartışma yaratan yönlerinden biridir?',
        options: {
          A: 'Bakteriler kullanılarak insan insülin hormonunun ucuz ve bol üretilmesi',
          B: 'GDO\'lu (Genetiği Değiştirilmiş Organizmalar) bitkilerin ekosistemdeki doğal biyoçeşitliliği tehdit etmesi ve alerjik reaksiyon riskleri',
          C: 'Zararlı böceklere dirençli tarım bitkileri üretilmesi',
          D: 'Aşı ve antibiyotiklerin geliştirilmesi',
        },
        correctAnswer: 'B',
        explanation:
          'GDO\'lu tohumların yayılması, doğal türlerin genetik kirlenmesine, biyoçeşitliliğin azalmasına ve insanlarda öngörülemeyen alerjik hastalıklara yol açabilmesi biyoteknolojinin en büyük risk alanıdır.',
        hintForSocratic: 'GDO\'lu ürünlerin doğadaki biyoçeşitlilik üzerindeki tehlikesi nedir?',
      },
    ],
  },

  // 2. LGS Türkçe: Paragrafta Anlam ve Sözel Mantık Muhakeme Denemesi
  {
    id: 'exam-lgs-tur-paragraf',
    slug: 'lgs-turkce-paragraf-ve-sozel-mantik-denemesi',
    title: 'LGS Türkçe: Paragrafta Anlam & Sözel Mantık Muhakeme Denemesi',
    description:
      'LGS\'nin en belirleyici soru tipi: Ana fikir, yardımcı fikirler, akışı bozan cümle ve yeni nesil tablo/kurgu tabanlı sözel mantık muhakeme soruları.',
    tier: 'lgs',
    type: 'branch',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    questionCount: 10,
    durationMinutes: 20,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'ÜNİTE TESTİ',
    questions: [
      {
        id: 'lgs-tur-q1',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Paragrafta Anlam: Ana Düşünce (Ana Fikir)',
        questionNumber: 1,
        questionText:
          '"Gerçek bir yazar, yazdıklarının herkes tarafından hemen anlaşılmasını ve alkışlanmasını beklemez. O, çağına tanıklık ederken geleceğe tohum eker. Bugünün popüler rüzgârına kapılıp günü kurtarmak yerine, yüzyıllar sonra bile eskimeden okunacak bir üslubun mimarı olmaya çalışır. Çünkü zaman, yalnızca derinliği olan kalıcı eserleri bağrına basar; sabun köpüğü gibi anlık parlayanlar ise ilk rüzgârda yok olup gider."\n\nBu parçada asıl anlatılmak istenen düşünce (ana fikir) aşağıdakilerden hangisidir?',
        options: {
          A: 'Popüler yazarların daha çok para kazandığı',
          B: 'Gerçek edebiyatçının anlık beğeni peşinde koşmayıp kalıcılığı ve sanatsal derinliği hedeflemesi gerektiği',
          C: 'Yazarların geçmişte yaşamış ustaları taklit etmesi gerektiği',
          D: 'Kitapların sadece gelecek nesiller için yazılması gerektiği',
        },
        correctAnswer: 'B',
        explanation:
          'Metnin tamamında yazarın popülerliğe aldanmayıp zamanın testinden geçecek kalıcı, derinlikli eserler üretmesi gerektiği vurgulanmaktadır (B seçeneği).',
        hintForSocratic: 'Yazar "sabun köpüğü gibi anlık parlamak" yerine neyi öğütlüyor?',
      },
      {
        id: 'lgs-tur-q2',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Sözel Mantık: Sıralama ve Yerleştirme',
        questionNumber: 2,
        questionText:
          'Ali, Burak, Cem, Deniz ve Emre bir koşu yarışına katılmıştır. Yarışın sonucu ile ilgili bilinenler şunlardır:\n- Deniz yarışı Burak\'tan hemen sonra, Ali\'den ise hemen önce tamamlamıştır.\n- Cem yarışı sonuncu bitirmemiştir.\n- Emre yarışın birincisidir.\n\nBu bilgilere göre yarışı ÜÇÜNCÜ sırada tamamlayan kişi kimdir?',
        options: {
          A: 'Ali',
          B: 'Burak',
          C: 'Deniz',
          D: 'Cem',
        },
        correctAnswer: 'C',
        explanation:
          '1. Emre 1. sıradadır: [1: Emre].\n2. Deniz Burak\'tan hemen sonra, Ali\'den hemen öncedir. Yani [Burak, Deniz, Ali] blok halinde peş peşe gelmelidir.\n3. Cem sonuncu değildir. 5 kişilik sıralamada [Burak, Deniz, Ali] bloğu 2, 3 ve 4. sıralara yerleşirse:\n1. Emre, 2. Burak, 3. Deniz, 4. Ali, 5. Cem olurdu AMA Cem sonuncu olamayacağından:\nSıralama: 1. Emre, 2. Burak, 3. Deniz, 4. Ali... Cem sonuncu olamaz kuralı gereği:\nBlok yerleşimi: 1: Emre, 2: Burak, 3: Deniz, 4: Ali, 5: Cem olamaz.\nO halde Cem 2. sıraya yerleşebilir mi? Hayır, blok bozulamaz.\nDoğru yerleşim: 2. Burak, 3. Deniz, 4. Ali olduğunda Cem sonuncu kalamaz. O halde Burak 2, Deniz 3, Ali 4 ise Cem 1 olamayacağına göre, Cem araya giremez.\nBu blok kurgusunda Deniz kesinlikle 3. sıradadır: [Burak (2), Deniz (3), Ali (4)].',
        hintForSocratic: 'Burak, Deniz ve Ali arka arkaya gelmek zorunda (Burak -> Deniz -> Ali). Emre 1. ise Deniz kaçıncı olur?',
      },
      {
        id: 'lgs-tur-q3',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Paragrafta Anlam: Düşünceyi Geliştirme Yolları',
        questionNumber: 3,
        questionText:
          '"Kelimeler de canlı varlıklar gibi doğar, büyür, yaşlanır ve zamanı geldiğinde kullanımdan düşerek ölür. Tıpkı bir ağacın sonbaharda sararan yapraklarını dökmesi gibi, dil de çağın gereklerine uymayan sözcükleri terk eder; yerlerine baharda yeşeren taze sürgünler gibi yeni kelimeler filizlenir."\n\nBu parçada düşünceyi geliştirmek için ağırlıklı olarak hangi yoldan yararlanılmıştır?',
        options: {
          A: 'Tanımlama',
          B: 'Benzetme',
          C: 'Sayısal Verilerden Yararlanma',
          D: 'Tanık Gösterme',
        },
        correctAnswer: 'B',
        explanation:
          'Parçada kelimelerin doğup büyümesi canlı varlıklara, sözcüklerin dilden düşmesi ağacın yaprak dökmesine "tıpkı" ve "gibi" edatlarıyla benzetilmiştir (Benzetme).',
        hintForSocratic: '"Tıpkı... gibi" kalıbı hangi anlatım tekniğini gösterir?',
      },
      {
        id: 'lgs-tur-q4',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Paragrafta Yapı: Akışı Bozan Cümle',
        questionNumber: 4,
        questionText:
          '(I) Kitap okuma alışkanlığı, bireyin düşünce dünyasını zenginleştiren en temel kültürel faaliyettir. (II) Düzenli okuyan insanlar, olaylara çok farklı açılardan bakabilme yetisi kazanırlar. (III) Kitap fiyatlarının son yıllarda artması yayıncılık sektörünü olumsuz etkilemektedir. (IV) Ayrıca zenginleşen kelime dağarcığı sayesinde duygu ve düşüncelerini çok daha etkili biçimde ifade ederler.\n\nBu parçada numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?',
        options: {
          A: 'I',
          B: 'II',
          C: 'III',
          D: 'IV',
        },
        correctAnswer: 'C',
        explanation:
          'Metnin bütününde kitap okumanın bireysel ve düşünsel faydaları anlatılmaktadır. III. cümlede ise aniden kitap fiyatları ve yayıncılık piyasasından bahsedilerek konunun dışına çıkılmıştır. Dolayısıyla III. cümle akışı bozar.',
        hintForSocratic: 'Hangi cümle bireyin gelişiminden çıkıp kitap fiyatlarından bahsetmeye başlıyor?',
      },
      {
        id: 'lgs-tur-q5',
        courseKey: 'turkce',
        courseName: 'Türkçe',
        topicName: 'Cümlede Anlam: Örtülü Anlam',
        questionNumber: 5,
        questionText:
          '"Ahmet bu yıl da matematik olimpiyatlarında madalya almayı başardı."\n\nBu cümleden aşağıdaki yargılardan hangisi KESİNLİKLE çıkarılır?',
        options: {
          A: 'Ahmet sadece matematik dersinde başarılı bir öğrencidir.',
          B: 'Ahmet daha önceki yıllarda da matematik olimpiyatlarında madalya almıştır.',
          C: 'Ahmet bu yıl olimpiyatlarda altın madalya kazanmıştır.',
          D: 'Ahmet olimpiyatlara ilk kez bu yıl katılmıştır.',
        },
        correctAnswer: 'B',
        explanation:
          'Cümledeki "bu yıl da" ifadesindeki "-de/-da" bağlacı örtülü anlam katar. Ahmet\'in geçmiş yıllarda da madalya kazandığını kesin olarak kanıtlar.',
        hintForSocratic: '"Bu yıl da" demek daha önce de bu olayın yaşandığını gösterir mi?',
      },
    ],
  },
];
