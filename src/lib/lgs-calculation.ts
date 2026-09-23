import type {
  LgsCourseKey,
  LgsCourseConfig,
  LgsCourseInput,
  LgsCourseResult,
  LgsCalculationResult,
} from '@/types/exam';

export const LGS_COURSES: readonly LgsCourseConfig[] = [
  {
    key: 'turkce',
    name: 'Türkçe',
    questionCount: 20,
    weight: 4,
  },
  {
    key: 'matematik',
    name: 'Matematik',
    questionCount: 20,
    weight: 4,
  },
  {
    key: 'fen',
    name: 'Fen Bilimleri',
    questionCount: 20,
    weight: 4,
  },
  {
    key: 'inkilap',
    name: 'T.C. İnkılap Tarihi ve Atatürkçülük',
    questionCount: 10,
    weight: 1,
  },
  {
    key: 'din',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    questionCount: 10,
    weight: 1,
  },
  {
    key: 'ingilizce',
    name: 'Yabancı Dil (İngilizce)',
    questionCount: 10,
    weight: 1,
  },
] as const;

export const TOTAL_LGS_QUESTIONS = 90;
export const MAX_WEIGHTED_POINTS = 270; // (20*4) + (20*4) + (20*4) + (10*1) + (10*1) + (10*1)
export const LGS_BASE_SCORE = 100;
export const LGS_MAX_SCORE = 500;

/**
 * MEB kuralına göre tek dersin netini hesaplar: Net = Doğru - (Yanlış / 3)
 * Netler eksiye düşemez (minimum 0).
 */
export function calculateNet(correct: number, incorrect: number): number {
  const safeCorrect = Math.max(0, correct);
  const safeIncorrect = Math.max(0, incorrect);
  const rawNet = safeCorrect - safeIncorrect / 3;
  return Math.max(0, Math.round(rawNet * 100) / 100);
}

/**
 * Standart LGS puanını hesaplar (100 - 500 aralığı).
 * Formül: Taban Puan (100) + (Toplam Ağırlıklı Net * (400 / 270))
 */
export function calculateLgsScore(weightedPoints: number): number {
  if (weightedPoints <= 0) return LGS_BASE_SCORE;
  if (weightedPoints >= MAX_WEIGHTED_POINTS) return LGS_MAX_SCORE;

  const score = LGS_BASE_SCORE + weightedPoints * (400 / MAX_WEIGHTED_POINTS);
  return Math.min(LGS_MAX_SCORE, Math.max(LGS_BASE_SCORE, Math.round(score * 100) / 100));
}

/**
 * MEB geçmiş yıl LGS yığılmalı dağılımlarına dayalı tahmini yüzdelik dilim hesaplayıcısı.
 * Yüksek puanlarda yüzdelik dilim küçülür (en iyi dilim örn. %0.04).
 */
interface PercentileAnchor {
  score: number;
  percentile: number;
}

const PERCENTILE_ANCHORS: readonly PercentileAnchor[] = [
  { score: 500.0, percentile: 0.04 },
  { score: 490.0, percentile: 0.35 },
  { score: 480.0, percentile: 0.95 },
  { score: 460.0, percentile: 2.50 },
  { score: 440.0, percentile: 5.20 },
  { score: 420.0, percentile: 9.10 },
  { score: 400.0, percentile: 14.50 },
  { score: 370.0, percentile: 24.80 },
  { score: 340.0, percentile: 37.00 },
  { score: 300.0, percentile: 52.80 },
  { score: 250.0, percentile: 71.50 },
  { score: 200.0, percentile: 87.50 },
  { score: 150.0, percentile: 96.50 },
  { score: 100.0, percentile: 99.99 },
];

export function calculateEstimatedPercentile(score: number): number {
  if (score >= 500) return 0.04;
  if (score <= 100) return 99.99;

  for (let i = 0; i < PERCENTILE_ANCHORS.length - 1; i++) {
    const high = PERCENTILE_ANCHORS[i];
    const low = PERCENTILE_ANCHORS[i + 1];

    if (score <= high.score && score >= low.score) {
      // Parçalı doğrusal interpolasyon (Piecewise linear interpolation)
      const ratio = (score - low.score) / (high.score - low.score);
      const estimated = low.percentile - ratio * (low.percentile - high.percentile);
      return Math.round(estimated * 100) / 100;
    }
  }

  return 99.99;
}

/**
 * Tüm dersleri hesaplayarak genel LGS sonuç nesnesini döndüren saf fonksiyon.
 */
export function calculateLgsResults(
  inputs: Record<LgsCourseKey, LgsCourseInput>
): LgsCalculationResult {
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalEmpty = 0;
  let totalNet = 0;
  let totalWeightedPoints = 0;

  const coursesResult = {} as Record<LgsCourseKey, LgsCourseResult>;

  for (const config of LGS_COURSES) {
    const input = inputs[config.key] || { correct: 0, incorrect: 0 };
    const safeCorrect = Math.min(config.questionCount, Math.max(0, input.correct));
    const safeIncorrect = Math.min(
      config.questionCount - safeCorrect,
      Math.max(0, input.incorrect)
    );
    const empty = Math.max(0, config.questionCount - (safeCorrect + safeIncorrect));
    const net = calculateNet(safeCorrect, safeIncorrect);
    const lostNet = Math.max(0, Math.round((config.questionCount - net) * 100) / 100);

    totalCorrect += safeCorrect;
    totalIncorrect += safeIncorrect;
    totalEmpty += empty;
    totalNet += net;
    totalWeightedPoints += net * config.weight;

    coursesResult[config.key] = {
      courseKey: config.key,
      courseName: config.name,
      questionCount: config.questionCount,
      weight: config.weight,
      correct: safeCorrect,
      incorrect: safeIncorrect,
      empty,
      net,
      lostNet,
    };
  }

  const roundedTotalNet = Math.round(totalNet * 100) / 100;
  const score = calculateLgsScore(totalWeightedPoints);
  const percentile = calculateEstimatedPercentile(score);

  // En çok net kaybedilen dersi bul (birden fazla kayıp varsa en yüksek ağırlıklı / en çok kayıp olanı seç)
  let highestLossCourse: LgsCourseResult | null = null;
  for (const result of Object.values(coursesResult)) {
    if (result.lostNet > 0) {
      if (
        !highestLossCourse ||
        result.lostNet > highestLossCourse.lostNet ||
        (result.lostNet === highestLossCourse.lostNet && result.weight > highestLossCourse.weight)
      ) {
        highestLossCourse = result;
      }
    }
  }

  return {
    courses: coursesResult,
    totalCorrect,
    totalIncorrect,
    totalEmpty,
    totalNet: roundedTotalNet,
    totalWeightedPoints: Math.round(totalWeightedPoints * 100) / 100,
    score,
    percentile,
    highestLossCourse,
  };
}

/**
 * Boş / başlangıç giriş seti
 */
export function getInitialLgsInputs(): Record<LgsCourseKey, LgsCourseInput> {
  return {
    turkce: { correct: 0, incorrect: 0 },
    matematik: { correct: 0, incorrect: 0 },
    fen: { correct: 0, incorrect: 0 },
    inkilap: { correct: 0, incorrect: 0 },
    din: { correct: 0, incorrect: 0 },
    ingilizce: { correct: 0, incorrect: 0 },
  };
}

/**
 * Örnek gerçekçi öğrenci deneme verisi
 */
export function getSampleLgsInputs(): Record<LgsCourseKey, LgsCourseInput> {
  return {
    turkce: { correct: 18, incorrect: 2 },     // Net: 17.33
    matematik: { correct: 15, incorrect: 3 },  // Net: 14.00 (En çok kayıp)
    fen: { correct: 17, incorrect: 2 },        // Net: 16.33
    inkilap: { correct: 9, incorrect: 1 },     // Net: 8.67
    din: { correct: 10, incorrect: 0 },        // Net: 10.00
    ingilizce: { correct: 9, incorrect: 1 },   // Net: 8.67
  };
}
