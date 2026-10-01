/**
 * 🎓 SınavKoçu.ai — YKS TYT (Temel Yeterlilik Testi - 120 Soru) Puan, Sıralama ve Süre Hesaplama Motoru
 *
 * Resmi ÖSYM YKS Kılavuzu & Mevzuat Standartları:
 * 1. Testler ve Soru Sayıları:
 *    - Türkçe: 40 Soru (Sözcük, Cümle, Paragraf, Dil Bilgisi)
 *    - Sosyal Bilimler: 20 Soru (Tarih 5, Coğrafya 5, Felsefe 5, Din Kültürü 5)
 *    - Temel Matematik: 40 Soru (Temel İşlemler, Problemler 30-32, Geometri 8-10)
 *    - Fen Bilimleri: 20 Soru (Fizik 7, Kimya 7, Biyoloji 6)
 *    - Toplam: 120 Soru
 *
 * 2. 4 Yanlış 1 Doğruyu Götürür Kuralı:
 *    - Ham Puan (Net) = Doğru Sayısı - (Yanlış Sayısı / 4)
 *    - Netler negatife inebilir (-10.00 ile +40.00 arası), ancak eksi net korumalı sistemlerde
 *      ham puana taban 0 veya eksi katkı olarak yansıtılır.
 *
 * 3. 0.5 Net Barajı Kuralı (ÖSYM Resmi Şartı):
 *    - Adayların TYT puanının hesaplanabilmesi için Türkçe ve/veya Temel Matematik testlerinin
 *      en az birinden 0.5 veya üzeri ham puan (net) almış olmaları zorunludur.
 *    - Eğer adayın hem Türkçe neti < 0.5 hem Matematik neti < 0.5 ise TYT Puanı HESAPLANAMAZ.
 *
 * 4. Puan Hesaplama Modeli (100 - 500 Ham Puan Skalası):
 *    - Taban Puan: 100.00
 *    - Türkçe Katsayısı: 3.30
 *    - Temel Matematik Katsayısı: 3.30
 *    - Fen Bilimleri Katsayısı: 3.40
 *    - Sosyal Bilimler Katsayısı: 3.40
 *    - Maksimum Ham Puan = 100 + (40 * 3.3) + (40 * 3.3) + (20 * 3.4) + (20 * 3.4) = 500.00 Puan.
 *
 * 5. OBP (Ortaöğretim Başarı Puanı) ve Yerleştirme Puanı (Y-TYT):
 *    - OBP = Lise Mezuniyet Notu (50-100) * 5 (Aralık: 250 - 500)
 *    - Standart OBP Katkısı = OBP * 0.12 (+30.00 ile +60.00 Puan)
 *    - Kırık OBP Katkısı (Önceki yıl yerleşen aday) = OBP * 0.06 (+15.00 ile +30.00 Puan)
 *    - Maksimum Yerleştirme Puanı (Y-TYT) = 500 + 60 = 560.00 Puan.
 *
 * 6. Sınav Süresi ve Hız Analizi:
 *    - Sınav Süresi: 165 Dakika (2 saat 45 dakika)
 *    - Soru başına ortalama süre: 82.5 saniye (1.375 dakika)
 */

export interface TytSubjectInput {
  correct: number;
  incorrect: number;
  empty?: number;
}

export interface YksTytCalculationInput {
  turkce: TytSubjectInput;
  sosyal: TytSubjectInput;
  matematik: TytSubjectInput;
  fen: TytSubjectInput;
  diplomaGrade?: number; // 50 - 100 arası lise mezuniyet diploma notu
  isBrokenObp?: boolean; // Geçen yıl bir programa yerleşip OBP'si kırılan aday (x0.06)
}

export interface TytSubjectResult {
  name: string;
  questionCount: number;
  correct: number;
  incorrect: number;
  empty: number;
  rawNet: number;
  effectiveNet: number;
  coefficient: number;
  scoreContribution: number;
  maxScoreContribution: number;
  idealTimeMinutes: number;
  idealTimePerQuestionSeconds: number;
  performancePercentage: number;
}

export interface YksTytCalculationResult {
  isValid: boolean;
  isEligibleForScore: boolean; // 0.5 net şartını karşılıyor mu?
  eligibilityMessage: string;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalEmpty: number;
  totalNet: number;
  
  // Puanlar
  baseScore: number;
  rawScore: number; // 100 - 500 arası ham puan
  obp: number; // 250 - 500 arası
  obpContribution: number; // +30 ile +60 arası (kırık ise +15 ile +30)
  placementScore: number; // Y-TYT Puanı (100 - 560)
  isBrokenObpApplied: boolean;

  // Sıralama & Yüzdelik Dilim
  estimatedRank: number; // 3.100.000 aday içindeki tahmini başarı sırası
  estimatedPercentile: number; // %0.01 - %99.99
  rankRange: {
    minRank: number;
    maxRank: number;
  };

  // Tercih Barajları & Hakları
  eligibleForAssociateDegree: boolean; // 2 Yıllık Ön Lisans Tercih Edebilir mi?
  eligibleForPmyo: boolean; // Polis Meslek Yüksekokulu Başvurusu (Genellikle 250+ Ham Puan)
  eligibleForBesyo: boolean; // Özel Yetenek / BESYO Başvurusu (Genellikle 150-200+ Ham Puan)

  // Süre ve Hız Analitiği (165 Dakika Modeli)
  totalExamDurationMinutes: number;
  recommendedPacing: {
    turkceMinutes: number;
    matematikMinutes: number;
    fenMinutes: number;
    sosyalMinutes: number;
    reviewMinutes: number; // Turlama / kontrol süresi
  };

  // Zayıf Halka & Koçluk Analizi
  weakestSubject: string;
  strongestSubject: string;
  coachingNotes: string[];

  // Ders Dağılım Detayları
  subjects: {
    turkce: TytSubjectResult;
    sosyal: TytSubjectResult;
    matematik: TytSubjectResult;
    fen: TytSubjectResult;
  };
}

// ============================================================================
// RESMİ KATSAYILAR VE SINAV SABİTLERİ
// ============================================================================

export const TYT_TOTAL_QUESTIONS = 120;
export const TYT_EXAM_DURATION_MINUTES = 165;
export const TYT_BASE_SCORE = 100.0;
export const TOTAL_YKS_CANDIDATES = 3150000; // ÖSYM YKS yıllık ortalama katılımcı

export const TYT_SUBJECT_CONFIG = {
  turkce: {
    name: 'Türkçe',
    questionCount: 40,
    coefficient: 3.3,
    idealTimeMinutes: 48,
  },
  sosyal: {
    name: 'Sosyal Bilimler',
    questionCount: 20,
    coefficient: 3.4,
    idealTimeMinutes: 17,
  },
  matematik: {
    name: 'Temel Matematik',
    questionCount: 40,
    coefficient: 3.3,
    idealTimeMinutes: 58,
  },
  fen: {
    name: 'Fen Bilimleri',
    questionCount: 20,
    coefficient: 3.4,
    idealTimeMinutes: 20,
  },
};

// ============================================================================
// NET HESAPLAMA YARDIMCISI (4 Yanlış 1 Doğru)
// ============================================================================

export function calculateTytSubjectNet(
  input: TytSubjectInput,
  maxQuestions: number,
  allowNegative = false
): { correct: number; incorrect: number; empty: number; rawNet: number; effectiveNet: number } {
  const correct = Math.max(0, Math.min(maxQuestions, Math.floor(Number(input.correct) || 0)));
  const remainingAfterCorrect = maxQuestions - correct;
  const incorrect = Math.max(0, Math.min(remainingAfterCorrect, Math.floor(Number(input.incorrect) || 0)));
  const empty = Math.max(0, maxQuestions - (correct + incorrect));

  const rawNet = Number((correct - incorrect / 4).toFixed(2));
  const effectiveNet = allowNegative ? rawNet : Math.max(0, rawNet);

  return { correct, incorrect, empty, rawNet, effectiveNet };
}

// ============================================================================
// BAŞARI SIRASI VE YÜZDELİK DİLİM KALİBRASYON MODELİ
// ============================================================================

/**
 * ÖSYM YKS TYT Türkiye geneli net yığılma eğrisine göre tahmini başarı sırası ve yüzdelik dilim üretir.
 */
export function estimateTytRankAndPercentile(
  totalNet: number,
  rawScore: number
): { rank: number; minRank: number; maxRank: number; percentile: number } {
  // Tam puan / 120 net senaryosu
  if (totalNet >= 118) {
    return { rank: 50, minRank: 1, maxRank: 150, percentile: 0.01 };
  }
  if (totalNet >= 110) {
    // 110 - 118 net: İlk 2.500
    const ratio = (118 - totalNet) / 8;
    const rank = Math.round(150 + ratio * 2350);
    return { rank, minRank: Math.round(rank * 0.8), maxRank: Math.round(rank * 1.25), percentile: 0.08 };
  }
  if (totalNet >= 100) {
    // 100 - 110 net: 2.500 - 15.000
    const ratio = (110 - totalNet) / 10;
    const rank = Math.round(2500 + ratio * 12500);
    return { rank, minRank: Math.round(rank * 0.85), maxRank: Math.round(rank * 1.2), percentile: 0.45 };
  }
  if (totalNet >= 85) {
    // 85 - 100 net: 15.000 - 65.000
    const ratio = (100 - totalNet) / 15;
    const rank = Math.round(15000 + ratio * 50000);
    return { rank, minRank: Math.round(rank * 0.88), maxRank: Math.round(rank * 1.15), percentile: 1.85 };
  }
  if (totalNet >= 70) {
    // 70 - 85 net: 65.000 - 180.000
    const ratio = (85 - totalNet) / 15;
    const rank = Math.round(65000 + ratio * 115000);
    return { rank, minRank: Math.round(rank * 0.9), maxRank: Math.round(rank * 1.12), percentile: 5.2 };
  }
  if (totalNet >= 55) {
    // 55 - 70 net: 180.000 - 450.000
    const ratio = (70 - totalNet) / 15;
    const rank = Math.round(180000 + ratio * 270000);
    return { rank, minRank: Math.round(rank * 0.92), maxRank: Math.round(rank * 1.1), percentile: 13.5 };
  }
  if (totalNet >= 40) {
    // 40 - 55 net: 450.000 - 950.000
    const ratio = (55 - totalNet) / 15;
    const rank = Math.round(450000 + ratio * 500000);
    return { rank, minRank: Math.round(rank * 0.94), maxRank: Math.round(rank * 1.08), percentile: 28.5 };
  }
  if (totalNet >= 25) {
    // 25 - 40 net: 950.000 - 1.800.000
    const ratio = (40 - totalNet) / 15;
    const rank = Math.round(950000 + ratio * 850000);
    return { rank, minRank: Math.round(rank * 0.95), maxRank: Math.round(rank * 1.06), percentile: 52.0 };
  }
  if (totalNet >= 10) {
    // 10 - 25 net: 1.800.000 - 2.650.000
    const ratio = (25 - totalNet) / 15;
    const rank = Math.round(180000 + ratio * 850000);
    return { rank, minRank: Math.round(rank * 0.96), maxRank: Math.round(rank * 1.05), percentile: 78.0 };
  }

  // < 10 net: 2.650.000 - 3.150.000
  const ratio = Math.max(0, (10 - totalNet) / 10);
  const rank = Math.min(TOTAL_YKS_CANDIDATES, Math.round(2650000 + ratio * 500000));
  const percentile = Number(((rank / TOTAL_YKS_CANDIDATES) * 100).toFixed(2));
  return { rank, minRank: rank - 50000, maxRank: TOTAL_YKS_CANDIDATES, percentile };
}

// ============================================================================
// ANA TYT HESAPLAMA FONKSİYONU
// ============================================================================

export function calculateYksTyt(input: YksTytCalculationInput): YksTytCalculationResult {
  // 1. DERS BAZLI NETLERİN VE KATKILARIN HESAPLANMASI
  const turkceCalc = calculateTytSubjectNet(input.turkce, TYT_SUBJECT_CONFIG.turkce.questionCount);
  const sosyalCalc = calculateTytSubjectNet(input.sosyal, TYT_SUBJECT_CONFIG.sosyal.questionCount);
  const matematikCalc = calculateTytSubjectNet(input.matematik, TYT_SUBJECT_CONFIG.matematik.questionCount);
  const fenCalc = calculateTytSubjectNet(input.fen, TYT_SUBJECT_CONFIG.fen.questionCount);

  const turkceScore = Number((turkceCalc.effectiveNet * TYT_SUBJECT_CONFIG.turkce.coefficient).toFixed(2));
  const sosyalScore = Number((sosyalCalc.effectiveNet * TYT_SUBJECT_CONFIG.sosyal.coefficient).toFixed(2));
  const matematikScore = Number((matematikCalc.effectiveNet * TYT_SUBJECT_CONFIG.matematik.coefficient).toFixed(2));
  const fenScore = Number((fenCalc.effectiveNet * TYT_SUBJECT_CONFIG.fen.coefficient).toFixed(2));

  const subjects: YksTytCalculationResult['subjects'] = {
    turkce: {
      name: TYT_SUBJECT_CONFIG.turkce.name,
      questionCount: TYT_SUBJECT_CONFIG.turkce.questionCount,
      correct: turkceCalc.correct,
      incorrect: turkceCalc.incorrect,
      empty: turkceCalc.empty,
      rawNet: turkceCalc.rawNet,
      effectiveNet: turkceCalc.effectiveNet,
      coefficient: TYT_SUBJECT_CONFIG.turkce.coefficient,
      scoreContribution: turkceScore,
      maxScoreContribution: 40 * TYT_SUBJECT_CONFIG.turkce.coefficient,
      idealTimeMinutes: TYT_SUBJECT_CONFIG.turkce.idealTimeMinutes,
      idealTimePerQuestionSeconds: Math.round((TYT_SUBJECT_CONFIG.turkce.idealTimeMinutes * 60) / 40),
      performancePercentage: Number(((turkceCalc.effectiveNet / 40) * 100).toFixed(1)),
    },
    sosyal: {
      name: TYT_SUBJECT_CONFIG.sosyal.name,
      questionCount: TYT_SUBJECT_CONFIG.sosyal.questionCount,
      correct: sosyalCalc.correct,
      incorrect: sosyalCalc.incorrect,
      empty: sosyalCalc.empty,
      rawNet: sosyalCalc.rawNet,
      effectiveNet: sosyalCalc.effectiveNet,
      coefficient: TYT_SUBJECT_CONFIG.sosyal.coefficient,
      scoreContribution: sosyalScore,
      maxScoreContribution: 20 * TYT_SUBJECT_CONFIG.sosyal.coefficient,
      idealTimeMinutes: TYT_SUBJECT_CONFIG.sosyal.idealTimeMinutes,
      idealTimePerQuestionSeconds: Math.round((TYT_SUBJECT_CONFIG.sosyal.idealTimeMinutes * 60) / 20),
      performancePercentage: Number(((sosyalCalc.effectiveNet / 20) * 100).toFixed(1)),
    },
    matematik: {
      name: TYT_SUBJECT_CONFIG.matematik.name,
      questionCount: TYT_SUBJECT_CONFIG.matematik.questionCount,
      correct: matematikCalc.correct,
      incorrect: matematikCalc.incorrect,
      empty: matematikCalc.empty,
      rawNet: matematikCalc.rawNet,
      effectiveNet: matematikCalc.effectiveNet,
      coefficient: TYT_SUBJECT_CONFIG.matematik.coefficient,
      scoreContribution: matematikScore,
      maxScoreContribution: 40 * TYT_SUBJECT_CONFIG.matematik.coefficient,
      idealTimeMinutes: TYT_SUBJECT_CONFIG.matematik.idealTimeMinutes,
      idealTimePerQuestionSeconds: Math.round((TYT_SUBJECT_CONFIG.matematik.idealTimeMinutes * 60) / 40),
      performancePercentage: Number(((matematikCalc.effectiveNet / 40) * 100).toFixed(1)),
    },
    fen: {
      name: TYT_SUBJECT_CONFIG.fen.name,
      questionCount: TYT_SUBJECT_CONFIG.fen.questionCount,
      correct: fenCalc.correct,
      incorrect: fenCalc.incorrect,
      empty: fenCalc.empty,
      rawNet: fenCalc.rawNet,
      effectiveNet: fenCalc.effectiveNet,
      coefficient: TYT_SUBJECT_CONFIG.fen.coefficient,
      scoreContribution: fenScore,
      maxScoreContribution: 20 * TYT_SUBJECT_CONFIG.fen.coefficient,
      idealTimeMinutes: TYT_SUBJECT_CONFIG.fen.idealTimeMinutes,
      idealTimePerQuestionSeconds: Math.round((TYT_SUBJECT_CONFIG.fen.idealTimeMinutes * 60) / 20),
      performancePercentage: Number(((fenCalc.effectiveNet / 20) * 100).toFixed(1)),
    },
  };

  const totalQuestions = TYT_TOTAL_QUESTIONS;
  const totalCorrect = turkceCalc.correct + sosyalCalc.correct + matematikCalc.correct + fenCalc.correct;
  const totalIncorrect = turkceCalc.incorrect + sosyalCalc.incorrect + matematikCalc.incorrect + fenCalc.incorrect;
  const totalEmpty = turkceCalc.empty + sosyalCalc.empty + matematikCalc.empty + fenCalc.empty;
  const totalNet = Number((turkceCalc.effectiveNet + sosyalCalc.effectiveNet + matematikCalc.effectiveNet + fenCalc.effectiveNet).toFixed(2));

  // 2. 0.5 NET BARAJI KONTROLÜ (ÖSYM Resmi Kuralı)
  // Türkçe ve/veya Temel Matematik'ten en az 0.5 net alınması şarttır.
  const hasMet05Rule = turkceCalc.effectiveNet >= 0.5 || matematikCalc.effectiveNet >= 0.5;

  let isEligibleForScore = true;
  let eligibilityMessage = 'TYT Puanınız ÖSYM 0.5 net şartına uygun olarak hesaplandı.';

  if (!hasMet05Rule && totalNet > 0) {
    isEligibleForScore = false;
    eligibilityMessage = '⚠️ ÖSYM Kılavuzu Kuralı: TYT puanının hesaplanabilmesi için Türkçe ve/veya Temel Matematik testinden en az 0.5 ham puan (net) yapılmış olması zorunludur.';
  } else if (totalCorrect === 0 && totalIncorrect === 0) {
    isEligibleForScore = true;
    eligibilityMessage = 'Net girişi yapılmadı. Taban puan 100.00 üzerinden hesaplanmaktadır.';
  }

  // 3. HAM PUAN HESAPLAMA (100 Taban + Ağırlıklar)
  let rawScore = 0;
  if (!isEligibleForScore) {
    rawScore = 0;
  } else {
    rawScore = Number(Math.min(500, TYT_BASE_SCORE + turkceScore + sosyalScore + matematikScore + fenScore).toFixed(2));
  }

  // 4. OBP VE YERLEŞTİRME PUANI (Y-TYT)
  const diplomaGrade = input.diplomaGrade !== undefined
    ? Math.max(50, Math.min(100, Number(input.diplomaGrade) || 50))
    : 80; // Varsayılan 80 diploma notu

  const obp = Number((diplomaGrade * 5).toFixed(2)); // 250 - 500
  const isBrokenObpApplied = Boolean(input.isBrokenObp);
  const obpMultiplier = isBrokenObpApplied ? 0.06 : 0.12;
  const obpContribution = Number((obp * obpMultiplier).toFixed(2));

  const placementScore = isEligibleForScore
    ? Number((rawScore + obpContribution).toFixed(2))
    : 0;

  // 5. BAŞARI SIRASI VE YÜZDELİK DİLİM
  const rankEstimation = isEligibleForScore
    ? estimateTytRankAndPercentile(totalNet, rawScore)
    : { rank: TOTAL_YKS_CANDIDATES, minRank: TOTAL_YKS_CANDIDATES, maxRank: TOTAL_YKS_CANDIDATES, percentile: 99.99 };

  // 6. TERCİH BARAJ VE HAKLARI
  const eligibleForAssociateDegree = isEligibleForScore && rawScore >= 150;
  const eligibleForPmyo = isEligibleForScore && rawScore >= 250;
  const eligibleForBesyo = isEligibleForScore && rawScore >= 150;

  // 7. SÜRE VE TURLAMA MODELİ
  const reviewMinutes = TYT_EXAM_DURATION_MINUTES - (
    TYT_SUBJECT_CONFIG.turkce.idealTimeMinutes +
    TYT_SUBJECT_CONFIG.matematik.idealTimeMinutes +
    TYT_SUBJECT_CONFIG.fen.idealTimeMinutes +
    TYT_SUBJECT_CONFIG.sosyal.idealTimeMinutes
  ); // 165 - (48 + 58 + 20 + 17) = 165 - 143 = 22 Dakika turlama!

  const recommendedPacing = {
    turkceMinutes: TYT_SUBJECT_CONFIG.turkce.idealTimeMinutes,
    matematikMinutes: TYT_SUBJECT_CONFIG.matematik.idealTimeMinutes,
    fenMinutes: TYT_SUBJECT_CONFIG.fen.idealTimeMinutes,
    sosyalMinutes: TYT_SUBJECT_CONFIG.sosyal.idealTimeMinutes,
    reviewMinutes: Math.max(15, reviewMinutes),
  };

  // 8. KOÇLUK ANALİZİ VE ZAYIF HALKA TESPİTİ
  const subjectList = [
    { key: 'Türkçe', net: turkceCalc.effectiveNet, max: 40, pct: (turkceCalc.effectiveNet / 40) },
    { key: 'Temel Matematik', net: matematikCalc.effectiveNet, max: 40, pct: (matematikCalc.effectiveNet / 40) },
    { key: 'Fen Bilimleri', net: fenCalc.effectiveNet, max: 20, pct: (fenCalc.effectiveNet / 20) },
    { key: 'Sosyal Bilimler', net: sosyalCalc.effectiveNet, max: 20, pct: (sosyalCalc.effectiveNet / 20) },
  ];

  subjectList.sort((a, b) => b.pct - a.pct);
  const strongestSubject = subjectList[0].key;
  const weakestSubject = subjectList[subjectList.length - 1].key;

  const coachingNotes: string[] = [];

  if (totalNet >= 100) {
    coachingNotes.push('🏆 Muazzam bir net performansı! Türkiye geneli ilk 15.000 ve üst sıralarda yer alma potansiyelin çok yüksek. Süre turlama stratejisini koru.');
  } else if (totalNet >= 75) {
    coachingNotes.push('⚡ İyi bir YKS seviyesindesin. Matematik ve Fen alanındaki net artışları seni hızla ilk 50.000 bandına taşıyacaktır.');
  } else if (totalNet >= 50) {
    coachingNotes.push('📈 Dengeli bir temel var. Ancak TYT sınavında zaman yönetimi ve paragraf-problem hızına ağırlık vermelisin.');
  } else {
    coachingNotes.push('🎯 9 ve 10. sınıf temel kavramlarını sağlamlaştırmak için platformumuzdaki konu testleri ve yanlış defterini aktif kullanmalısın.');
  }

  if (turkceCalc.effectiveNet < 25) {
    coachingNotes.push('⚠️ Türkçe neti 25\'in altında kalmış. Sınavın geri kalanına süre yetirebilmek için günlük 20 paragraf sorusu ve dil bilgisi tekrarı şart.');
  }
  if (matematikCalc.effectiveNet < 15) {
    coachingNotes.push('⚠️ Temel Matematikte problem ve temel işlemler rutini kurmalısın. İlk 12 soru kalıbını kaçırmamak puanını hızla sıçratır.');
  }
  if (isBrokenObpApplied) {
    coachingNotes.push('📌 Kırık OBP uygulandı. Geçen yıl yerleştiğin için diploma notu katsayın yarıya (0.06) düştü; bu kaybı ham TYT netlerinle telafi edebilirsin.');
  }

  return {
    isValid: true,
    isEligibleForScore,
    eligibilityMessage,
    totalQuestions,
    totalCorrect,
    totalIncorrect,
    totalEmpty,
    totalNet,
    baseScore: TYT_BASE_SCORE,
    rawScore,
    obp,
    obpContribution,
    placementScore,
    isBrokenObpApplied,
    estimatedRank: rankEstimation.rank,
    estimatedPercentile: rankEstimation.percentile,
    rankRange: {
      minRank: rankEstimation.minRank,
      maxRank: rankEstimation.maxRank,
    },
    eligibleForAssociateDegree,
    eligibleForPmyo,
    eligibleForBesyo,
    totalExamDurationMinutes: TYT_EXAM_DURATION_MINUTES,
    recommendedPacing,
    weakestSubject,
    strongestSubject,
    coachingNotes,
    subjects,
  };
}
