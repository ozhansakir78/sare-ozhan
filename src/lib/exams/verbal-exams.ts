import type { OnlineExam } from '@/types/online-exam';

export const VERBAL_EXAMS: OnlineExam[] = [
  // 1. MEB Resmi Sözel Bölüm Denemesi
  {
    id: 'exam-meb-sozel-1',
    slug: 'lgs-2027-meb-resmi-sozel-deneme',
    title: '2027 LGS MEB Resmi Sözel Bölüm Denemesi',
    description: 'T.C. İnkılap Tarihi ve Atatürkçülük, Din Kültürü ve Ahlak Bilgisi ile İngilizce derslerinin resmi MEB kazanım sorularından oluşan karma deneme.',
    type: 'branch',
    courseKey: 'inkilap',
    courseName: 'Sözel Bölüm (Karma)',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'Orta',
    isPro: false,
    badgeText: 'MEB RESMİ ÖRNEK',
    questions: [
      {
        id: 'meb-soz-q-1',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Bir Kahraman Doğuyor (Selanik)',
        questionNumber: 1,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nMustafa Kemal\'in çocukluğunun geçtiği Selanik şehri; işlek bir limana sahip, Avrupa ile demir yolu bağlantısı olan ve farklı ulusların bir arada yaşadığı çok kültürlü bir şehirdi.\n\nBu durumun Mustafa Kemal\'e kazandırdığı en önemli özellik aşağıdakilerden hangisidir?',
        options: {
          A: 'Askeri dehasının hemen fark edilmesi',
          B: 'Farklı fikirlere ve kültürlere karşı hoşgörülü ve açık görüşlü olması',
          C: 'Yalnızca Türk milliyetçiliği fikirlerini benimsemesi',
          D: 'Siyasetten uzak durmayı tercih etmesi',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\nSelanik\'in çok uluslu yapısı ve Batı dünyasına açık konumu, Mustafa Kemal\'in farklı kültürleri yakından tanımasını, yenilikçi ve hoşgörülü bir vizyon kazanmasını sağlamıştır.',
        hintForSocratic: 'Farklı ulusların ve fikirlerin bir arada yaşadığı kozmopolit bir şehirde büyüyen bir insan hangi kişisel özelliği kazanır?',
      },
      {
        id: 'meb-soz-q-2',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Millî Uyanış (Amasya Genelgesi)',
        questionNumber: 2,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nAmasya Genelgesi\'nde yer alan "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." maddesi, Kurtuluş Savaşı\'nın hangi yönünü belirtmektedir?',
        options: {
          A: 'Yalnızca gerekçesini',
          B: 'Savaşın amacını ve yöntemini',
          C: 'Savaşta kullanılacak silahların türünü',
          D: 'Sınırların kesin olarak çizildiğini',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\n"Milletin bağımsızlığı" ifadesi Kurtuluş Savaşı\'nın AMACINI, "milletin azim ve kararı" ifadesi ise savaşın YÖNTEMİNİ (milli egemenlik ve halk gücü) ortaya koymaktadır.',
        hintForSocratic: 'Bu maddede "neyin kurtarılacağı" (amaç) ve "kimin kurtaracağı" (yöntem) birlikte verilmiştir.',
      },
      {
        id: 'meb-soz-q-3',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Kader İnancı (Kaza ve Kader)',
        questionNumber: 3,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nİnsanın kendi iradesi ve seçimiyle belirlediği, bundan dolayı da sorumlu tutulduğu irade türü aşağıdakilerden hangisidir?',
        options: {
          A: 'Küllî İrade',
          B: 'Cüz\'î İrade',
          C: 'Ecel ve Ömür',
          D: 'Biyolojik Yasalar',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\nKülli irade Allah\'ın sınırsız iradesidir. İnsana verilen, seçme özgürlüğü tanıyan ve insanın sorumluluk altına girmesini sağlayan sınırlı iradeye ise Cüz\'î İrade denir.',
        hintForSocratic: 'İnsana ait sınırlı irade ile Allah\'a ait sınırsız irade (külli) kavramlarını hatırla.',
      },
      {
        id: 'meb-soz-q-4',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Zekât ve Sadaka İbadeti',
        questionNumber: 4,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nKişinin ölümünden sonra da amel defterinin kapanmamasına ve sevap kazanmaya devam etmesine vesile olan hayırlı işlere (okul, çeşme, faydalı ilim bırakmak) ne ad verilir?',
        options: {
          A: 'Fıtır Sadakası (Fitre)',
          B: 'Sadaka-i Cariye',
          C: 'Öşür',
          D: 'Nisap',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\nÖldükten sonra da sevabı devam eden kesintisiz sadakaya "Sadaka-i Cariye" denir (Hadis-i Şerif: Faydalı ilim, hayırlı evlat, kalıcı hayır eseri).',
        hintForSocratic: '"Kesintisiz / akan sadaka" anlamına gelen ve ölümden sonra da sevap kazandıran ibadet türünü hatırla.',
      },
      {
        id: 'meb-soz-q-5',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Friendship',
        questionNumber: 5,
        questionText:
          '[MEB Örnek Soru Kalıbı]\n"A true friend is someone who always backs you up and keeps your secrets."\n\nWhich of the following characteristics does NOT describe a true friend according to the sentence?',
        options: {
          A: 'Supportive',
          B: 'Reliable / Trustworthy',
          C: 'Honest',
          D: 'Self-centered / Sneaky',
        },
        correctAnswer: 'D',
        explanation:
          'Resmi MEB Çözümü:\nCümlede "arkanda duran (supportive/backs you up)" ve "sırlarını saklayan (reliable/keeps secrets)" kişilerden bahsedilmektedir. Bencil veya sinsi olmak (Self-centered/Sneaky) gerçek bir dostun özelliği OLAMAZ.',
        hintForSocratic: 'Soru kökündeki NOT ifadesine dikkat et. "Back up" desteklemek demektir.',
      },
    ],
  },

  // 2. İnkılap Tarihi 1. Ünite: Bir Kahraman Doğuyor Denemesi
  {
    id: 'lgs-ink-unite-1',
    slug: 'lgs-inkilap-unite-1-bir-kahraman-doguyor',
    title: 'LGS İnkılap Tarihi 1. Ünite: Bir Kahraman Doğuyor Denemesi',
    description: 'Mustafa Kemal\'in çocukluğu, askerlik hayatı, etkilendiği düşünürler ve şehirler üzerine 5 soruluk LGS denemesi.',
    type: 'branch',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '1. ÜNİTE TESTİ',
    questions: [
      {
        id: 'ink-u1-q1',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Mustafa Kemal\'in Eğitimi',
        questionNumber: 1,
        questionText:
          'Mustafa Kemal\'in öğrenim hayatında gittiği okulların kronolojik sıralaması hangisinde DOĞRU verilmiştir?',
        options: {
          A: 'Mahalle Mektebi -> Şemsi Efendi Mektebi -> Selanik Askeri Rüştiyesi -> Manastır Askeri İdadisi -> Harp Okulu -> Harp Akademisi',
          B: 'Şemsi Efendi Mektebi -> Mahalle Mektebi -> Manastır Askeri İdadisi -> Selanik Mülkiye Rüştiyesi',
          C: 'Selanik Askeri Rüştiyesi -> Mahalle Mektebi -> Harp Okulu -> Şemsi Efendi Mektebi',
          D: 'Mahalle Mektebi -> Selanik Askeri Rüştiyesi -> Harp Akademisi -> Harp Okulu',
        },
        correctAnswer: 'A',
        explanation:
          'Mustafa Kemal sırasıyla: 1) Mahalle Mektebi, 2) Şemsi Efendi İlkokulu, 3) Selanik Mülkiye Rüştiyesi (kısa süre), 4) Selanik Askeri Rüştiyesi, 5) Manastır Askeri İdadisi, 6) İstanbul Harp Okulu ve 7) İstanbul Harp Akademisi\'ni bitirmiştir.',
        hintForSocratic: 'Geleneksel mahalle mektebinden modern Şemsi Efendi\'ye, oradan askeri ortaokula (Rüştiye) geçiş sırasını hatırla.',
      },
      {
        id: 'ink-u1-q2',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Mustafa Kemal\'in Fikir Hayatı',
        questionNumber: 2,
        questionText:
          'Mustafa Kemal, Manastır Askeri İdadisi\'nde okurken Namık Kemal ve Mehmet Emin Yurdakul\'un şiirlerinden etkilenmiştir.\n\nBu durum Mustafa Kemal\'de özellikle hangi duygunun güçlenmesini sağlamıştır?',
        options: {
          A: 'Batı taklitçiliği',
          B: 'Vatanseverlik ve Milliyetçilik',
          C: 'Ekonomik girişimcilik',
          D: 'Manda ve himaye arayışı',
        },
        correctAnswer: 'B',
        explanation:
          'Namık Kemal "Vatan Şairi", Mehmet Emin Yurdakul ise "Milli Şair" olarak bilinir. Onların eserleri Mustafa Kemal\'de sarsılmaz bir vatan sevgisi ve Türk milliyetçiliği bilinci oluşturmuştur.',
        hintForSocratic: 'Vatan Şairi Namık Kemal\'in Mustafa Kemal\'e aşıladığı temel ideolojiyi düşün.',
      },
      {
        id: 'ink-u1-q3',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Mustafa Kemal\'in Askeri Başarıları (Trablusgarp)',
        questionNumber: 3,
        questionText:
          'Mustafa Kemal\'in İtalyan işgaline karşı gönüllü olarak gittiği Trablusgarp\'ta yerel halkı teşkilatlandırarak Derne ve Tobruk\'ta kazandığı başarılar onun hangi kişisel özelliğini gösterir?',
        options: {
          A: 'Teşkilatçılık (Örgütleyicilik) ve Liderlik',
          B: 'Açık sözlülük',
          C: 'Sanatseverlik',
          D: 'Eğitimcilik',
        },
        correctAnswer: 'A',
        explanation:
          'Trablusgarp\'ta düzenli bir ordu olmamasına rağmen Mustafa Kemal\'in yerli Bedevi kabileleri bir araya toplayıp disiplinli bir direniş cephesi kurması üstün teşkilatçılık (örgütleme) ve liderlik yeteneğinin ilk somut kanıtıdır.',
        hintForSocratic: 'Halkı örgütleyip bir araya getirme kabiliyetine ne denir?',
      },
      {
        id: 'ink-u1-q4',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: '1. Dünya Savaşı (Çanakkale Cephesi)',
        questionNumber: 4,
        questionText:
          'Çanakkale Savaşı\'nda "Ben size taarruzu emretmiyorum, ölmeyi emrediyorum!" emrini veren Mustafa Kemal, bu cephedeki hangi başarısıyla tüm dünyada ve Türk milletinde "Anafartalar Kahramanı" olarak tanınmıştır?',
        options: {
          A: 'Conkbayırı ve Anafartalar Zaferleri',
          B: 'Kanal Harekâtı',
          C: 'Kut\'ül Amare Kuşatması',
          D: 'Muş ve Bitlis\'in geri alınması',
        },
        correctAnswer: 'A',
        explanation:
          'Mustafa Kemal Çanakkale Kara Savaşları\'nda 19. Tümen Komutanı olarak Conkbayırı, Anafartalar ve Arıburnu hattında düşman çıkarmalarını durdurmuş ve "Anafartalar Kahramanı" unvanını alarak Kurtuluş Savaşı\'nın doğal lideri haline gelmiştir.',
        hintForSocratic: 'Mustafa Kemal\'in Conkbayırı\'nda gösterdiği tarihi direnişi ve unvanını hatırla.',
      },
      {
        id: 'ink-u1-q5',
        courseKey: 'inkilap',
        courseName: 'T.C. İnkılap Tarihi',
        topicName: 'Mondros Ateşkes Antlaşması',
        questionNumber: 5,
        questionText:
          'Mondros Ateşkes Antlaşması\'nın 7. maddesi: "İtilaf Devletleri güvenliklerini tehdit edecek bir durum ortaya çıkarsa herhangi bir stratejik noktayı işgal edebilecektir." hükmünü içeriyordu.\n\nİtilaf Devletleri bu maddeyle asıl neyi amaçlamışlardır?',
        options: {
          A: 'Osmanlı ekonomisini kalkındırmayı',
          B: 'Anadolu\'yu hukuki gerekçeler uydurarak işgal etmeye zemin hazırlamayı',
          C: 'Boğazların güvenliğini Osmanlı ordusuna bırakmayı',
          D: 'Milletler Cemiyeti\'ne üye olmayı',
        },
        correctAnswer: 'B',
        explanation:
          'Mondros\'un 7. maddesi son derece muğlak ve tehlikeli bir maddedir. İtilaf Devletleri en küçük bir asayişsizliği bahane ederek Anadolu\'nun her karışını işgal etmek için hukuki bir kılıf hazırlamışlardır.',
        hintForSocratic: 'İtilaf devletlerinin işgalleri yasal göstermek için koydurduğu maddeyi incele.',
      },
    ],
  },

  // 3. Din Kültürü 1. Ünite: Kader ve Kaza İnancı Kavram Denemesi
  {
    id: 'lgs-din-unite-1',
    slug: 'lgs-din-unite-1-kader-inanci',
    title: 'LGS Din Kültürü 1. Ünite: Kader ve Kaza İnancı Kavram Denemesi',
    description: 'Fiziksel, biyolojik ve toplumsal yasalar; tevekkül, ecel ve ömür kavramları üzerine 5 soruluk LGS denemesi.',
    type: 'branch',
    courseKey: 'din',
    courseName: 'Din Kültürü ve Ahlak Bilgisi',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '1. ÜNİTE TESTİ',
    questions: [
      {
        id: 'din-u1-q1',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Evrenin Yasaları (Biyolojik Yasalar)',
        questionNumber: 1,
        questionText:
          '"O, insanı bir kan pıhtısından (embriyodan) yarattı." (Alak Suresi, 2)\n\nBu ayet evrendeki hangi yasa türüne örnek oluşturur?',
        options: {
          A: 'Fiziksel Yasalar',
          B: 'Biyolojik Yasalar',
          C: 'Toplumsal Yasalar',
          D: 'Kimyasal Yasalar',
        },
        correctAnswer: 'B',
        explanation:
          'Canlıların doğması, gelişmesi, üremesi, fotosentez ve genetik yapıları biyolojik yasalar kapsamındadır. İnsanın anne rahmindeki yaratılışı ve embriyo evresi biyolojik yasaların doğrudan konusudur.',
        hintForSocratic: 'Canlıların yapısı ve gelişimi ile ilgili yasaları hatırla.',
      },
      {
        id: 'din-u1-q2',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Evrenin Yasaları (Toplumsal Yasalar)',
        questionNumber: 2,
        questionText:
          '"Her milletin bir eceli vardır. Ecelleri gelince ne bir an geri kalırlar ne de bir an ileri gidebilirler." (A\'râf Suresi, 34)\n\nAdalet, dürüstlük, eşitlik ve toplumların yükseliş-çöküş ilkelerini inceleyen yasa hangisidir?',
        options: {
          A: 'Fiziksel Yasalar',
          B: 'Toplumsal Yasalar',
          C: 'Biyolojik Yasalar',
          D: 'Yerçekimi Yasası',
        },
        correctAnswer: 'B',
        explanation:
          'Toplumların huzur, adalet ve barış içinde yaşamasını sağlayan, adaletsiz toplumların ise çöküşe uğrayacağını bildiren kurallara Toplumsal Yasalar (Sünnetullah) denir.',
        hintForSocratic: 'Toplumların birlikteliği, adaleti ve ahlaki ilkeleri hangi yasa sınıfına girer?',
      },
      {
        id: 'din-u1-q3',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'İnsanın İradesi ve Kader',
        questionNumber: 3,
        questionText:
          'Aşağıdakilerden hangisi insanın "Cüz\'î İradesi" (kendi seçimi ve sorumluluğu) dahilinde olan bir durumdur?',
        options: {
          A: 'Hangi anne babadan dünyaya geleceği',
          B: 'Göz ve ten rengi',
          C: 'Doğum tarihi ve yeri',
          D: 'İyilik veya kötülük yapmayı seçmesi, dürüst yaşaması',
        },
        correctAnswer: 'D',
        explanation:
          'İnsanın nerede doğacağı, ırkı, anne babası Külli İrade\'nin (Allah\'ın takdiri) sonucudur ve insan bundan hesaba çekilmez. Ancak ahlaki tercihleri, ibadetleri ve dürüstlüğü Cüz\'î İrade\'ye girer ve sorumluluk doğurur.',
        hintForSocratic: 'İnsanın kendi özgür iradesiyle seçtiği ve bundan dolayı ahirette sorumlu tutulacağı eylemi bul.',
      },
      {
        id: 'din-u1-q4',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Yanlış Kader Anlayışı',
        questionNumber: 4,
        questionText:
          'Hiçbir tedbir almayıp arabayı aşırı hızlı kullanan ve kaza yaptıktan sonra "Ne yapayım, kaderim böyleymiş!" diyen bir sürücünün hatası nedir?',
        options: {
          A: 'Kaderi doğru anlamış olması',
          B: 'Cüz\'î iradesiyle aldığı yanlış kararların ve ihmalkarlığının sorumluluğunu kadere yüklemesi',
          C: 'Arabasının bakımını yaptırmamış olması',
          D: 'Trafik kurallarını bilmemesi',
        },
        correctAnswer: 'B',
        explanation:
          'İslam\'da kadercilik veya pasiflik yoktur. İnsan aklını ve iradesini kullanarak kurallara uymak ve tedbir almak zorundadır. Kendi kusuruyla sebep olduğu bir felaketi "Kaderim böyleymiş" diyerek kadere fatura etmek yanlış kader inancıdır.',
        hintForSocratic: 'İnsanın kendi ihmalini kadere bağlamasının İslam\'daki karşılığını düşün.',
      },
      {
        id: 'din-u1-q5',
        courseKey: 'din',
        courseName: 'Din Kültürü ve Ahlak Bilgisi',
        topicName: 'Ayetel Kürsi',
        questionNumber: 5,
        questionText:
          'Bakara Suresi\'nin 255. ayeti olan, Allah\'ın birliğini (Tevhid), O\'nun diriliğini (Hayy), her şeyin yöneticisi olduğunu (Kayyûm) ve kürsisinin gökleri ve yeri kapladığını anlatan yüce ayet hangisidir?',
        options: {
          A: 'Fatiha Suresi',
          B: 'İhlas Suresi',
          C: 'Âyetü\'l-Kürsî',
          D: 'Fil Suresi',
        },
        correctAnswer: 'C',
        explanation:
          'Bakara Suresi\'nin 255. ayeti Âyetü\'l-Kürsî\'dir. Yüce Allah\'ın sıfatlarını, sonsuz kudretini ve kainat üzerindeki mutlak hakimiyetini en veciz şekilde ifade eder.',
        hintForSocratic: 'Bakara Suresi 255. ayet olan ve Allah\'ın mutlak hakimiyetini anlatan meşhur ayet.',
      },
    ],
  },

  // 4. İngilizce: Unit 1 & Unit 2 Master Test
  {
    id: 'lgs-ing-unite-1-2',
    slug: 'lgs-ingilizce-unite-1-ve-2-master-test',
    title: 'LGS İngilizce: Unit 1 Friendship & Unit 2 Teen Life Master Test',
    description: 'Making offers, accepting/refusing, daily routines and teen preferences odaklı 5 soruluk LGS İngilizce denemesi.',
    type: 'branch',
    courseKey: 'ingilizce',
    courseName: 'İngilizce',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'MASTER TEST',
    questions: [
      {
        id: 'ing-u12-q1',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Friendship (Personal Traits)',
        questionNumber: 1,
        questionText:
          '"Tim never tells lies and always keeps his promises. You can always count on him."\n\nAccording to the sentence, which personality trait best describes Tim?',
        options: {
          A: 'Generous',
          B: 'Honest and Trustworthy',
          C: 'Stubborn',
          D: 'Arrogant',
        },
        correctAnswer: 'B',
        explanation:
          'Tim\'in asla yalan söylememesi ("never tells lies") dürüst (honest), sözünü tutması ve güvenilir olması ("count on him") güvenilir (trustworthy) olduğunu gösterir.',
        hintForSocratic: '"never tells lies" (asla yalan söylemez) ve "count on" (güvenmek) sıfatlarını eşleştir.',
      },
      {
        id: 'ing-u12-q2',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Making Invitations',
        questionNumber: 2,
        questionText:
          'Which of the following sentences CANNOT be used to invite someone to an activity?',
        options: {
          A: 'How about watching a sci-fi movie tonight?',
          B: 'Why don\'t we have a barbecue this Sunday?',
          C: 'Would you like to come over for dinner?',
          D: 'I am afraid I can\'t join you because I am busy.',
        },
        correctAnswer: 'D',
        explanation:
          'A, B ve C seçenekleri teklif/davet (making invitations/offers) cümleleridir. D seçeneği ise gelen bir daveti mazeret belirterek kibarca reddetme (refusing with an excuse) cümlesidir.',
        hintForSocratic: 'Hangisinin bir soru ve teklif değil, ret cümlesi olduğuna dikkat et.',
      },
      {
        id: 'ing-u12-q3',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 2: Teen Life (Preferences)',
        questionNumber: 3,
        questionText:
          '"I prefer reading fantasy books to watching biographical documentaries."\n\nWhat can we conclude from this statement?',
        options: {
          A: 'The person likes documentaries more than fantasy books.',
          B: 'The person finds fantasy books boring.',
          C: 'The person likes fantasy books more than documentaries.',
          D: 'The person hates reading all kinds of books.',
        },
        correctAnswer: 'C',
        explanation:
          '"prefer X to Y" kalıbında X sevilen/tercih edilen, Y ise daha az tercih edilendir. Dolayısıyla bu kişi fantastik kitapları belgesel izlemeye tercih etmektedir (likes fantasy books more than documentaries).',
        hintForSocratic: '"prefer A to B" kalıbında A\'nın B\'ye tercih edildiğini hatırla.',
      },
      {
        id: 'ing-u12-q4',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 2: Teen Life (Music Genres)',
        questionNumber: 4,
        questionText:
          'Jack: "Do you like listening to rap music?"\nSam: "No, I can\'t stand it. To me, it is --------."\n\nWhich negative adjective can fill in the blank?',
        options: {
          A: 'terrific',
          B: 'ridiculous and noisy',
          C: 'impressive',
          D: 'relaxing',
        },
        correctAnswer: 'B',
        explanation:
          'Sam "I can\'t stand it" (Ona katlanamıyorum) diyerek rap müziği hiç sevmediğini belirtmektedir. Boşluğa olumsuz bir ifade olan "ridiculous and noisy" (gülünç ve gürültülü) gelmelidir.',
        hintForSocratic: '"can\'t stand" (katlanamamak) olumsuz bir ifadedir, devamına olumsuz bir sıfat gelmeli.',
      },
      {
        id: 'ing-u12-q5',
        courseKey: 'ingilizce',
        courseName: 'İngilizce',
        topicName: 'Unit 1: Friendship',
        questionNumber: 5,
        questionText:
          'Which proverb best matches the meaning of: "A good friend stands by you in hard times"?',
        options: {
          A: 'A friend in need is a friend indeed.',
          B: 'Actions speak louder than words.',
          C: 'Better late than never.',
          D: 'No pain, no gain.',
        },
        correctAnswer: 'A',
        explanation:
          '"A friend in need is a friend indeed" (Dost kara günde belli olur), zor zamanlarda yanında olan dostun gerçek dost olduğunu anlatan atasözüdür.',
        hintForSocratic: '"Kara günde belli olan dost" atasözünün İngilizce karşılığını hatırla.',
      },
    ],
  },
];
