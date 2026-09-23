import type { OnlineExam } from '@/types/online-exam';

export const LISE1_UNIT_TESTS: OnlineExam[] = [
  // 1. MEB 9. Sınıf Tarih 1. Dönem 1. Ortak Yazılı Sınavı Provası
  {
    id: 'exam-lise1-tar-yazili-1',
    slug: 'meb-9-tarih-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Tarih 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description:
      'MEB Ortak Yazılı senaryolarına tam uyumlu: Tarih biliminin yöntemi, 5T kuralı, zamanın taksimi, takvimler ve İlk Türk Devletleri ünitelerinden oluşan 100 puanlık prova yazılı.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'tarih',
    courseName: 'Tarih (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB ORTAK YAZILI',
    questions: [
      {
        id: 'l1-tar-q1',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'Tarih ve Zaman: Tarihin Yöntemi ve 5T Kuralı',
        questionNumber: 1,
        questionText:
          'Bir tarih araştırmacısı, Orta Asya Türk tarihi ile ilgili bulduğu Çin yıllıklarını ve Orhun Yazıtları metinlerini tercüme ettikten sonra, bu belgelerin orijinalliğini, yazarının tarafsızlığını ve bilgilerin doğruluğunu diğer kaynaklarla karşılaştırarak sınamaktadır.\n\nBuna göre araştırmacı, tarihin araştırma yöntemindeki hangi basamağı icra etmektedir?',
        options: {
          A: 'Tarama (Kaynak Arama)',
          B: 'Tasnif (Sınıflandırma)',
          C: 'Tahlil (Çözümleme)',
          D: 'Tenkit (Eleştiri)',
          E: 'Terkip (Sentez)',
        },
        correctAnswer: 'D',
        explanation:
          '1. Tarihin 5T araştırma basamakları:\n- Tarama: Kaynak bulma\n- Tasnif: Konu, zaman ve mekana göre ayırma\n- Tahlil: Bilgilerin yeterliliğini ölçme\n- Tenkit: Belgelerin orijinalliğini (Dış Tenkit) ve bilginin doğruluğunu/tarafsızlığını (İç Tenkit) denetleme\n- Terkip: Bilgileri birleştirip esere dönüştürme.\n\nAraştırmacı bilginin doğruluğunu ve tarafsızlığını denetlediği için TENKİT aşamasındadır.',
        hintForSocratic: 'Belgelerin güvenilirliğini ve yazarın tarafsızlığını sorgulama aşaması 5T kuralının hangi harfidir?',
      },
      {
        id: 'l1-tar-q2',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'Tarih ve Zaman: Türklerin Kullandığı Takvimler',
        questionNumber: 2,
        questionText:
          'Türklerin tarih boyunca kullandığı takvimlerle ilgili;\n\nI. 12 Hayvanlı Türk Takvimi - Güneş yılı esaslıdır ve Türklerin milli takvimidir.\nII. Hicri Takvim - Ay yılı esaslıdır ve Hz. Muhammed\'in hicretini başlangıç kabul eder.\nIII. Celali Takvim - Büyük Selçuklu döneminde Ömer Hayyam tarafından sadece dini bayramları belirlemek için hazırlanmıştır.\n\nyargılarından hangileri DOĞRUDUR?',
        options: {
          A: 'Yalnız I',
          B: 'Yalnız II',
          C: 'I ve II',
          D: 'II ve III',
          E: 'I, II ve III',
        },
        correctAnswer: 'C',
        explanation:
          '1. Madde I doğrudur: 12 Hayvanlı Türk Takvimi Güneş yılı esaslıdır ve her yıla bir hayvan adı verilir.\n2. Madde II doğrudur: Hicri takvim Ay yılı esaslıdır (354 gün) ve hicreti (622) başlangıç alır.\n3. Madde III yanlıştır: Celali Takvim Büyük Selçuklu Sultanı Melikşah adına Ömer Hayyam tarafından hazırlanmıştır ancak dini değil MALİ ve EKONOMİK işleri düzenlemek için Güneş yılı esaslı yapılmıştır.\n\nDolayısıyla I ve II doğrudur.',
        hintForSocratic: 'Celali takvim tarım vergilerini ve mali yılı düzenlemek için mi yoksa dini günler için mi hazırlandı?',
      },
      {
        id: 'l1-tar-q3',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk Türk Devletleri: Asya Hun Devleti ve Onlu Sistem',
        questionNumber: 3,
        questionText:
          'Mete Han\'ın MÖ 209 yılında tahta çıkışı, günümüzde Türk Kara Kuvvetleri\'nin kuruluş tarihi olarak kabul edilmektedir.\n\nMete Han\'ın dünya askeri tarihine kazandırdığı ve modern orduların da temelini oluşturan en önemli askeri teşkilatlanma yeniliği aşağıdakilerden hangisidir?',
        options: {
          A: 'İkili teşkilat sistemi',
          B: 'Onlu ordu sistemi',
          C: 'Turan (Kurt Kapanı) taktiği',
          D: 'Kurultay meclisi',
          E: 'Kut inancı',
        },
        correctAnswer: 'B',
        explanation:
          'Mete Han Türk ordusunu onbaşı, yüzbaşı, binbaşı ve tümenbaşı (10.000) şeklinde hiyerarşik onlu sisteme bölmüştür. Bu sistem dünya askeri tarihinin ilk düzenli ve disiplinli ordu yapısıdır.',
        hintForSocratic: 'Onbaşı, yüzbaşı, binbaşı şeklindeki askeri yapılanmaya ne ad verilir?',
      },
      {
        id: 'l1-tar-q4',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk Türk Devletleri: Uygurların Yerleşik Hayata Geçişi',
        questionNumber: 4,
        questionText:
          'Uygurlar, Bögü Kağan döneminde Maniheizm dinini kabul etmişlerdir. Bu dini benimsemeleri Uygurların yaşam tarzında köklü değişimlere yol açmıştır.\n\nAşağıdakilerden hangisi Maniheizm dininin Uygurlar üzerindeki doğrudan bir sonucu DEĞİLDİR?',
        options: {
          A: 'Kalıcı şehirler ve tapınaklar inşa ederek yerleşik hayata geçmeleri',
          B: 'Et yemeyi yasakladığı için savaşçı özelliklerinin zayıflaması',
          C: 'Tarım ve sulama kanalları yaparak üretici konuma gelmeleri',
          D: 'Kut anlayışını terk ederek cumhuriyet idaresine geçmeleri',
          E: 'Matbaayı ve hareketli harf sistemini kullanarak kitap basmaları',
        },
        correctAnswer: 'D',
        explanation:
          'Uygurlar Maniheizm ile yerleşik hayata geçmiş, şehir (balık) ve tapınak kurmuş, tarım yapmış ve matbaayı kullanmıştır. Ancak devlet yönetimindeki kut anlayışı ve kağanlık saltanat sistemi devam etmiştir; cumhuriyet söz konusu değildir.',
        hintForSocratic: 'Eski Türk devletlerinde yönetim saltanat ve kut anlayışına dayanırdı. Uygurlarda rejim değişti mi?',
      },
      {
        id: 'l1-tar-q5',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk Türk Devletleri: Orhun Yazıtları',
        questionNumber: 5,
        questionText:
          'II. Kök Türk (Kutluk) Devleti döneminde dikilen Orhun Yazıtları ile ilgili aşağıdaki bilgilerden hangisi YANLIŞTIR?',
        options: {
          A: 'Türk tarihinin ve Türk edebiyatının bilinen ilk yazılı belgeleridir.',
          B: 'Bilge Kağan, Kül Tigin ve Vezir Tonyukuk adına dikilmiştir.',
          C: 'Yazıtlarda kağanın millete hesap vermesi, Türk devlet anlayışında sosyal devlet ilkesinin varlığını kanıtlar.',
          D: 'Danimarkalı dilbilimci Vilhelm Thomsen tarafından çözülmüştür.',
          E: 'Yazıtların tamamı Arap alfabesi ve Farsça kelimelerle yazılmıştır.',
        },
        correctAnswer: 'E',
        explanation:
          'Orhun Yazıtları 38 harfli milli Kök Türk alfabesi ile ve son derece arı/öz Türkçe ile yazılmıştır. Arap alfabesi veya Farsça söz konusu değildir.',
        hintForSocratic: 'Orhun Yazıtları hangi milli alfabe ile yazılmıştır?',
      },
      {
        id: 'l1-tar-q6',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk ve Orta Çağlarda Türk Dünyası: Kut İnancı ve İkili Teşkilat',
        questionNumber: 6,
        questionText:
          'Eski Türklerde ülkeyi yönetme yetkisinin Gök Tengri tarafından kağana verildiğine inanılan "Kut" anlayışının Türk devletleri üzerindeki en belirgin olumsuz sonucu aşağıdakilerden hangisidir?',
        options: {
          A: 'Halkın kağana olan itaat duygusunun tamamen yok olması',
          B: 'Kutun kan yoluyla hanedanın tüm erkek üyelerine geçmesi sebebiyle sık sık taht kavgalarının yaşanması ve devletlerin bölünmesi',
          C: 'Dış ticaretin tamamen durması',
          D: 'Orduda onlu teşkilatın bozulması',
          E: 'Göçebe hayat tarzının sona ermesi',
        },
        correctAnswer: 'B',
        explanation:
          'Kut kan bağıyla hanedanın bütün erkek üyelerine geçtiği için her şehzade tahtta hak iddia etmiş, bu durum amansız iç savaşlara ve Türk devletlerinin kısa sürede ikiye bölünerek yıkılmasına yol açmıştır.',
        hintForSocratic: 'Kağan öldüğünde oğulları ve kardeşleri neden taht kavgasına tutuşurdu?',
      },
      {
        id: 'l1-tar-q7',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'Tarih ve Zaman: Birinci ve İkinci Elden Kaynaklar',
        questionNumber: 7,
        questionText:
          'Aşağıdakilerden hangisi bir tarih araştırmasında "Birinci Elden (Ana) Kaynak" olarak değerlendirilemez?',
        options: {
          A: 'Fatih Sultan Mehmet\'in bizzat tuğrasını taşıyan fetih fermanı',
          B: 'Kadeş Barış Antlaşması\'nın orijinal kil tableti',
          C: 'Göktürk dönemine ait Kül Tigin Yazıtı',
          D: '2024 yılında bir tarih profesörünün yazdığı Selçuklu Tarihi kitabı',
          E: 'İstiklal Harbi sırasında Atatürk\'ün imzaladığı emir belgesi',
        },
        correctAnswer: 'D',
        explanation:
          'Birinci elden kaynaklar olayın geçtiği döneme ait orijinal belgelerdir (ferman, tablet, kitabe, para). Olaydan yüzyıllar sonra bu belgelere bakılarak yazılan araştırma kitapları ise "İkinci Elden Kaynak"tır.',
        hintForSocratic: '2024 yılında yazılan bir inceleme kitabı olayın bizzat yaşandığı döneme ait midir?',
      },
      {
        id: 'l1-tar-q8',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk Çağ Medeniyetleri: Mezopotamya ve Hukuk',
        questionNumber: 8,
        questionText:
          'Tarihte bilinen ilk yazılı kanunları yapan Sümer Kralı Urugakina\'dan sonra, "Göze göz, dişe diş" esasına dayanan sert kısas kanunları hazırlayarak merkezi otoriteyi güçlendiren Babil kralı kimdir?',
        options: {
          A: 'Hammurabi',
          B: 'Sargon',
          C: 'Asurbanipal',
          D: 'Büyük İskender',
          E: 'Kiros',
        },
        correctAnswer: 'A',
        explanation:
          'Babil Kralı Hammurabi, tarihin en ünlü ve sert kısas kanunlarını (Hammurabi Kanunları) hazırlamış ve güneş tanrısı Şamaş\'tan aldığı kanunları dikilitaşlara kazıtmıştır.',
        hintForSocratic: 'Kısas kurallarıyla meşhur Babil kralı kimdir?',
      },
      {
        id: 'l1-tar-q9',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'İlk Türk Devletleri: Kurultay (Toy) Meclisi',
        questionNumber: 9,
        questionText:
          'İlk Türk devletlerinde devlet işlerinin görüşülüp karara bağlandığı meclise "Kurultay" (Toy/Kengeş) adı verilirdi.\n\nKurultay ile ilgili;\nI. Hakanın eşi olan Hatun da kurultaya katılıp elçileri kabul edebilirdi.\nII. Boy beyleri ve devlet ileri gelenleri kurultayın doğal üyesiydi.\nIII. Kağan kurultayın kararlarına her zaman uymak zorundaydı, meclis kağanın üzerindeydi.\n\nbilgilerinden hangileri DOĞRUDUR?',
        options: {
          A: 'Yalnız I',
          B: 'Yalnız II',
          C: 'I ve II',
          D: 'II ve III',
          E: 'I, II ve III',
        },
        correctAnswer: 'C',
        explanation:
          'Kurultayda Hatun da yer alır (kadının siyasetteki önemi) ve boy beyleri katılır. Ancak kurultay genellikle bir DANIŞMA organıdır; son söz kağana aittir. Kağanın üzerinde bir meclis hakimiyeti kural değildir.',
        hintForSocratic: 'Eski Türklerde kurultay kağanın emir kulu mudur yoksa son karar hakanın mıdır?',
      },
      {
        id: 'l1-tar-q10',
        courseKey: 'tarih',
        courseName: 'Tarih',
        topicName: 'Tarih ve Zaman: Tarihin Tanımı ve Özellikleri',
        questionNumber: 10,
        questionText:
          'Tarih biliminin fen bilimlerinden (Fizik, Kimya vb.) en temel farkı aşağıdakilerden hangisidir?',
        options: {
          A: 'Tarih olaylarının neden-sonuç bağı içermemesi',
          B: 'Tarihte deney ve gözlem yapılamaması, olayların aynen tekrarlanamaması',
          C: 'Tarihin belgelere dayanmaması',
          D: 'Tarih araştırmalarında tarafsız olmanın imkansız olması',
          E: 'Tarihin sadece savaşları konu alması',
        },
        correctAnswer: 'B',
        explanation:
          'Tarihi olaylar geçmişte yaşanmış, bitmiştir ve tektir. Laboratuvarda Malazgirt Savaşı veya Fransız İhtilali deneyi yapılamaz, bu sebeple deney ve gözlem uygulanamaz.',
        hintForSocratic: 'Geçmişte yaşanmış bir savaşı laboratuvar ortamında tekrar canlandırıp deney yapabilir misin?',
      },
    ],
  },

  // 2. MEB 9. Sınıf Coğrafya 1. Dönem 1. Ortak Yazılı Sınavı Provası
  {
    id: 'exam-lise1-cog-yazili-1',
    slug: 'meb-9-cografya-1-donem-1-yazili',
    title: 'MEB 9. Sınıf Coğrafya 1. Dönem 1. Ortak Yazılı Sınavı Provası',
    description:
      'MEB Ortak Yazılı senaryolarına tam uyumlu: Doğa ve insan etkileşimi, Dünya\'nın şekli ve hareketleri, eksen eğikliği ve harita bilgisi ünitelerinden oluşan 100 puanlık prova yazılı.',
    tier: 'lise1',
    type: 'yazili',
    courseKey: 'cografya',
    courseName: 'Coğrafya (9. Sınıf)',
    questionCount: 10,
    durationMinutes: 40,
    difficulty: 'MEB Yazılı Düzeyi',
    isPro: false,
    badgeText: 'MEB ORTAK YAZILI',
    questions: [
      {
        id: 'l1-cog-q1',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Doğa ve İnsan Etkileşimi: Coğrafyanın İlkeleri',
        questionNumber: 1,
        questionText:
          '"Türkiye\'de çay tarımı en fazla Doğu Karadeniz Bölümü\'nde, özellikle Rize ve çevresindeki dik yamaçlarda yapılmaktadır."\n\nBu cümlede coğrafya biliminin diğer bilim dallarından ayrılan en temel ve ayırt edici ilkesi hangisidir?',
        options: {
          A: 'Nedensellik (Sebep-Sonuç) İlkesi',
          B: 'Dağılış İlkesi',
          C: 'Karşılıklı İlgi (Bağlantı) İlkesi',
          D: 'Tarihsellik İlkesi',
          E: 'Gözlem İlkesi',
        },
        correctAnswer: 'B',
        explanation:
          'Coğrafyayı diğer bilimlerden ayıran en özgün ilke DAĞILIŞ ilkesidir. Olayın yeryüzünün neresinde gerçekleştiğini, harita üzerinde konumlandırarak açıklar.',
        hintForSocratic: '"Nerede görülür?" sorusuna yanıt verip haritada yer gösteren coğrafi ilke hangisidir?',
      },
      {
        id: 'l1-cog-q2',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Dünya\'nın Şekli: Geoit Şeklin Sonuçları',
        questionNumber: 2,
        questionText:
          'Dünya, kutuplardan basık Ekvator\'dan şişkin kendine has "Geoit" bir şekle sahiptir.\n\nAşağıdakilerden hangisi Dünya\'nın geoit şeklinin doğrudan bir sonucudur?',
        options: {
          A: 'Gece ve gündüzün birbirini takip etmesi',
          B: 'Mevsimlerin oluşması',
          C: 'Yerçekimi kuvvetinin kutuplarda Ekvator\'a göre daha fazla olması',
          D: 'Güneş ışınlarının geliş açısının gün içinde değişmesi',
          E: 'Muson rüzgârlarının yön değiştirmesi',
        },
        correctAnswer: 'C',
        explanation:
          'Dünya kutuplardan basık olduğu için kutup noktaları yerin merkezine (çekirdeğe) Ekvator\'dan 21 km daha yakındır. Bu nedenle kutuplarda yerçekimi Ekvator\'dan daha fazladır. Bu durum yalnızca GEOİT şeklin sonucudur.',
        hintForSocratic: 'Yerin merkezine daha yakın olan yerde yerçekimi nasıl değişir?',
      },
      {
        id: 'l1-cog-q3',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Dünya\'nın Hareketleri: Eksen Eğikliği ve Özel Tarihler',
        questionNumber: 3,
        questionText:
          '21 Haziran tarihinde Dünya üzerinde yaşanan durumlarla ilgili aşağıdakilerden hangisi DOĞRUDUR?',
        options: {
          A: 'Güneş ışınları Oğlak Dönencesi\'ne dik açıyla düşer.',
          B: 'Kuzey Yarım Küre\'de en uzun gündüz, en kısa gece yaşanır.',
          C: 'Tüm Dünya\'da gece ve gündüz süreleri eşit (12 saat) olur.',
          D: 'Güney Yarım Küre\'de yaz mevsimi başlar.',
          E: 'Kuzey Kutup Noktası\'nda 6 ay sürecek gece dönemi başlar.',
        },
        correctAnswer: 'B',
        explanation:
          '21 Haziran\'da güneş ışınları Kuzey Yarım Küre\'deki Yengeç Dönencesi\'ne (23° 27\' K) dik düşer. Kuzey Yarım Küre\'de yaz başlar ve yılın en uzun gündüzü yaşanır.',
        hintForSocratic: '21 Haziran yaz başlangıcı mıdır, kış mı? Kuzey Yarım Küre\'de gündüzler mi uzundur geceler mi?',
      },
      {
        id: 'l1-cog-q4',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Harita Bilgisi: Harita Elemanları ve Ölçek',
        questionNumber: 4,
        questionText:
          '1 / 200.000 ölçekli bir haritada iki şehir arasındaki mesafe cetvelle 5 cm olarak ölçülmüştür.\n\nBu iki şehir arasındaki gerçek kuş uçuşu uzaklık kaç kilometredir?',
        options: {
          A: '1 km',
          B: '5 km',
          C: '10 km',
          D: '20 km',
          E: '100 km',
        },
        correctAnswer: 'C',
        explanation:
          '1. Formül: Gerçek Uzaklık (GU) = Harita Uzaklığı (HU) × Ölçek Paydası (ÖP).\n2. cm\'yi km\'ye çevirmek için 5 sıfır silinir:\n200.000 cm = 2 km.\n3. GU = 5 cm × 2 km/cm = 10 km bulunur.',
        hintForSocratic: 'Ölçek paydasından 5 sıfır silerek km\'ye çevir: 200.000 cm kaç km eder? Sonra harita uzunluğuyla çarp.',
      },
      {
        id: 'l1-cog-q5',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Harita Bilgisi: İzoips (Eş Yükselti Eğrileri)',
        questionNumber: 5,
        questionText:
          'Bir topografya haritasında izoips (eş yükselti) eğrilerinin birbirine çok yaklaştığı (sıklaştığı) bir kıyı kesimi için aşağıdakilerden hangisi KESİNLİKLE söylenebilir?',
        options: {
          A: 'Kıyı derinliği çok azdır ve geniş kumsallar vardır.',
          B: 'Eğim fazladır ve falez (yalıyar) oluşumu yaygındır.',
          C: 'Akarsuyun akış hızı ve aşındırma gücü azalmıştır.',
          D: 'Yükselti deniz seviyesinin altına inmiştir.',
          E: 'Geniş bir delta ovası bulunmaktadır.',
        },
        correctAnswer: 'B',
        explanation:
          'İzoips çizgilerinin birbirine çok yaklaşması o arazide eğimin çok dik olduğunu gösterir. Deniz kıyısında dik eğim falezleri (yalıyar) meydana getirir ve kıta sahanlığı dardır.',
        hintForSocratic: 'İzoipslerin sıklaşması eğimin fazla olduğunu mu az olduğunu mu gösterir? Dik yamaçlı kıyılara ne denir?',
      },
      {
        id: 'l1-cog-q6',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Coğrafi Koordinat Sistemi: Yerel Saat Hesaplamaları',
        questionNumber: 6,
        questionText:
          '30° Doğu meridyeninde yer alan İzmit\'te yerel saat 14.20 iken, 45° Doğu meridyeninde yer alan Iğdır\'da yerel saat kaçtır?',
        options: {
          A: '13.20',
          B: '14.00',
          C: '15.00',
          D: '15.20',
          E: '16.00',
        },
        correctAnswer: 'D',
        explanation:
          '1. Meridyen farkı: 45° - 30° = 15 meridyen.\n2. Zaman farkı: 15 × 4 dakika = 60 dakika (1 saat).\n3. Iğdır daha doğuda olduğu için yerel saati ileridir: 14.20 + 01.00 = 15.20.',
        hintForSocratic: 'İki meridyen arası 4 dakikadır. 15 meridyen kaç dakika eder? Doğuya gidildikçe saat ileri mi alınır geri mi?',
      },
      {
        id: 'l1-cog-q7',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Doğal Sistemler: Muhteşem Dörtlü',
        questionNumber: 7,
        questionText:
          'Coğrafyada doğal ortamı oluşturan dört temel ortam (Muhteşem Dörtlü) arasında aşağıdakilerden hangisi YER ALMAZ?',
        options: {
          A: 'Litosfer (Taş küre)',
          B: 'Atmosfer (Hava küre)',
          C: 'Hidrosfer (Su küre)',
          D: 'Biyosfer (Canlılar küresi)',
          E: 'Termosfer (İletişim küresi)',
        },
        correctAnswer: 'E',
        explanation:
          'Doğal çevrenin 4 temel unsuru: Taş küre (Litosfer), Su küre (Hidrosfer), Hava küre (Atmosfer) ve Canlılar küresi (Biyosfer)\'dir. Termosfer sadece atmosferin bir alt tabakasıdır.',
        hintForSocratic: 'Muhteşem Dörtlü: Taş, Su, Hava ve Canlı küreleridir.',
      },
      {
        id: 'l1-cog-q8',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Dünya\'nın Günlük Hareketi ve Sonuçları',
        questionNumber: 8,
        questionText:
          'Aşağıdakilerden hangisi Dünya\'nın kendi ekseni etrafında dönmesinin (Günlük Hareket) bir sonucudur?',
        options: {
          A: 'Mevsimlerin oluşması',
          B: 'Meltem rüzgârlarının oluşması ve gün içinde yön değiştirmesi',
          C: 'Gece ve gündüz sürelerinin yıl içinde uzayıp kısalması',
          D: 'Güneş ışınlarının bir noktaya düşme açısının yıl boyunca değişmesi',
          E: 'Kutuplarda 6 ay gündüz 6 ay gece yaşanması',
        },
        correctAnswer: 'B',
        explanation:
          'Gün içinde kara ve denizlerin farklı ısınıp soğumasıyla oluşan günlük basınç farkları meltem rüzgârlarını oluşturur. Bu durum Dünya\'nın 24 saatlik günlük eksen hareketinin sonucudur. Diğer şıklar yıllık hareket ve eksen eğikliğiyle ilgilidir.',
        hintForSocratic: 'Gün içinde meydana gelen rüzgârlar (Meltemler) günlük hareket sonucu mudur, yıllık hareket mi?',
      },
      {
        id: 'l1-cog-q9',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Harita Projeksiyonları: Silindirik, Konik ve Düzlem',
        questionNumber: 9,
        questionText:
          'Küre şeklindeki Dünya yüzeyini haritaya aktarırken bozulmaları en aza indirmek için projeksiyon yöntemleri kullanılır.\n\nEkvator ve çevresindeki ülkeleri (Brezilya, Endonezya, Kongo) en az hata ile çizmek isteyen bir kartograf hangi projeksiyon türünü tercih etmelidir?',
        options: {
          A: 'Silindirik Projeksiyon',
          B: 'Konik Projeksiyon',
          C: 'Düzlem Projeksiyon',
          D: 'Parçalı Projeksiyon',
          E: 'İzometrik Projeksiyon',
        },
        correctAnswer: 'A',
        explanation:
          'Silindirik projeksiyon Ekvator ve çevresini en az bozulmayla gösterir. Konik projeksiyon orta kuşak (Türkiye), Düzlem projeksiyon ise kutup bölgeleri için uygundur.',
        hintForSocratic: 'Ekvator için Silindirik, Orta Kuşak için Konik, Kutuplar için Düzlem projeksiyon kullanılır.',
      },
      {
        id: 'l1-cog-q10',
        courseKey: 'cografya',
        courseName: 'Coğrafya',
        topicName: 'Özel Tarihler: Ekinoks (21 Mart & 23 Eylül)',
        questionNumber: 10,
        questionText:
          '21 Mart ve 23 Eylül (Ekinoks) tarihlerinde Dünya genelinde gerçekleşen ortak durum aşağıdakilerden hangisidir?',
        options: {
          A: 'Yalnızca Ekvator üzerinde gece ve gündüz 12 saat olur.',
          B: 'Tüm Dünya\'da gece ve gündüz süreleri birbirine eşit (12 saat) olur.',
          C: 'Kuzey Yarım Küre\'de en uzun gündüz yaşanır.',
          D: 'Güney Kutup Noktası\'nda güneş hiç batmaz.',
          E: 'Güneş ışınları Yengeç Dönencesi\'ne dik açıyla düşer.',
        },
        correctAnswer: 'B',
        explanation:
          'Ekinoks tarihlerinde aydınlanma çemberi kutup noktalarından teğet geçer. Güneş ışınları Ekvator\'a dik düşer ve Dünya\'nın her yerinde gece ile gündüz süresi eşitlenir (12 saat gece, 12 saat gündüz).',
        hintForSocratic: 'Ekinoks kelimesi "gece-gündüz eşitliği" anlamına gelir. Nerede geçerlidir?',
      },
    ],
  },
];
