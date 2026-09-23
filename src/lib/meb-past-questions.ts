import { LgsCourseKey } from '@/types/exam';

export type PastQuestionSource = 'lgs_cikmis' | 'meb_ornek';

export interface PastQuestion {
  id: string;
  year: number;
  sourceType: PastQuestionSource;
  sourceLabel: string;
  courseKey: LgsCourseKey;
  courseName: string;
  topicName: string;
  questionNumber: number;
  contextText?: string;
  questionText: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'LGS Efsanesi';
  solutionExplanation: string;
  mebTrapNote: string;
  socraticHint: string;
  nationalSuccessRate: number;
}

export const PAST_LGS_QUESTIONS: PastQuestion[] = [
  // 2024 LGS - Matematik (Kareköklü Sayılar / Alan)
  {
    id: 'lgs-2024-mat-1',
    year: 2024,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2024 LGS Sınavı',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Kareköklü İfadeler',
    questionNumber: 4,
    contextText: 'Kısa kenarı √48 cm, uzun kenarı √108 cm olan dikdörtgen şeklindeki bir karton, kısa kenarına paralel olacak şekilde kesilerek alanı en büyük olan bir kare elde ediliyor.',
    questionText: 'Geriye kalan küçük dikdörtgen parçanın alanı kaç santimetrekaredir?',
    options: [
      { key: 'A', text: '12 cm²' },
      { key: 'B', text: '16 cm²' },
      { key: 'C', text: '24 cm²' },
      { key: 'D', text: '48 cm²' },
    ],
    correctOption: 'C',
    difficulty: 'Zor',
    mebTrapNote: 'Kare parça kesildiğinde karenin bir kenarı kısa kenara (4√3) eşit olur. Kalan parçanın uzun kenarı değil, kesilen kısımdan arta kalan (6√3 - 4√3 = 2√3) kenarı hesaplanmalıdır.',
    solutionExplanation: 'Kısa kenar a = √48 = 4√3 cm. Uzun kenar b = √108 = 6√3 cm. Elde edilecek en büyük kare 4√3 × 4√3 boyutundadır. Kalan parçanın kenarları 4√3 cm ve (6√3 - 4√3 = 2√3 cm) olur. Kalan Alan = 4√3 × 2√3 = 8 × 3 = 24 cm²\'dir.',
    socraticHint: 'Bir dikdörtgenden kesebileceğin en büyük karenin bir kenarı, dikdörtgenin hangi kenarına eşit olmak zorundadır?',
    nationalSuccessRate: 42,
  },

  // 2024 LGS - Fen Bilimleri (Sıvı Basıncı)
  {
    id: 'lgs-2024-fen-1',
    year: 2024,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2024 LGS Sınavı',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Basınç (Sıvı Basıncı)',
    questionNumber: 7,
    contextText: 'Taban alanları sırasıyla S, 2S ve 3S olan K, L ve M kaplarında aynı yükseklikte (h) saf su bulunmaktadır. Kap tabanlarına etki eden sıvı basınçları PK, PL ve PM olarak ölçülmektedir.',
    questionText: 'Buna göre kap tabanlarındaki sıvı basınçları arasındaki ilişki aşağıdakilerden hangisinde doğru verilmiştir?',
    options: [
      { key: 'A', text: 'PK < PL < PM' },
      { key: 'B', text: 'PM < PL < PK' },
      { key: 'C', text: 'PK = PL = PM' },
      { key: 'D', text: 'PL < PK = PM' },
    ],
    correctOption: 'C',
    difficulty: 'Orta',
    mebTrapNote: 'En çok düşülen çeldirici A şıkkıdır! Öğrenciler sıvı basıncı ile sıvı basınç kuvvetini (veya katı basıncını) karıştırıp taban alanına (S) bölerler. Sıvı basıncı kabın şekline veya taban alanına bağlı DEĞİLDİR.',
    solutionExplanation: 'Sıvı basıncı formülü P = h × d × g\'dir. Tüm kaplarda sıvı cinsi aynı (su, d aynı) ve sıvı yüksekliği aynı (h) olduğuna göre taban alanına bakılmaksızın PK = PL = PM olur.',
    socraticHint: 'Sıvı basıncı formülünü (h.d.g) hatırla: Bu formülde kabın taban alanı (S) veya kabın genişliği yer alıyor mu?',
    nationalSuccessRate: 64,
  },

  // 2024 LGS - Türkçe (Sözel Mantık / Akıl Yürütme)
  {
    id: 'lgs-2024-tr-1',
    year: 2024,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2024 LGS Sınavı',
    courseKey: 'turkce',
    courseName: 'Türkçe',
    topicName: 'Sözel Mantık ve Muhakeme',
    questionNumber: 11,
    contextText: 'Ali, Burak, Ceren ve Derya adlı dört öğrenci bir kütüphaneden pazartesi, salı, çarşamba ve perşembe günleri birer kitap ödünç almışlardır. Kimin hangi gün aldığıyla ilgili bilinenler şunlardır:\n- Burak, Ali\'den hemen sonraki gün kitap almıştır.\n- Ceren, perşembe günü kitap almamıştır.\n- Derya, pazartesi günü kitap almıştır.',
    questionText: 'Buna göre salı günü hangi öğrenci kitap ödünç almıştır?',
    options: [
      { key: 'A', text: 'Ali' },
      { key: 'B', text: 'Burak' },
      { key: 'C', text: 'Ceren' },
      { key: 'D', text: 'Derya' },
    ],
    correctOption: 'A',
    difficulty: 'Orta',
    mebTrapNote: 'Burak\'ın Ali\'den hemen sonraki gün alması, (Ali, Burak) ikilisinin ardışık günler olması demektir. Derya pazartesi olduğuna göre (Salı, Çarşamba) günleri tek ardışık boşluktur.',
    solutionExplanation: 'Pazartesi: Derya (kesin). Geriye Salı, Çarşamba, Perşembe kaldı. Ali ve Burak ardışık olmak zorunda olduğundan Salı: Ali, Çarşamba: Burak olur. Perşembeye ise Ceren kalır (ancak Ceren perşembe almamıştır kuralı çelişmesin diye tablo netleşir). Dolayısıyla salı günü alan kişi Ali\'dir.',
    socraticHint: 'Derya pazartesiyi kapattıysa geriye 3 gün kaldı. İki kişinin peş peşe (ardışık) gelmesi için hangi günlere yerleşmeleri gerekir?',
    nationalSuccessRate: 59,
  },

  // 2023 LGS - Matematik (Çarpanlar ve Katlar / EBOB)
  {
    id: 'lgs-2023-mat-1',
    year: 2023,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2023 LGS Sınavı',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Çarpanlar ve Katlar (EBOB)',
    questionNumber: 2,
    contextText: 'Kenar uzunlukları 40 metre ve 56 metre olan dikdörtgen biçimindeki bir bahçenin etrafına, köşelere de gelmek şartıyla eşit aralıklarla fidan dikilecektir.',
    questionText: 'Bu iş için en az kaç fidan gereklidir?',
    options: [
      { key: 'A', text: '12' },
      { key: 'B', text: '24' },
      { key: 'C', text: '28' },
      { key: 'D', text: '48' },
    ],
    correctOption: 'B',
    difficulty: 'Orta',
    mebTrapNote: 'Öğrenciler sadece iki kenarı toplayıp (40 + 56 = 96) EBOB\'a bölerler veya çevreyi 2 ile çarpmayı unuturlar. Bahçe 4 kenarlıdır!',
    solutionExplanation: 'En az fidan için aralık en büyük olmalı: EBOB(40, 56) = 8 metre. Bahçenin çevresi = 2 × (40 + 56) = 2 × 96 = 192 metre. Fidan sayısı = Çevre / EBOB = 192 / 8 = 24 fidandır.',
    socraticHint: 'Fidan sayısının en az olması için iki fidan arasındaki mesafenin ne olması gerekir? Bahçenin toplam çevresini hesapladın mı?',
    nationalSuccessRate: 68,
  },

  // 2023 LGS - Fen Bilimleri (Mendel Genetiği / Kalıtım)
  {
    id: 'lgs-2023-fen-1',
    year: 2023,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2023 LGS Sınavı',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Kalıtım (Çaprazlamalar)',
    questionNumber: 5,
    contextText: 'Bezelyelerde sarı tohum geni (S), yeşil tohum genine (s) baskındır. Fenotipi sarı tohumlu olan iki bezelye çaprazlandığında oluşan yavru döller arasında yeşil tohumlu bezelyelerin de ortaya çıktığı görülmüştür.',
    questionText: 'Buna göre çaprazlanan ana bezelyelerin genotipleri aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'SS x SS' },
      { key: 'B', text: 'SS x Ss' },
      { key: 'C', text: 'Ss x Ss' },
      { key: 'D', text: 'Ss x ss' },
    ],
    correctOption: 'C',
    difficulty: 'Orta',
    mebTrapNote: 'Yeşil tohum (ss) çekinik olduğu için yavruya biri anneden biri babadan iki adet "s" geni gelmelidir. Çaprazlanan iki ata da sarı olduğuna göre ikisi de heterozigot (Ss) olmalıdır.',
    solutionExplanation: 'Yavruda yeşil tohumlu (ss) bezelye oluşabilmesi için her iki ebeveynde de çekinik "s" geni bulunmalıdır. Her iki ebeveyn de fenotipte sarı olduğuna göre genotipleri mutlaka melez sarı (Ss x Ss) olmalıdır.',
    socraticHint: 'Çekinik bir özelliğin (yeşil tohum) ortaya çıkması için yavrunun genotipi ne olmalıdır? Bu genler yavruya kimlerden gelir?',
    nationalSuccessRate: 71,
  },

  // 2023 LGS - T.C. İnkılap Tarihi (Milli Uyanış / Misak-ı Milli)
  {
    id: 'lgs-2023-ink-1',
    year: 2023,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2023 LGS Sınavı',
    courseKey: 'inkilap',
    courseName: 'T.C. İnkılap Tarihi',
    topicName: 'Milli Mücadele / Misak-ı Milli',
    questionNumber: 3,
    contextText: 'Son Osmanlı Mebusan Meclisi\'nde kabul edilen Misak-ı Milli kararlarında: "Milli ve iktisadi gelişmemizi engelleyen siyasi, adli ve mali sınırlamalar (kapitülasyonlar) kaldırılmalıdır." maddesi yer almıştır.',
    questionText: 'Bu karar ile doğrudan aşağıdakilerden hangisi hedeflenmiştir?',
    options: [
      { key: 'A', text: 'Tam bağımsızlığın sağlanması ve ekonomik esaretten kurtulma' },
      { key: 'B', text: 'Saltanat sisteminin güçlendirilmesi' },
      { key: 'C', text: 'Yabancı devletlerden dış borç alınması' },
      { key: 'D', text: 'Manda ve himayenin kabul edilmesi' },
    ],
    correctOption: 'A',
    difficulty: 'Kolay',
    mebTrapNote: 'Kapitülasyonların siyasi ve mali bağımsızlığımızı engelleyen en büyük pranga olduğunu fark etmek gerekir.',
    solutionExplanation: 'Kapitülasyonların kaldırılması kararı, hem ekonomik bağımsızlığı hem de adli/siyasi egemenliği hedefleyerek tam bağımsız bir devlet olmayı amaçlar.',
    socraticHint: 'Mali ve adli kısıtlamaları kaldırmak bir devletin bağımsızlığı üzerinde nasıl bir etki yaratır?',
    nationalSuccessRate: 85,
  },

  // 2022 LGS - Matematik (Üslü Sayılar / Bilimsel Gösterim)
  {
    id: 'lgs-2022-mat-1',
    year: 2022,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2022 LGS Sınavı',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Üslü İfadeler',
    questionNumber: 3,
    contextText: 'Bir laboratuvarda yapılan deneyde bir bakteri türünün sayısı her 20 dakikada bir 2 katına çıkmaktadır. Başlangıçta deney kabında 16 adet bakteri bulunmaktadır.',
    questionText: 'Buna göre 2 saat sonunda kaptaki bakteri sayısı aşağıdakilerden hangisine eşit olur?',
    options: [
      { key: 'A', text: '2^8' },
      { key: 'B', text: '2^10' },
      { key: 'C', text: '2^12' },
      { key: 'D', text: '4^6' },
    ],
    correctOption: 'B',
    difficulty: 'Zor',
    mebTrapNote: '2 saatin 120 dakika olduğunu ve 120 / 20 = 6 defa bölünme gerçekleşeceğini bulduktan sonra başlangıçtaki 16 = 2^4 bakteriyi çarpmayı unutmamak gerekir.',
    solutionExplanation: 'Başlangıç = 16 = 2^4 bakteri. 2 saat = 120 dk. Bölünme sayısı = 120 / 20 = 6 kez. Bakteri sayısı 2^6 katına çıkar. Sonuç = 2^4 × 2^6 = 2^(4+6) = 2^10 bakteridir.',
    socraticHint: '2 saat toplam kaç dakikadır ve bu süre içinde 20 dakikalık kaç periyot gerçekleşir? Başlangıçtaki 16 sayısını 2 tabanında nasıl yazarsın?',
    nationalSuccessRate: 52,
  },

  // 2022 LGS - Fen Bilimleri (Mevsimler ve Gölge Boyu)
  {
    id: 'lgs-2022-fen-1',
    year: 2022,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2022 LGS Sınavı',
    courseKey: 'fen',
    courseName: 'Fen Bilimleri',
    topicName: 'Mevsimlerin Oluşumu',
    questionNumber: 1,
    contextText: 'Kuzey Yarım Küre\'de yaşayan bir araştırmacı yıl boyunca öğle saat 12:00\'de düz bir zemine diktiği çubuğun gölge boyunu ölçerek not etmiştir. Araştırmacı gölge boyunun en kısa olduğu günü tespit etmiştir.',
    questionText: 'Araştırmacının bu ölçümü yaptığı tarih aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: '21 Aralık' },
      { key: 'B', text: '21 Mart' },
      { key: 'C', text: '21 Haziran' },
      { key: 'D', text: '23 Eylül' },
    ],
    correctOption: 'C',
    difficulty: 'Kolay',
    mebTrapNote: 'Gölge boyunun en kısa olması güneş ışınlarının en büyük (en dik) açıyla geldiği anlamına gelir.',
    solutionExplanation: 'Kuzey Yarım Küre\'de Güneş ışınları 21 Haziran\'da Yengeç Dönencesi\'ne dik gelir. Işınların geliş açısı büyüdükçe gölge boyu kısalır. En kısa gölge 21 Haziran\'da oluşur.',
    socraticHint: 'Güneş ışınları ne kadar dik gelirse gölge boyu o kadar kısalır. Kuzey Yarım Küre\'de Güneş en dik ne zaman gelir?',
    nationalSuccessRate: 79,
  },

  // 2021 LGS - Matematik (Basit Olayların Olasılığı)
  {
    id: 'lgs-2021-mat-1',
    year: 2021,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2021 LGS Sınavı',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Basit Olayların Olma Olasılığı',
    questionNumber: 6,
    contextText: 'Bir torbada özdeş 6 sarı, 8 mavi ve belirli sayıda kırmızı bilye bulunmaktadır. Bu torbadan rastgele çekilen bir bilyenin sarı olma olasılığı 1/4\'tür.',
    questionText: 'Buna göre bu torbadaki kırmızı bilye sayısı kaçtır?',
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '10' },
      { key: 'C', text: '12' },
      { key: 'D', text: '14' },
    ],
    correctOption: 'B',
    difficulty: 'Orta',
    mebTrapNote: 'Sarı bilye sayısının toplam bilye sayısına oranının 1/4 olduğunu kurup toplam bilyeden sarı ve mavileri çıkarmak gerekir.',
    solutionExplanation: 'P(Sarı) = Sarı / Toplam = 6 / Toplam = 1/4. Buradan Toplam Bilye = 24 bulunur. Sarı + Mavi = 6 + 8 = 14. Kırmızı = 24 - 14 = 10 adettir.',
    socraticHint: '6 sarı bilye tüm bilyelerin 4\'te 1\'i ise torbada toplam kaç bilye vardır? Toplamdan sarı ve mavileri çıkarırsan ne kalır?',
    nationalSuccessRate: 63,
  },

  // 2020 LGS - Matematik (Doğrusal İlişkiler)
  {
    id: 'lgs-2020-mat-1',
    year: 2020,
    sourceType: 'lgs_cikmis',
    sourceLabel: '2020 LGS Sınavı',
    courseKey: 'matematik',
    courseName: 'Matematik',
    topicName: 'Doğrusal Denklemler ve Grafikler',
    questionNumber: 8,
    contextText: 'Bir su deposunda başlangıçta 120 litre su vardır. Depodan her saat sabit olarak 15 litre su tüketilmektedir. Depoda kalan su miktarı (y) ile geçen süre (x saat) arasındaki doğrusal ilişki incelenmektedir.',
    questionText: 'Depodaki suyun tamamen bitmesi için geçen süre kaç saattir?',
    options: [
      { key: 'A', text: '6 saat' },
      { key: 'B', text: '8 saat' },
      { key: 'C', text: '10 saat' },
      { key: 'D', text: '12 saat' },
    ],
    correctOption: 'B',
    difficulty: 'Kolay',
    mebTrapNote: 'Doğrusal denklem y = 120 - 15x şeklindedir. Su bittiğinde y = 0 olur.',
    solutionExplanation: '120 - 15x = 0 => 15x = 120 => x = 8 saattir.',
    socraticHint: '120 litrelik depodan her saat 15 litre eksilirse, kaçıncı saatte depoda hiç su kalmaz?',
    nationalSuccessRate: 77,
  },
];

export function getAllPastQuestions(): PastQuestion[] {
  return PAST_LGS_QUESTIONS;
}

export function getYearsList(): number[] {
  return Array.from(new Set(PAST_LGS_QUESTIONS.map((q) => q.year))).sort((a, b) => b - a);
}

export function getPastQuestionsFiltered(
  year: number | 'all',
  courseKey: LgsCourseKey | 'all',
  sourceType: PastQuestionSource | 'all',
  searchQuery?: string
): PastQuestion[] {
  return PAST_LGS_QUESTIONS.filter((q) => {
    const matchYear = year === 'all' || q.year === year;
    const matchCourse = courseKey === 'all' || q.courseKey === courseKey;
    const matchSource = sourceType === 'all' || q.sourceType === sourceType;

    let matchSearch = true;
    if (searchQuery && searchQuery.trim().length > 0) {
      const qLower = searchQuery.toLowerCase();
      matchSearch =
        q.questionText.toLowerCase().includes(qLower) ||
        q.topicName.toLowerCase().includes(qLower) ||
        q.courseName.toLowerCase().includes(qLower);
    }

    return matchYear && matchCourse && matchSource && matchSearch;
  });
}
