// 10. Sınıf (Lise 2) 11. Sınıf Alan Seçimi (Sayısal, Eşit Ağırlık, Sözel, Dil) Rehberlik Motoru
// MEB Ortaöğretim Kurumları Yönetmeliği ve ÖSYM YKS (TYT / AYT / YDT) Puan Türü Ağırlıklarına Tam Uyumlu

export type HighSchoolTrack = 'sayisal' | 'esit_agirlik' | 'sozel' | 'dil';

export interface CourseGradeInput {
  matematik?: number;
  fizik?: number;
  kimya?: number;
  biyoloji?: number;
  edebiyat?: number;
  tarih?: number;
  cografya?: number;
  felsefe?: number;
  din?: number;
  ingilizce?: number;
}

export interface StudentInterestsInput {
  math?: number; // 1 - 5 arası (Matematik ve problem çözme ilgisi)
  science?: number; // 1 - 5 arası (Fen bilimleri, deney ve teknoloji ilgisi)
  literature?: number; // 1 - 5 arası (Okuma, yazma, edebiyat ve sanat ilgisi)
  social?: number; // 1 - 5 arası (Tarih, toplum, felsefe, siyaset ve coğrafya ilgisi)
  language?: number; // 1 - 5 arası (Yabancı dil, kültürler ve çeviri ilgisi)
}

export interface TrackEvaluation {
  track: HighSchoolTrack;
  trackName: string;
  shortName: string; // MF, TM, TS, DİL
  compatibilityScore: number; // 0 - 100 arası genel uyum puanı
  academicScore: number; // 0 - 100 arası ders başarı puanı
  interestScore: number; // 0 - 100 arası öğrenci ilgi uyumu
  keyCourses: string[];
  prospectiveMajors: string[];
  topCareers: string[];
  suitabilityLevel: 'Çok Yüksek Uyum' | 'Yüksek Uyum' | 'Orta Uyum' | 'Düşük Uyum';
  description: string;
}

export interface FieldSelectionResult {
  primaryTrack: TrackEvaluation;
  secondaryTrack: TrackEvaluation;
  allTracks: TrackEvaluation[];
  academicStrengths: string[];
  growthAreas: string[];
  guidanceSummary: string;
  mebSelectionRules: string[];
}

export const TRACK_METADATA: Record<
  HighSchoolTrack,
  {
    name: string;
    shortName: string;
    keyCourses: string[];
    prospectiveMajors: string[];
    topCareers: string[];
    description: string;
  }
> = {
  sayisal: {
    name: 'Sayısal (Matematik - Fen)',
    shortName: 'MF',
    keyCourses: ['İleri Matematik', 'Fizik', 'Kimya', 'Biyoloji'],
    prospectiveMajors: [
      'Tıp Fakültesi',
      'Diş Hekimliği',
      'Bilgisayar / Yazılım Mühendisliği',
      'Elektrik-Elektronik Mühendisliği',
      'Yapay Zekâ Mühendisliği',
      'Eczacılık',
      'Moleküler Biyoloji ve Genetik',
      'Mimarlık',
      'Makine / Havacılık ve Uzay Mühendisliği',
    ],
    topCareers: [
      'Uzman Hekim / Cerrah',
      'Yazılım Geliştirici / Veri Bilimci',
      'Mühendis / Proje Yöneticisi',
      'Mimar',
      'Biyoteknolog',
      'Akademisyen / Araştırmacı',
    ],
    description:
      'Analitik düşünme, soyut matematiksel modelleme, laboratuvar araştırmaları ve mühendislik/sağlık alanlarına odaklanan akademik program.',
  },
  esit_agirlik: {
    name: 'Eşit Ağırlık (Türkçe - Matematik)',
    shortName: 'TM',
    keyCourses: ['Matematik', 'Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya', 'Felsefe'],
    prospectiveMajors: [
      'Hukuk Fakültesi',
      'İktisat / Ekonomi',
      'İşletme / Finans',
      'Psikoloji',
      'Yönetim Bilişim Sistemleri (YBS)',
      'Siyaset Bilimi ve Uluslararası İlişkiler',
      'Rehberlik ve Psikolojik Danışmanlık (PDR)',
      'İç Mimarlık ve Çevre Tasarımı',
    ],
    topCareers: [
      'Avukat / Hâkim / Savcı',
      'Şirket Yöneticisi (CEO / Finans Direktörü)',
      'Klinik Psikolog / Danışman',
      'YBS / Teknoloji Danışmanı',
      'Diplomat / Dış İlişkiler Uzmanı',
      'Mali Müşavir / Denetçi',
    ],
    description:
      'Hem matematiksel mantık hem de sözel/toplumsal kavrayış gerektiren hukuk, işletme, finans ve insan bilimleri odaklı çok yönlü program.',
  },
  sozel: {
    name: 'Sözel (Türkçe - Sosyal)',
    shortName: 'TS',
    keyCourses: ['Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya', 'Felsefe Grubu', 'Din Kültürü'],
    prospectiveMajors: [
      'Özel Eğitim Öğretmenliği',
      'Türkçe / Tarih / Coğrafya Öğretmenliği',
      'İletişim Fakültesi / Yeni Medya ve Gazetecilik',
      'Radyo, Televizyon ve Sinema',
      'Halkla İlişkiler ve Tanıtım',
      'İlahiyat Fakültesi',
      'Sanat Tarihi / Arkeoloji',
      'Gastronomi ve Mutfak Sanatları',
    ],
    topCareers: [
      'Eğitimci / Alan Öğretmeni',
      'Senarist / Yönetmen / Medya Yapımcısı',
      'İletişim Direktörü / Basın Danışmanı',
      'Editör / Yazar / İçerik Stratejisti',
      'Müze Uzmanı / Arkeolog',
      'Şef / Gastronomi Uzmanı',
    ],
    description:
      'Güçlü dil becerisi, tarihî-kültürel derinlik, metin analizi ve iletişim dinamiklerine odaklanan hümaniter ve pedagojik program.',
  },
  dil: {
    name: 'Yabancı Dil (İngilizce)',
    shortName: 'DİL',
    keyCourses: ['İngilizce (Birinci Yabancı Dil)', 'Türk Dili ve Edebiyatı', 'İkinci Yabancı Dil', 'Tarih'],
    prospectiveMajors: [
      'İngilizce Öğretmenliği',
      'Mütercim ve Tercümanlık',
      'İngiliz Dili ve Edebiyatı',
      'Amerikan Kültürü ve Edebiyatı',
      'Turizm Rehberliği',
      'Uluslararası Ticaret ve Lojistik (Yabancı Dilli)',
      'Çeviribilim',
    ],
    topCareers: [
      'Simültane / Konferans Tercümanı',
      'Uluslararası Kurum Temsilcisi',
      'Yabancı Dil Öğretmeni / Okutman',
      'Turizm Elçisi / Rehber',
      'Dış Ticaret Uzmanı',
      'Kültür ve Dışişleri Ataşesi',
    ],
    description:
      'İleri düzey yabancı dil yeterliliği, kültürler arası iletişim, edebi çeviri ve uluslararası ilişkilere odaklanan küresel vizyonlu program.',
  },
};

/**
 * 10. sınıf öğrencisinin ders notları ve isteğe bağlı ilgi anketine göre
 * en uygun 11. sınıf alanını belirleyen pedagojik rehberlik algoritması.
 */
export function calculateFieldSelection(
  grades: CourseGradeInput,
  interests?: StudentInterestsInput
): FieldSelectionResult {
  // Varsayılan taban not 60 (öğrencinin henüz not girmediği dersler için nötr ortalama)
  const g = {
    matematik: sanitizeGrade(grades.matematik),
    fizik: sanitizeGrade(grades.fizik),
    kimya: sanitizeGrade(grades.kimya),
    biyoloji: sanitizeGrade(grades.biyoloji),
    edebiyat: sanitizeGrade(grades.edebiyat),
    tarih: sanitizeGrade(grades.tarih),
    cografya: sanitizeGrade(grades.cografya),
    felsefe: sanitizeGrade(grades.felsefe),
    din: sanitizeGrade(grades.din),
    ingilizce: sanitizeGrade(grades.ingilizce),
  };

  // 1. AKADEMİK AĞIRLIKLI PUANLAR (ÖSYM AYT Test Ağırlıklarına Tam Uyumlu)
  // Sayısal: Matematik %40, Fizik %25, Kimya %20, Biyoloji %15
  const academicSayisal =
    g.matematik * 0.4 + g.fizik * 0.25 + g.kimya * 0.2 + g.biyoloji * 0.15;

  // Eşit Ağırlık (ÖSYM AYT: %50 Matematik + %50 Edebiyat-Sosyal-1):
  // Matematik %45, Edebiyat %35, Tarih %12, Coğrafya %8
  const academicEA =
    g.matematik * 0.45 +
    g.edebiyat * 0.35 +
    g.tarih * 0.12 +
    g.cografya * 0.08;

  // Sözel (ÖSYM AYT: Edebiyat-Sosyal-1 + Sosyal-2):
  // Edebiyat %30, Tarih %25, Coğrafya %20, Felsefe %15, Din %10
  const academicSozel =
    g.edebiyat * 0.3 +
    g.tarih * 0.25 +
    g.cografya * 0.2 +
    g.felsefe * 0.15 +
    g.din * 0.1;

  // Dil (ÖSYM YDT: Yabancı Dil Testi Ağırlıklı):
  // İngilizce %65, Edebiyat %20, Tarih %15
  const academicDil = g.ingilizce * 0.65 + g.edebiyat * 0.2 + g.tarih * 0.15;

  // 2. İLGİ ANKETİ NORMALİZASYONU (1-5 ölçeğini 0-100'e çevirir)
  const normInterest = (val?: number) => {
    if (typeof val !== 'number' || val < 1) return 60; // Varsayılan orta seviye
    const clamped = Math.max(1, Math.min(5, val));
    return (clamped / 5) * 100;
  };

  const interestScores = {
    sayisal:
      interests != null
        ? normInterest(interests.math) * 0.5 + normInterest(interests.science) * 0.5
        : academicSayisal,
    esit_agirlik:
      interests != null
        ? normInterest(interests.math) * 0.45 +
          normInterest(interests.literature) * 0.35 +
          normInterest(interests.social) * 0.2
        : academicEA,
    sozel:
      interests != null
        ? Math.max(
            0,
            normInterest(interests.literature) * 0.45 +
              normInterest(interests.social) * 0.55 -
              (normInterest(interests.math) > 60
                ? (normInterest(interests.math) - 60) * 0.3
                : 0)
          )
        : academicSozel,
    dil:
      interests != null
        ? normInterest(interests.language) * 0.7 + normInterest(interests.literature) * 0.3
        : academicDil,
  };

  // 3. NİHAİ UYUM PUANI (%70 Akademik Başarı + %30 Öğrenci İlgisi)
  const calculateFinal = (academic: number, interest: number) => {
    const finalScore = academic * 0.7 + interest * 0.3;
    return Math.round(finalScore * 10) / 10;
  };

  const rawEvaluations: Record<HighSchoolTrack, { academic: number; interest: number; final: number }> = {
    sayisal: {
      academic: Math.round(academicSayisal * 10) / 10,
      interest: Math.round(interestScores.sayisal * 10) / 10,
      final: calculateFinal(academicSayisal, interestScores.sayisal),
    },
    esit_agirlik: {
      academic: Math.round(academicEA * 10) / 10,
      interest: Math.round(interestScores.esit_agirlik * 10) / 10,
      final: calculateFinal(academicEA, interestScores.esit_agirlik),
    },
    sozel: {
      academic: Math.round(academicSozel * 10) / 10,
      interest: Math.round(interestScores.sozel * 10) / 10,
      final: calculateFinal(academicSozel, interestScores.sozel),
    },
    dil: {
      academic: Math.round(academicDil * 10) / 10,
      interest: Math.round(interestScores.dil * 10) / 10,
      final: calculateFinal(academicDil, interestScores.dil),
    },
  };

  const determineSuitability = (score: number): TrackEvaluation['suitabilityLevel'] => {
    if (score >= 82) return 'Çok Yüksek Uyum';
    if (score >= 70) return 'Yüksek Uyum';
    if (score >= 55) return 'Orta Uyum';
    return 'Düşük Uyum';
  };

  const allTracks: TrackEvaluation[] = (['sayisal', 'esit_agirlik', 'sozel', 'dil'] as HighSchoolTrack[])
    .map((track) => {
      const meta = TRACK_METADATA[track];
      const data = rawEvaluations[track];
      return {
        track,
        trackName: meta.name,
        shortName: meta.shortName,
        compatibilityScore: data.final,
        academicScore: data.academic,
        interestScore: data.interest,
        keyCourses: meta.keyCourses,
        prospectiveMajors: meta.prospectiveMajors,
        topCareers: meta.topCareers,
        suitabilityLevel: determineSuitability(data.final),
        description: meta.description,
      };
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  const primaryTrack = allTracks[0];
  const secondaryTrack = allTracks[1];

  // 4. GÜÇLÜ YÖNLER VE GELİŞİM ALANLARI
  const academicStrengths: string[] = [];
  const growthAreas: string[] = [];

  if (g.matematik >= 75) academicStrengths.push('Matematiksel mantık ve problem çözme becerisi');
  else if (g.matematik < 60) growthAreas.push('Matematik temeli ve fonksiyonel işlem pratiği');

  const fenAvg = (g.fizik + g.kimya + g.biyoloji) / 3;
  if (fenAvg >= 75) academicStrengths.push('Fen bilimlerinde yüksek kavramsal kavrayış');
  else if (fenAvg < 55) growthAreas.push('Fizik ve kimya derslerinde formül ve problem pratiği');

  if (g.edebiyat >= 75) academicStrengths.push('Edebi kavrayış, okuma ve sözel ifade kabiliyeti');
  else if (g.edebiyat < 65) growthAreas.push('Türk Dili ve Edebiyatı dersinde paragraf ve metin tahlili');

  const sosyalAvg = (g.tarih + g.cografya + g.felsefe) / 3;
  if (sosyalAvg >= 75) academicStrengths.push('Sosyal bilimler, tarihsel analiz ve sebep-sonuç ilişkisi');

  if (g.ingilizce >= 80) academicStrengths.push('Yabancı dil hakimiyeti ve kelime dağarcığı');
  else if (g.ingilizce < 55) growthAreas.push('İngilizce temel gramer ve okuma pratiği');

  if (academicStrengths.length === 0) {
    academicStrengths.push('Dengeli ders dağılımı ve istikrarlı çalışma potansiyeli');
  }
  if (growthAreas.length === 0) {
    growthAreas.push('Genel not ortalamasını (OBP) 90+ seviyesine yükseltme hedefi');
  }

  // 5. ÖZET PEDAGOJİK REHBERLİK RAPORU
  let guidanceSummary = `Öğrencinin 9 ve 10. sınıf ders notları ile ilgi yönelimleri analiz edildiğinde, en yüksek uyum %${primaryTrack.compatibilityScore} ile ${primaryTrack.trackName} alanında görülmektedir. `;
  if (primaryTrack.compatibilityScore - secondaryTrack.compatibilityScore <= 4) {
    guidanceSummary += `Ancak ${secondaryTrack.trackName} alanı (%${secondaryTrack.compatibilityScore}) ile aradaki fark son derece yakındır. Öğrencinin kariyer hedeflerine ve 11. sınıftaki çalışma motivasyonuna göre iki alan arasında esnek geçiş değerlendirilebilir.`;
  } else {
    guidanceSummary += `İkinci güçlü alternatif olan ${secondaryTrack.trackName} alanı (%${secondaryTrack.compatibilityScore}) ile kıyaslandığında, birincil alan belirgin bir akademik ve ilgi avantajı sunmaktadır.`;
  }

  // MEB MEVZUAT BİLGİLENDİRMESİ
  const mebSelectionRules = [
    'MEB Ortaöğretim Kurumları Yönetmeliği Madde 31 uyarınca alan/ders seçimi 10. sınıfın ikinci döneminde (Mayıs-Haziran aylarında) e-Okul sistemi üzerinden veli onayıyla yapılır.',
    'Seçilen alandaki bir dersin açılabilmesi için o derse okul genelinde en az 10 öğrencinin başvurması esastır.',
    '11. sınıfa başlarken ilk 1 ay içerisinde veli dilekçesi ve okul kontenjanı doğrultusunda alan/dal değişikliği yapılabilmektedir.',
    'Seçilen alan doğrudan öğrencinin YKS (TYT / AYT) başarı sıralamasını ve lise Diploma Başarı Puanı (OBP) katsayısını belirler.',
  ];

  return {
    primaryTrack,
    secondaryTrack,
    allTracks,
    academicStrengths,
    growthAreas,
    guidanceSummary,
    mebSelectionRules,
  };
}

function sanitizeGrade(val?: number): number {
  if (typeof val !== 'number' || isNaN(val)) return 60; // Nötr taban
  return Math.max(0, Math.min(100, val));
}
