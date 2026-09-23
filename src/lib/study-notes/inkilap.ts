import type { TopicStudyNote } from '@/types/study';

export const INKILAP_NOTES: TopicStudyNote[] = [
  {
    topicId: 'inkilap-kahraman',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Bir Kahraman Doğuyor',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Selanik\'in Özellikleri: Liman ve demiryolu ağı (Ekonomik gelişmişlik), çok uluslu yapı (Kültürel zenginlik ancak Milliyetçilik akımıyla isyan tehlikesi), Batı basınının kolayca ulaşması (Özgür düşünce ortamı).',
      'Mustafa Kemal\'i Etkileyen Şehirler: Selanik (Çocukluk/fikir hayatı), Manastır (Tarih ve edebiyat sevgisi, Namık Kemal ve Mehmet Emin Yurdakul), İstanbul (Siyaset ve devlet işlerini yakından izleme), Şam (İlk görev yeri, Vatan ve Hürriyet Cemiyeti), Sofya (Askeri Ataşemiliterlik, Batı diplomasisi ve parlamento tecrübesi).',
      'Mustafa Kemal\'in Kişilik Özellikleri: Çanakkale\'de düşmanın nereden çıkacağını bilmesi -> İleri Görüşlülük. Trablusgarp\'ta halkı örgütlemesi -> Teşkilatçılık (Örgütleyicilik) ve Liderlik. Asla pes etmemesi -> Kararlılık.',
    ],
    mebTraps: [
      'MEB Tuzak 1: Olay ile kişilik özelliğini yanlış eşleştirmek! "Ordu mensuplarının siyasete karışmasını istememesi" onun askeri dehası değil, devlet adamlığı ve ileri görüşlülüğüdür.',
      'MEB Tuzak 2: Mustafa Kemal\'in ilk görev yerinin Şam (5. Ordu) olduğunu, askeri ataşe olarak görev yaptığı yerin ise Sofya olduğunu karıştırmamak.',
    ],
    questionStrategy:
      'Paragrafta yapılan işe bak: Halkı topladı, dernek kurdu diyorsa TEŞKİLATÇILIK; önceden tahmin etti diyorsa İLERİ GÖRÜŞLÜLÜK; yabancı diplomatlarla görüştü diyorsa DİPLOMASİ işaretlenmelidir.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-1',
    exampleQuestion: {
      questionText: 'Mustafa Kemal\'in Trablusgarp Savaşı\'nda kimliğini gizleyerek (Gazeteci Şerif Bey adıyla) bölgeye gidip dağınık haldeki yerel halkı bir araya getirerek İtalyanlara karşı direniş başlatması onun hangi kişilik özelliklerini gösterir?',
      solutionSteps: [
        '1. Adım: Gönüllü olarak tehlikeli bir savaşa gitmesi -> Vatanseverlik.',
        '2. Adım: Dağınık halkı organize edip düzenli direniş kurması -> Teşkilatçılık (Örgütleyicilik) ve Liderlik.',
      ],
      keyTakeaway: 'Halkı birleştirmek ve organize etmek kelimeleri daima TEŞKİLATÇILIK kavramına işaret eder.',
    },
  },
  {
    topicId: 'inkilap-milli-uyanis',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
    lgsFrequency: 'Her yıl 2-3 soru',
    difficultyLevel: 'Belirleyici / Zor',
    summaryBullets: [
      'I. Dünya Savaşı Cepheleri: Taarruz Cepheleri (Kafkas ve Kanal - "K" ile başlar), Savunma Cepheleri (Çanakkale, Irak, Suriye-Filistin, Hicaz-Yemen).',
      'Mondros Ateşkes Antlaşması: 7. Madde (İtilaf devletleri güvenliklerini tehdit eden herhangi bir stratejik noktayı işgal edebilecek -> İŞGALLERE HUKUKİ ZEMİN HAZIRLAMIŞTIR). 24. Madde (Vilayet-i Sitte\'de karışıklık çıkarsa işgal edilecek -> ERMENİ DEVLETİ KURMA AMACI).',
      'Kurtuluş Savaşı Genelge ve Kongreleri Kronolojisi: Havza Genelgesi (İlk milli bilinç, mitingler) -> Amasya Genelgesi (Kurtuluş Savaşı\'nın AMACI, GEREKÇESİ ve YÖNTEMİ ilk kez belirtildi, milli egemenlik vurgulandı) -> Erzurum Kongresi (Toplanış bakımından bölgesel, aldığı kararlar bakımından ulusal; Manda ve himaye ilk kez reddedildi) -> Sivas Kongresi (Her bakımdan ulusal; tüm cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti altında birleştirildi, İrade-i Milliye gazetesi çıkarıldı).',
      'Misakımillî (Milli Ant): Son Osmanlı Mebusan Meclisi\'nde kabul edilen milli sınırlar bildirgesidir. Kapitülasyonlar ilk kez kesin olarak reddedilmiştir.',
      'TBMM\'nin Açılması (23 Nisan 1920): Kurucu meclis, ihtilalci meclis, güçler birliği ilkesi (Yasama + Yürütme mecliste toplanmıştır).',
    ],
    mebTraps: [
      'MEB Tuzak 1: Amasya Genelgesi\'ndeki "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır" maddesi hem YÖNTEM hem de ilk kez MİLLİ EGEMENLİK vurgusudur.',
      'MEB Tuzak 2: Erzurum Kongresi bölgesel bir kongredir ancak Misakımillî sınırları burada belirlendiği için kararları ULUSALDIR.',
      'MEB Tuzak 3: Mondros\'un 7. maddesi tüm yurdu işgale açık hale getiren en tehlikeli maddedir.',
    ],
    questionStrategy:
      'Gerekçe: "Vatanın bütünlüğü milletin bağımsızlığı tehlikededir." Amaç: "Milletin bağımsızlığını kurtarmak." Yöntem: "Milletin azim ve kararı." Bu üçlüyü gördüğün an Amasya Genelgesi\'ni işaretle.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-2',
    exampleQuestion: {
      questionText: 'Amasya Genelgesi\'nde yer alan "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." kararı Kurtuluş Savaşı\'nın hangi boyutunu ortaya koyar?',
      solutionSteps: [
        '1. Adım: "Milletin bağımsızlığını kurtarmak" -> Mücadelenin AMACIDIR.',
        '2. Adım: "Milletin azim ve kararıyla yapmak" -> Mücadelenin YÖNTEMİDİR ve ileride milli egemenliğe geçileceğinin ilk işaretidir.',
      ],
      keyTakeaway: 'Amasya Genelgesi bağımsızlık savaşımızın yol haritası ve yöntem belgesidir.',
    },
  },
  {
    topicId: 'inkilap-milli-destan',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Millî Bir Destan: Ya İstiklal Ya Ölüm!',
    lgsFrequency: 'Her yıl 2-3 soru',
    difficultyLevel: 'Belirleyici / Zor',
    summaryBullets: [
      'Doğu Cephesi: Ermenilere karşı savaşıldı (Kazım Karabekir - 15. Kolordu). Gümrü Antlaşması ile kapandı (TBMM\'nin İLK ASKERİ VE SİYASİ BAŞARISI, Sevr\'i reddeden ilk devlet Ermenistan).',
      'Güney Cephesi: Fransızlara ve Ermenilere karşı KUVAYIMİLLİYE savaştı (Düzenli ordu YOKTUR). Antep (Şahin Bey), Maraş (Sütçü İmam), Urfa (Ali Saip Bey). Ankara Antlaşması ile kapandı.',
      'Batı Cephesi (Düzenli Ordu - Yunanlılara Karşı):',
      '- I. İnönü Zaferi Sonuçları Kodlaması (TALİM): T: Teşkilat-ı Esasiye (İlk anayasa), A: Afganistan Dostluk Antlaşması, L: Londra Konferansı (TBMM resmen tanındı), İ: İstiklal Marşı kabul edildi, M: Moskova Antlaşması (İlk kez bir büyük Avrupalı devlet TBMM\'yi tanıdı, Misakımillî\'den ilk taviz: Batum).',
      '- II. İnönü Zaferi: "Siz orada sadece düşmanı değil, milletin makus talihini de yendiniz."',
      '- Kütahya-Eskişehir Muharebeleri: Tek mağlubiyetimiz. Mustafa Kemal\'e Başkomutanlık yetkisi verildi. Tekalif-i Milliye Emirleri (Milli yükümlülükler) yayımlandı. Maarif (Eğitim) Kongresi toplandı.',
      '- Sakarya Meydan Muharebesi: "Hattı müdafaa yoktur, sathı müdafaa vardır. O satıh bütün vatandır." Topyekun savaş. Fransa ile Ankara Antlaşması, Kafkas Cumhuriyetleri ile Kars Antlaşması imzalandı. Mustafa Kemal\'e Gazilik ve Mareşallik verildi.',
      '- Büyük Taarruz (Başkomutanlık Meydan Muharebesi): Kurtuluş Savaşı\'nın askeri safhası bitti, diplomatik safhası başladı (Mudanya Ateşkesi ve Lozan Barış Antlaşması).',
    ],
    mebTraps: [
      'MEB Tuzak 1: Güney Cephesi\'nde düzenli ordunun savaştığını sanmak; Güney\'de halk direnişi (Kuvayımilliye) savaşmıştır.',
      'MEB Tuzak 2: Kütahya-Eskişehir Savaşı devam ederken Ankara\'da Maarif (Eğitim) Kongresi\'nin toplanması, Atatürk\'ün eğitime verdiği önemi gösterir.',
      'MEB Tuzak 3: Misakımillî\'den verilen ilk taviz Moskova Antlaşması ile BATUM\'dur.',
    ],
    questionStrategy:
      'I. İnönü\'nün sonuçlarını TALİM şifresiyle aklına getir. Sakarya Muharebesi\'nin son savunma savaşı olduğunu, Büyük Taarruz\'un ise taarruz savaşı olduğunu hatırla.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-3',
    exampleQuestion: {
      questionText: 'Kurtuluş Savaşı\'nın en şiddetli günlerinde Kütahya-Eskişehir muharebeleri devam ederken Mustafa Kemal\'in Ankara\'da I. Maarif Kongresi\'ni toplaması onun hangi alana verdiği önemi gösterir?',
      solutionSteps: [
        '1. Adım: "Maarif" sözcüğü eğitim ve kültür anlamına gelir.',
        '2. Adım: Savaşın ortasında öğretmenleri ve eğitimcileri toplaması, cehaletle savaşın düşmanla savaş kadar önemli görüldüğünü kanıtlar.',
        '3. Sonuç: EĞİTİME verilen önemi gösterir.',
      ],
      keyTakeaway: 'Maarif Kongresi sorulduğunda doğrudan "Eğitim ve Kültür" kavramı aranmalıdır.',
    },
  },
  {
    topicId: 'inkilap-ataturkculuk',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Atatürkçülük ve Çağdaşlaşan Türkiye',
    lgsFrequency: 'Her yıl 2-3 soru',
    difficultyLevel: 'Belirleyici / Zor',
    summaryBullets: [
      'ATATÜRK İLKELERİ VE ANAHTAR SÖZCÜKLERİ:',
      '1. Cumhuriyetçilik: Milli egemenlik, milli irade, seçim, oy, meclis, çok partili hayat, milletvekili (Saltanatın kaldırılması, Cumhuriyetin ilanı).',
      '2. Milliyetçilik: Milli bağımsızlık, milli kimlik, Türk dili (TDK), Türk tarihi (TTK), Kabotaj Kanunu (Denizlerimizin millileştirilmesi), yabancı şirketlerin millileştirilmesi.',
      '3. Halkçılık: EŞİTLİK, ayrıcalıkların reddi, sosyal adalet, sosyal devlet, sınıf ayrımının olmaması (Aşar vergisinin kaldırılması, Soyadı Kanunu, Kadınlara seçme ve seçilme hakkı).',
      '4. Devletçilik: EKONOMİ, fabrika açma, demiryolları, Merkez Bankası, Karma ekonomi modeli (Halkın parası yetmediğinde devletin sanayi yatırımı yapması: Sümerbank, Etibank).',
      '5. Laiklik: Din ve devlet işlerinin ayrılması, akılcılık, bilimsellik, din ve vicdan hürriyeti (Halifeliğin kaldırılması, Tevhid-i Tedrisat, Tekke ve Zaviyelerin kapatılması).',
      '6. İnkılapçılık: Çağdaşlaşma, modernleşme, sürekli yenilenme, dinamizm (Miladi takvim, saat ve ölçülerde değişiklik, Harf İnkılabı).',
    ],
    mebTraps: [
      'MEB Tuzak 1: Kabotaj Kanunu\'nu Devletçilik veya İnkılapçılık sanmak! Kabotaj Kanunu Türk karasularında ticaret hakkını yabancılardan alıp Türklere verdiği için doğrudan MİLLİYETÇİLİK ilkesidir.',
      'MEB Tuzak 2: Kadınlara siyasi hakların verilmesi hem CUMHURİYETÇİLİK (yönetime katılım) hem de HALKÇILIK (kadın-erkek eşitliği) ilkesidir.',
      'MEB Tuzak 3: Aşar vergisinin kaldırılması çiftçiden alınan ağır yükü kaldırıp eşitlik getirdiği için HALKÇILIK ilkesidir.',
    ],
    questionStrategy:
      'Soruda fabrika, banka, para, sanayi planı geçiyorsa DEVLETÇİLİK; Türk, milli, bağımsızlık geçiyorsa MİLLİYETÇİLİK; eşitlik, adalet, ayrıcalıkların kalkması geçiyorsa HALKÇILIK; akıl ve bilim geçiyorsa LAİKLİK ilkesine git.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-4',
    exampleQuestion: {
      questionText: '1 Temmuz 1926\'da kabul edilen Kabotaj Kanunu ile Türk karasularında ve limanlarında yük ve yolcu taşıma hakkı yalnızca Türk gemilerine ve denizcilerine verilmiştir. Bu inkılap doğrudan hangi Atatürk ilkesiyle ilişkilidir?',
      solutionSteps: [
        '1. Adım: Deniz ticareti yabancıların elinden alınıp milli egemenliğe devredilmiştir.',
        '2. Adım: Türk denizcisini ve Türk milletinin bağımsız haklarını korumaktadır.',
        '3. Sonuç: Doğrudan MİLLİYETÇİLİK ilkesidir.',
      ],
      keyTakeaway: 'Kabotaj Kanunu denizlerdeki kapitülasyonları kaldırıp millileştirme sağladığı için daima MİLLİYETÇİLİK ilkesine girer.',
    },
  },
  {
    topicId: 'inkilap-demokratiklesme',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Demokratikleşme Çabaları',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Çok Partili Hayatın Amacı: Farklı fikirlerin mecliste temsil edilmesi (Çoğulculuk), hükümetin denetlenmesini sağlamak.',
      'Cumhuriyet Halk Fırkası: İlk siyasi parti (Mustafa Kemal kurdu).',
      'Terakkiperver Cumhuriyet Fırkası: İlk muhalefet partisi (Kazım Karabekir, Rauf Orbay, Ali Fuat Cebesoy). Programında "Partimiz dini inançlara saygılıdır" maddesi yer aldı; Şeyh Sait İsyanı ile ilişkisi görülünce Takrir-i Sükun Kanunu ile kapatıldı.',
      'Şeyh Sait İsyanı: Cumhuriyete ve laik düzene karşı çıkan İLK İSYANDIR. Bu isyan nedeniyle Musul sorunu aleyhimize sonuçlandı (İngiltere faydalandı).',
      'Mustafa Kemal\'e Suikast Girişimi (İzmir): "Benim naçiz vücudum bir gün elbet toprak olacaktır fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır."',
      'Serbest Cumhuriyet Fırkası: İkinci muhalefet partisi (Ali Fethi Okyar kurdu). Partiye cumhuriyet karşıtları sızınca kurucusu tarafından feshedildi.',
      'Menemen Olayı (Kubilay Olayı): Derviş Mehmet ve yandaşlarının gerici isyanı. Çok partili hayata henüz hazır olunmadığını gösterdi ve denemelere 1946\'ya kadar ara verildi.',
    ],
    mebTraps: [
      'MEB Tuzak 1: Şeyh Sait İsyanı ve Menemen Olayı rejim karşıtı (Cumhuriyet ve Laiklik karşıtı) gerici isyanlardır. Kişilere değil rejime yöneliktir.',
      'MEB Tuzak 2: Çok partili hayata Atatürk döneminde tam olarak geçilememiştir; şartlar hazır olmadığı için denemelere ara verilmiştir.',
    ],
    questionStrategy:
      'Çok partili hayat sorularında meclis denetimi ve çoğulculuk anahtar kavramlardır. Şeyh Sait ve Menemen olaylarında "Cumhuriyet rejimine karşı olma" vurgusunu ara.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-5',
    exampleQuestion: {
      questionText: 'Atatürk döneminde çok partili hayata geçiş denemelerinin başarısızlıkla sonuçlanması ve partilerin kapatılmak zorunda kalınması neyi kanıtlar?',
      solutionSteps: [
        '1. Adım: Şeyh Sait İsyanı ve Menemen Olayı yaşanmıştır.',
        '2. Adım: Kurulan muhalefet partilerine rejim karşıtları sızmıştır.',
        '3. Sonuç: Türk toplumunun henüz çok partili demokratik düzene tam olarak hazır olmadığını kanıtlar.',
      ],
      keyTakeaway: 'Toplumsal ortam hazır olmadan yapılan girişimler rejim güvenliğini tehdit ettiği için zorunlu olarak ertelenmiştir.',
    },
  },
  {
    topicId: 'inkilap-dis-politika',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Atatürk Dönemi Türk Dış Politikası',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Orta',
    summaryBullets: [
      'Dış Politika Temel İlkeleri: Tam bağımsızlık, gerçekçilik, barışçılık ("Yurtta sulh, cihanda sulh"), mütekabiliyet (karşılıklılık), akılcılık, hukuka bağlılık.',
      'Nüfus Mübadelesi: Yunanistan ile yaşanan Etabli (yerleşik) sorunu. İstanbul Rumları ile Batı Trakya Türkleri hariç halklar karşılıklı değiştirildi.',
      'Milletler Cemiyeti\'ne Giriş (1932): Türkiye barışçı politikasının bir sonucu olarak İspanya ve Yunanistan\'ın davetiyle cemiyete üye oldu.',
      'Balkan Antantı (1934): İtalya ve Almanya\'nın yayılmacı tehdidine karşı BATI SINIRINI GÜVENCEYE ALMAK için kuruldu (Türkiye, Yunanistan, Yugoslavya, Romanya - Kodlama: TAYYAR).',
      'Montrö Boğazlar Sözleşmesi (1936): Lozan\'daki Boğazlar Komisyonu kaldırıldı; Boğazların tüm yönetimi ve asker bulundurma hakkı TÜRKİYE\'YE GEÇTİ (Tam egemenlik sağlandı).',
      'Sadabat Paktı (1937): İtalya\'nın Habeşistan\'ı işgali üzerine DOĞU SINIRINI GÜVENCEYE ALMAK için kuruldu (Türkiye, İran, Irak, Afganistan).',
      'Hatay Sorunu: Atatürk\'ün "şahsi meselem" dediği davadır. 1938\'de bağımsız Hatay Devleti kuruldu, 1939\'da Meclis kararıyla Türkiye\'ye katıldı.',
    ],
    mebTraps: [
      'MEB Tuzak 1: Balkan Antantı BATI sınırını, Sadabat Paktı DOĞU sınırını korumak için yapılmıştır; coğrafi yönleri karıştırmayın.',
      'MEB Tuzak 2: Hatay\'ın anavatana katılması (1939) Atatürk\'ün vefatından (1938) sonra gerçekleşmiştir; ancak diplomatik temellerini tamamen Atatürk atmıştır.',
    ],
    questionStrategy:
      'Boğazlar Komisyonu\'nun kalkması dendiğinde MONTRÖ (tam bağımsızlık); Batı sınırı güvenliği dendiğinde BALKAN ANTANTI; Doğu sınırı güvenliği dendiğinde SADABAT PAKTI\'nı seç.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-6',
    exampleQuestion: {
      questionText: 'Lozan Barış Antlaşması\'nda başkanı Türk olan uluslararası bir komisyona bırakılan Boğazların kontrolü, hangi sözleşmeyle tamamen Türkiye\'nin egemenliğine geçmiştir?',
      solutionSteps: [
        '1. Adım: Lozan\'da Boğazlar askersizleştirilmiş ve komisyona bırakılmıştı (egemenliğe aykırıydı).',
        '2. Adım: 1936 yılında imzalanan MONTRÖ BOĞAZLAR SÖZLEŞMESİ ile komisyon kaldırıldı ve Türk askeri boğazlara yerleşti.',
      ],
      keyTakeaway: 'Montrö Sözleşmesi Türkiye\'nin Boğazlar üzerindeki tam ve mutlak egemenliğini tescil etmiştir.',
    },
  },
  {
    topicId: 'inkilap-olumu-sonrasi',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Atatürk\'ün Ölümü ve Sonrası',
    lgsFrequency: 'Her yıl 1 soru',
    difficultyLevel: 'Temel',
    summaryBullets: [
      'Atatürk\'ün Vefatı: 10 Kasım 1938\'de Dolmabahçe Sarayı\'nda vefat etti. İlk naaşı Etnografya Müzesi\'ne konuldu, 1953\'te Anıtkabir\'e nakledildi.',
      'Nutuk (Söylev): 1919-1927 yıllarını anlatır. "1919 yılı Mayısının 19\'uncu günü Samsun\'a çıktım" ile başlar, "Gençliğe Hitabe" ile biter. Geliri Türk Hava Kurumu\'na bağışlanmıştır.',
      'II. Dünya Savaşı Tehlikesi ve Öngörüleri: Atatürk 1932\'de General MacArthur ile görüşmesinde Almanya\'nın 1940-1945 civarında savaşı başlatacağını, Avrupa\'yı yakıp yıkacağını ve asıl kazananın Bolşevizm (Sovyetler) olacağını yıllar öncesinden tahmin etmiştir (İleri Görüşlülük).',
      'İsmet İnönü Dönemi: Atatürk\'ten sonra 2. Cumhurbaşkanı seçilmiştir. II. Dünya Savaşı\'nda Türkiye\'yi dengeli bir diplomasiyle savaşın yıkımından uzak tutmayı başarmıştır.',
    ],
    mebTraps: [
      'MEB Tuzak 1: Nutuk\'un tüm Kurtuluş Savaşı ve sonrasını kapsadığını sanmak; Nutuk 1919 ile 1927 yılları arasını kapsar, 1927 sonrasını içermez.',
      'MEB Tuzak 2: Atatürk\'ün II. Dünya Savaşı tahminleri onun askeri ve diplomatik İLERİ GÖRÜŞLÜLÜĞÜNÜN en somut kanıtıdır.',
    ],
    questionStrategy:
      'Nutuk sorularında 1919-1927 tarih aralığına ve Gençliğe Hitabe ile bittiğine dikkat et. Dünya liderlerinin Atatürk hakkındaki övgü dolu sözleri onun evrensel bir lider olduğunu kanıtlar.',
    relatedExamSlug: 'lgs-sozel-inkilap-unite-7',
    exampleQuestion: {
      questionText: 'Mustafa Kemal Atatürk\'ün kaleme aldığı ve 1919\'dan 1927\'ye kadar olan Kurtuluş Savaşı ve inkılaplar dönemini anlatan eseri hangisidir?',
      solutionSteps: [
        '1. Adım: 1919 Samsun\'a çıkışla başlar.',
        '2. Adım: 1927\'de CHF kurultayında okunmuştur.',
        '3. Sonuç: Bu eser NUTUK (SÖYLEV)\'dur.',
      ],
      keyTakeaway: 'Nutuk birincil elden tarihi bir kaynak ve milli bağımsızlık belgesidir.',
    },
  },
];
