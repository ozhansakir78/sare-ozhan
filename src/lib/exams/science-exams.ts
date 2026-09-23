import type { OnlineExam } from '@/types/online-exam';

export const SCIENCE_EXAMS: OnlineExam[] = [
  // 1. Fen Bilimleri Deney Denemesi
  {
    id: 'exam-fen-1',
    slug: 'lgs-2027-fen-bilimleri-deney-denemesi',
    title: '2027 LGS Fen Bilimleri Deney & Grafik Denemesi',
    description: 'Mevsimlerin oluşumu, DNA genetik kod, basınç ve kimyasal tepkime grafiklerini yorumlatan 5 soruluk LGS Fen denemesi.',
    type: 'branch',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'ÜCRETSİZ DENEME',
    questions: [
      {
        id: 'fen-q-1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Mevsimler ve İklim',
        questionNumber: 1,
        questionText:
          '21 Haziran tarihinde Kuzey Yarım Küre\'de bulunan bir şehirde öğle vakti dikey duran bir cismin gölge boyu ölçülmüştür.\n\nBu tarihle ilgili aşağıda verilen ifadelerden hangisi DOĞRUDUR?',
        options: {
          A: 'Kuzey Yarım Küre\'de en uzun gece yaşanır.',
          B: 'Güneş ışınları Yengeç Dönencesi\'ne dik açıyla düşer.',
          C: 'Güney Yarım Küre\'de yaz mevsimi başlar.',
          D: 'Ekvator\'da gece süresi gündüz süresinden daha uzundur.',
        },
        correctAnswer: 'B',
        explanation:
          '21 Haziran tarihinde Güneş ışınları Kuzey Yarım Küre\'deki Yengeç Dönencesi\'ne 90° dik açıyla düşer ve Kuzey Yarım Küre\'de en uzun gündüz (yaz başlangıcı) yaşanır.',
        hintForSocratic: '21 Haziran\'da Güneş ışınlarının hangi dönenceye dik açıyla geldiğini ve Kuzey Yarım Küre\'de hangi mevsimin başladığını hatırla.',
      },
      {
        id: 'fen-q-2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod',
        questionNumber: 2,
        questionText:
          'Bir DNA molekülünün tek zincirinde 300 Adenin, 200 Timin, 400 Guanin ve 100 Sitozin bazı bulunmaktadır.\n\nBuna göre bu DNA molekülünün tamamında toplam kaç adet nükleotit bulunur?',
        options: {
          A: '1000',
          B: '1500',
          C: '2000',
          D: '2400',
        },
        correctAnswer: 'C',
        explanation:
          '1. Tek zincirdeki toplam baz sayısı: 300 + 200 + 400 + 100 = 1000 nükleotit.\n2. DNA çift zincirli bir yapıdır. Karşı zincirde de tam 1000 nükleotit yer alır.\n3. Toplam nükleotit sayısı: 1000 + 1000 = 2000 adettir.',
        hintForSocratic: 'DNA molekülü kaç zincirden oluşur? Tek zincirdeki baz sayısını bulduktan sonra karşı zinciri de hesaba kat.',
      },
      {
        id: 'fen-q-3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Katı, Sıvı ve Gaz Basıncı',
        questionNumber: 3,
        questionText:
          'Özdeş küpler kullanılarak oluşturulan K cisminin yere uyguladığı basınç P kadardır.\n\nK cisminin üzerine özdeş bir küp daha konulursa zemine uygulanan katı basıncı nasıl değişir? (Taban alanı sabit tutulmuştur)',
        options: {
          A: 'Değişmez',
          B: 'Yarıya iner',
          C: '2 katına çıkar',
          D: '4 katına çıkar',
        },
        correctAnswer: 'C',
        explanation:
          'Katı basıncı formülü: P = Ağırlık (G) / Taban Alanı (S). Başlangıçta G/S = P idi. Üzerine bir özdeş küp daha konulunca ağırlık 2G olurken taban alanı S aynı kalmıştır. Basınç 2G/S = 2P olur (2 katına çıkar).',
        hintForSocratic: 'Katı basıncı formülünü (P = Kuvvet / Yüzey Alanı) hatırla. Yüzey alanı değişmeden ağırlık 2 katına çıkarsa basınç ne olur?',
      },
      {
        id: 'fen-q-4',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Madde ve Endüstri (Periyodik Sistem)',
        questionNumber: 4,
        questionText:
          'Periyodik sistemde aynı grupta yukarıdan aşağıya doğru inildikçe genellikle aşağıdakilerden hangisi GERÇEKLEŞMEZ?',
        options: {
          A: 'Katman (periyot) sayısı artar.',
          B: 'Atom numarası artar.',
          C: 'Grup numarası artar.',
          D: 'Metalik aktiflik genellikle artar.',
        },
        correctAnswer: 'C',
        explanation:
          'Aynı düşey sütunda (grupta) yukarıdan aşağıya inildikçe grup numarası değişmez; ancak her aşağı basamakta yeni bir periyoda geçildiği için katman sayısı ve proton (atom) numarası artar.',
        hintForSocratic: 'Aynı grupta aşağı inildiğinde grup numarası değişir mi yoksa sabit mi kalır?',
      },
      {
        id: 'fen-q-5',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Basit Makineler',
        questionNumber: 5,
        questionText:
          'Aşağıda verilen basit makinelerden hangisinde kuvvetten kazanç sağlanırken AYNI ORANDA yoldan kayıp yaşanır?',
        options: {
          A: 'Sabit makara',
          B: 'Eğik düzlem',
          C: 'Eşit kollu terazi',
          D: 'Hareketli makara (kuvvetten kayıp olan hali)',
        },
        correctAnswer: 'B',
        explanation:
          'Eğik düzlemde her zaman kuvvetten kazanç vardır (Kuvvet kolu / Yük kolu). İşten veya enerjiden kazanç sağlanamayacağı için kuvvetten kazanılan oranda yoldan kayıp yaşanır.',
        hintForSocratic: 'Sabit makarada kuvvetten kazanç var mıdır? Eğik düzlemde her zaman kuvvet kazancı olduğunu hatırla.',
      },
    ],
  },

  // 2. MEB Resmi Fen Bilimleri Örnek Soru Denemesi
  {
    id: 'exam-meb-fen-1',
    slug: 'lgs-2027-meb-resmi-fen-denemesi',
    title: '2027 LGS MEB Resmi Fen Bilimleri Örnek Soru Denemesi',
    description: 'MEB ÖDSGM sınav komisyonu tarafından hazırlanmış deney düzenekleri, grafikler ve hipotez testlerinden oluşan 5 soruluk resmi LGS Fen denemesi.',
    type: 'branch',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: 'MEB RESMİ ÖRNEK',
    questions: [
      {
        id: 'meb-fen-q-1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Mevsimler ve İklim',
        questionNumber: 1,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nÖğretmen sınıfta bir el fenerini dik ve eğik açıyla aynı mesafeden termometrelere tutarak sıcaklık artışlarını ölçmüştür.\n\nBu deneyle ilgili yapılan aşağıdaki yorumlardan hangisi KESİNLİKLE DOĞRUDUR?',
        options: {
          A: 'Işık eğik açıyla geldiğinde birim yüzeye düşen enerji miktarı daha fazladır.',
          B: 'Işık dik açıyla geldiğinde aydınlanan alan daha geniştir.',
          C: 'Işık dik açıyla geldiğinde birim yüzeye düşen enerji miktarı fazla olduğu için sıcaklık artışı daha fazladır.',
          D: 'Işığın geliş açısının sıcaklık artışı üzerinde hiçbir etkisi yoktur.',
        },
        correctAnswer: 'C',
        explanation:
          'Resmi MEB Çözümü:\nGüneş ışınları dik (90°) geldiğinde dar bir alana odaklanır ve birim yüzeye aktarılan enerji maksimum olur. Bu nedenle termometredeki sıcaklık artışı eğik açıya göre çok daha yüksektir (Yaz mevsimi mantığı).',
        hintForSocratic: 'Işık dik geldiğinde aydınlanan alan daralır ama birim alana düşen ısı enerjisi ne olur?',
      },
      {
        id: 'meb-fen-q-2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'DNA ve Genetik Kod (Kalıtım)',
        questionNumber: 2,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nMelez döl sarı tohumlu iki bezelyenin (Ss × Ss) çaprazlanması sonucu yeşil tohumlu bezelye (ss) oluşma olasılığı yüzde kaçtır? (Sarı tohum geni yeşil tohuma baskındır)',
        options: {
          A: '%25',
          B: '%50',
          C: '%75',
          D: '%100',
        },
        correctAnswer: 'A',
        explanation:
          'Resmi MEB Çözümü:\n1. Ss × Ss çaprazlaması genotipleri: SS (%25), Ss (%25), Ss (%25), ss (%25).\n2. Yeşil tohum çekinik özellik olduğu için yalnızca "ss" genotipinde ortaya çıkar.\n3. Olasılık: 1/4 yani %25\'tir.',
        hintForSocratic: 'Punnett karesi çiz: Ss ile Ss çaprazlandığında ortaya çıkan 4 olasılıktan kaç tanesi homozigot çekinik (ss) olur?',
      },
      {
        id: 'meb-fen-q-3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Katı, Sıvı ve Gaz Basıncı (Sıvı Basıncı)',
        questionNumber: 3,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nDerinlikleri eşit olan iki farklı kaba sırasıyla su (yoğunluk = 1 g/cm³) ve zeytinyağı (yoğunluk = 0,9 g/cm³) doldurulmuştur.\n\nKap tabanlarındaki sıvı basınçları karşılaştırıldığında su dolu kabın taban basıncının daha büyük olduğu görülmüştür. Bu deneyde kontrol edilen (sabit tutulan) değişken aşağıdakilerden hangisidir?',
        options: {
          A: 'Sıvı yoğunluğu',
          B: 'Sıvı basıncı',
          C: 'Sıvı derinliği (h)',
          D: 'Kabın taban alanı',
        },
        correctAnswer: 'C',
        explanation:
          'Resmi MEB Çözümü:\nKontrol edilen (sabit tutulan) değişken, deney boyunca bilerek eşit bırakılan değişkendir. Soruda "Derinlikleri eşit olan..." dendiği için sabit tutulan değişken sıvı derinliğidir (h). Bağımsız değişken ise sıvı cinsidir (yoğunluk).',
        hintForSocratic: 'Deneyde her iki kapta da özellikle aynı tutulan fiziksel özellik hangisidir?',
      },
      {
        id: 'meb-fen-q-4',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Madde ve Endüstri (Asitler ve Bazlar)',
        questionNumber: 4,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nBir çözeltiye mavi turnusol kâğıdı batırıldığında kâğıdın rengi kırmızıya dönmektedir. Bu çözeltiyle ilgili aşağıdakilerden hangisi DOĞRUDUR?',
        options: {
          A: 'pH değeri 7 ile 14 arasındadır.',
          B: 'Ele kayganlık hissi verir.',
          C: 'Tadı acıdır.',
          D: 'pH değeri 0 ile 7 arasındadır (asidiktir).',
        },
        correctAnswer: 'D',
        explanation:
          'Resmi MEB Çözümü:\nMavi turnusol kâğıdını kırmızıya çeviren maddeler ASİTTİR. Asitlerin pH değeri 0 - 7 arasındadır, tatları ekşidir ve sulu çözeltilerine H+ iyonu verirler.',
        hintForSocratic: 'Turnusol kağıdını kırmızıya çeviren maddenin asit mi baz mı olduğunu ve asitlerin pH aralığını hatırla.',
      },
      {
        id: 'meb-fen-q-5',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Basit Makineler (Makaralar)',
        questionNumber: 5,
        questionText:
          '[MEB Örnek Soru Kalıbı]\nAğırlığı 60 N olan bir yük, 1 adet hareketli makara kullanılarak dengelenmiştir.\n\nSürtünmeler ve makara ağırlığı önemsenmediğine göre, bu yükü dengede tutmak için uygulanması gereken minimum kuvvet kaç Newton\'dur?',
        options: {
          A: '15 N',
          B: '30 N',
          C: '60 N',
          D: '120 N',
        },
        correctAnswer: 'B',
        explanation:
          'Resmi MEB Çözümü:\nHareketli makarada yük iki ip koluna eşit olarak dağılır; bu sayede kuvvetten 2 kat kazanç sağlanır. F = Yük / 2 = 60 / 2 = 30 Newton bulunur.',
        hintForSocratic: 'Hareketli makarada yük kaç ipe paylaştırılır? Kuvvet kazancının 2 kat olduğunu hatırla.',
      },
    ],
  },

  // 3. Fen Bilimleri 1. Ünite: Mevsimler ve İklim Analitik Deneme
  {
    id: 'lgs-fen-unite-1',
    slug: 'lgs-fen-unite-1-mevsimler-ve-iklim',
    title: 'LGS Fen Bilimleri 1. Ünite: Mevsimler ve İklim Analitik Deneme',
    description: 'Eksen eğikliği, ekinoks tarihleri, rüzgâr oluşumu ve iklim-hava olayları ayrımı odaklı 5 soruluk ünite denemesi.',
    type: 'branch',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    questionCount: 5,
    durationMinutes: 10,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '1. ÜNİTE TESTİ',
    questions: [
      {
        id: 'fen-u1-q1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Mevsimlerin Oluşumu',
        questionNumber: 1,
        questionText:
          'Dünya\'da mevsimlerin oluşmasında ve aynı anda farklı yarım kürelerde farklı mevsimlerin yaşanmasında rol oynayan iki temel faktör hangisinde birlikte verilmiştir?',
        options: {
          A: 'Dünya\'nın Güneş\'e olan uzaklığının değişmesi ve Ay\'ın evreleri',
          B: 'Dünya\'nın eksen eğikliği (23° 27\') ve Güneş etrafında dolanma hareketi',
          C: 'Dünya\'nın kendi ekseni etrafında dönmesi ve rüzgâr hareketleri',
          D: 'Ozon tabakasının kalınlığı ve sera gazları',
        },
        correctAnswer: 'B',
        explanation:
          'Mevsimlerin iki ana sebebi vardır: 1) Dünya\'nın dönme ekseninin 23° 27\' eğik olması, 2) Dünya\'nın Güneş etrafında elips yörüngede yıllık dolanma hareketini tamamlaması.',
        hintForSocratic: 'Mevsimlerin sebebi Güneş\'e yaklaşmak DEĞİLDİR; eksen eğikliği ve yıllık harekettir.',
      },
      {
        id: 'fen-u1-q2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Ekinoks Tarihleri',
        questionNumber: 2,
        questionText:
          '21 Mart ve 23 Eylül (Ekinoks) tarihlerinde Dünya genelinde aşağıdakilerden hangisi gerçekleşir?',
        options: {
          A: 'Kuzey Kutup Noktası\'nda 6 ay gece başlar.',
          B: 'Güneş ışınları Ekvator çizgisine öğle vakti 90° dik açıyla düşer ve tüm Dünya\'da 12 saat gece - 12 saat gündüz yaşanır.',
          C: 'Yengeç Dönencesi\'nde en kısa gölge boyu ölçülür.',
          D: 'Güney Yarım Küre\'de en uzun gündüz yaşanır.',
        },
        correctAnswer: 'B',
        explanation:
          'Ekinoks tarihlerinde (21 Mart ve 23 Eylül) Güneş ışınları Ekvator\'a dik düşer. Aydınlanma çemberi kutup noktalarından geçer ve Dünya\'nın her yerinde gece ve gündüz süreleri eşit (12\'şer saat) olur.',
        hintForSocratic: '"Ekinoks" kelimesi gece-gündüz eşitliği anlamına gelir.',
      },
      {
        id: 'fen-u1-q3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'İklim ve Hava Olayları',
        questionNumber: 3,
        questionText:
          'Aşağıda verilen ifadelerden hangisi bir "İklim" özelliğini belirtmektedir?',
        options: {
          A: 'Ankara\'da bugün öğleden sonra şiddetli dolu yağışı bekleniyor.',
          B: 'Karadeniz Bölgesi her mevsim yağışlı ve ılıman bir hava rejimine sahiptir.',
          C: 'İstanbul\'da aniden bastıran sis nedeniyle vapur seferleri iptal edildi.',
          D: 'İzmir\'de yarın hava sıcaklığının 35 dereceye ulaşacağı tahmin ediliyor.',
        },
        correctAnswer: 'B',
        explanation:
          'İklim, geniş bir bölgede uzun yıllar boyunca (30-35 yıl) gözlemlenen hava olaylarının ortalamasıdır ve kesindir. B şıkkı uzun vadeli ve kalıcı bir iklim tanımıdır; diğerleri ise kısa süreli ve değişken hava olaylarıdır.',
        hintForSocratic: 'Geniş bir bölgede onlarca yıllık hava durumunun ortalaması olan seçeneği ara.',
      },
      {
        id: 'fen-u1-q4',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Rüzgâr Oluşumu',
        questionNumber: 4,
        questionText:
          'Alçak basınç alanları ile ilgili aşağıdaki özelliklerden hangisi DOĞRUDUR?',
        options: {
          A: 'Hava soğuk ve yoğundur.',
          B: 'Alçalıcı hava hareketleri görülür.',
          C: 'Hava genellikle sıcak, yükselici hava hareketleri hâkim ve bulutluluk/yağış ihtimali yüksektir.',
          D: 'Hava açıktır ve gökyüzünde hiç bulut bulunmaz.',
        },
        correctAnswer: 'C',
        explanation:
          'Isınan hava genleşir ve hafifleyerek yükselir (yükselici hava hareketi). Zemine uygulanan basınç azalır (alçak basınç). Yükselen hava soğuyarak yoğunlaşır ve bulut ile yağış oluşturma ihtimali artar.',
        hintForSocratic: 'Isınan hava ne yapar? Hafifler ve yükselir. Bu durum bulut oluşturur mu?',
      },
      {
        id: 'fen-u1-q5',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Küresel İklim Değişikliği',
        questionNumber: 5,
        questionText:
          'Atmosferde karbondioksit (CO₂), metan (CH₄) gibi sera gazlarının aşırı artması sonucu Güneş\'ten gelen ısının uzaya geri yansıyamayıp Dünya\'da hapsolmasına ne ad verilir?',
        options: {
          A: 'Sera Etkisi',
          B: 'Ozon Tabakası İncelmesi',
          C: 'Asit Yağmuru',
          D: 'Ekinoks',
        },
        correctAnswer: 'A',
        explanation:
          'Sera gazlarının Güneş ışınlarını tutarak yerkürenin ortalama sıcaklığını artırması olayına "Sera Etkisi" denir. Bu etki küresel ısınmaya ve iklim krizine yol açar.',
        hintForSocratic: 'Isının cam bir fanus gibi yeryüzünde tutulması olayını hatırla.',
      },
    ],
  },

  // 4. Fen Bilimleri 3. Ünite: Basınç Beceri Temelli Deneme
  {
    id: 'lgs-fen-unite-3',
    slug: 'lgs-fen-unite-3-basing',
    title: 'LGS Fen Bilimleri 3. Ünite: Katı, Sıvı ve Gaz Basıncı Beceri Temelli Deneme',
    description: 'Pascal prensibi, sıvı basıncının derinlik/yoğunluk bağıntısı ve açık hava basıncı odaklı 5 soruluk LGS denemesi.',
    type: 'branch',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    questionCount: 5,
    durationMinutes: 12,
    difficulty: 'LGS Düzeyi',
    isPro: false,
    badgeText: '3. ÜNİTE TESTİ',
    questions: [
      {
        id: 'fen-u3-q1',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Sıvı Basıncı',
        questionNumber: 1,
        questionText:
          'Sıvı basıncı ile ilgili;\nI. Sıvının derinliği (h) arttıkça sıvı basıncı artar.\nII. Sıvının yoğunluğu (d) arttıkça sıvı basıncı artar.\nIII. Kabın şekli ve sıvının miktarı sıvı basıncını etkilemez.\n\nYukarıdaki yargılardan hangileri DOĞRUDUR?',
        options: {
          A: 'Yalnız I',
          B: 'I ve II',
          C: 'II ve III',
          D: 'I, II ve III',
        },
        correctAnswer: 'D',
        explanation:
          'Sıvı basıncı formülü: P = h × d × g\'dir. Basınç yalnızca derinliğe (h), yoğunluğa (d) ve yerçekimine (g) bağlıdır. Kabın şekline, genişliğine veya toplam sıvı hacmine bağlı DEĞİLDİR. Bu nedenle üç öncül de kesinlikle doğrudur.',
        hintForSocratic: 'Sıvı basıncının P = h × d olduğunu ve kap biçiminden bağımsız olduğunu hatırla.',
      },
      {
        id: 'fen-u3-q2',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Pascal Prensibi',
        questionNumber: 2,
        questionText:
          '"Kapalı bir kaptaki sıvıya uygulanan basınç, sıvının temas ettiği her noktaya aynen ve dik olarak iletilir."\n\nBu kurala Pascal Prensibi denir. Aşağıdaki teknolojik araçlardan hangisi Pascal prensibi ile ÇALIŞMAZ?',
        options: {
          A: 'Hidrolik fren sistemleri',
          B: 'İtfaiye merdivenleri ve hidrolik liftler',
          C: 'Berber koltukları',
          D: 'Uçakların kanat yapısıyla havalanması',
        },
        correctAnswer: 'D',
        explanation:
          'Uçakların havalanması akışkan hızının basıncı düşürmesi (Bernoulli ilkesi) ile açıklanır. Hidrolik fren, lift ve berber koltuğu ise sıvıların basıncı aynen iletmesi olan Pascal prensibinin en bilinen uygulamalarıdır.',
        hintForSocratic: 'Sıvı (yağ) basıncıyla çalışan hidrolik sistemler ile hava akımı prensibini karşılaştır.',
      },
      {
        id: 'fen-u3-q3',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Açık Hava Basıncı (Toriçelli Deneyi)',
        questionNumber: 3,
        questionText:
          'Toriçelli, deniz seviyesinde ve 0 °C sıcaklıkta cıva kullanarak yaptığı deneyde cam borudaki cıva yüksekliğini 76 cm (760 mmHg) olarak ölçmüştür.\n\nToriçelli bu deneyi deniz seviyesinden yüksek bir dağın tepesinde tekrarlasaydı borudaki cıva yüksekliği (h) nasıl değişirdi?',
        options: {
          A: '76 cm\'den daha büyük olurdu.',
          B: '76 cm\'den daha küçük olurdu (azalırdı).',
          C: 'Değişmez, tam 76 cm kalırdı.',
          D: 'Cıva borudan tamamen boşalırdı.',
        },
        correctAnswer: 'B',
        explanation:
          'Deniz seviyesinden yukarılara çıkıldıkça atmosfer tabakasının kalınlığı ve gaz yoğunluğu azalır; bu nedenle açık hava basıncı düşer. Dış basınç düştüğü için borudaki cıvayı dengede tutan kuvvet azalır ve cıva seviyesi 76 cm\'nin altına iner.',
        hintForSocratic: 'Dağa tırmandıkça açık hava basıncı artar mı azalır mı?',
      },
      {
        id: 'fen-u3-q4',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Katı Basıncı',
        questionNumber: 4,
        questionText:
          'Bıçağın keskin yüzeyi ile bir ekmeği kolayca dilimlerken, tersiyle dilimleyemeyiz.\n\nBu durum katı basıncının hangi özelliği ile açıklanır?',
        options: {
          A: 'Temas yüzey alanı küçüldükçe katı basıncının artması',
          B: 'Bıçağın ağırlığının artması',
          C: 'Ekmeğin yoğunluğunun değişmesi',
          D: 'Sıvı basıncının derinlikle artması',
        },
        correctAnswer: 'A',
        explanation:
          'Katı basıncı P = F / S formülüne dayanır. Bıçağın ucu bilendiğinde temas yüzeyi (S) çok küçülür, uygulanan aynı kuvvet devasa bir basınç üreterek ekmeğin kolayca kesilmesini sağlar.',
        hintForSocratic: 'Keskin tarafın yüzey alanı küçük olduğu için basınca nasıl etki eder?',
      },
      {
        id: 'fen-u3-q5',
        courseKey: 'fen',
        courseName: 'Fen Bilimleri',
        topicName: 'Gaz Basıncı',
        questionNumber: 5,
        questionText:
          'İçi hava dolu bir şırınganın ağzı parmakla kapatılıp pistonu ileri doğru itildiğinde pistonun bir miktar içeri girdiği ancak belirli bir noktadan sonra itilemediği görülür.\n\nBu deney gazların hangi özelliğini kanıtlar?',
        options: {
          A: 'Gazların sıkıştırılamaz olduğunu',
          B: 'Gazların sıkıştırılabilir olduğunu ve hacmi küçüldükçe iç basıncının arttığını',
          C: 'Gazların yer çekiminden etkilenmediğini',
          D: 'Gazların yalnızca aşağı yönde basınç uyguladığını',
        },
        correctAnswer: 'B',
        explanation:
          'Katı ve sıvılar sıkıştırılamazken gaz tanecikleri arasında büyük boşluklar olduğu için gazlar sıkıştırılabilir. Gaz sıkıştıkça birim hacimdeki tanecik sayısı ve çeperlere çarpma sayısı artar, yani gaz basıncı artarak pistonu karşı kuvvetle durdurur.',
        hintForSocratic: 'Gazların sıkışabilme özelliği ve sıkıştıkça basıncın artması kuralını hatırla.',
      },
    ],
  },
];
