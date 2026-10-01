import type { OnlineExamTier } from '@/types/online-exam';

export interface ExamScoreCalculationResult {
  tier: OnlineExamTier;
  netScore: number;
  calculatedScore: number;
  scoreLabel: string;
  scoreUnit: string;
  scoreDisplay: string;
  ruleExplanation: string;
  targetLabel: string;
  gradeBadge?: string;
  percentile?: number;
  isPassingGrade?: boolean;
}

/**
 * Sınav başlığı, branş kodu ve sınav tipine göre kademeyi güvenle tespit eder
 */
export function resolveExamTier(exam: {
  tier?: string;
  type?: string;
  title?: string;
  courseKey?: string;
}): OnlineExamTier {
  if (exam.tier && ['lgs', 'lise1', 'lise2', 'lise3', 'yks'].includes(exam.tier)) {
    return exam.tier as OnlineExamTier;
  }
  const title = (exam.title || '').toLowerCase();
  const course = (exam.courseKey || '').toLowerCase();
  const type = (exam.type || '').toLowerCase();

  if (
    title.includes('yks') ||
    title.includes('tyt') ||
    title.includes('ayt') ||
    type === 'tyt' ||
    type === 'ayt' ||
    type === 'ydt'
  ) {
    return 'yks';
  }
  if (title.includes('11. sınıf') || title.includes('lise 3')) {
    return 'lise3';
  }
  if (title.includes('10. sınıf') || title.includes('lise 2')) {
    return 'lise2';
  }
  if (
    title.includes('9. sınıf') ||
    title.includes('lise 1') ||
    type === 'yazili' ||
    [
      'edebiyat',
      'turk_dili',
      'fizik',
      'kimya',
      'biyoloji',
      'tarih',
      'cografya',
      'felsefe',
      'almanca',
      'saglik',
    ].includes(course)
  ) {
    return 'lise1';
  }
  return 'lgs';
}

/**
 * Kademeye göre sınav neti hesaplar:
 * - Lise (9, 10, 11): MEB Ortak Yazılı Sınavı -> Yanlış doğruyu GÖTÜRMEZ! (net = doğru)
 * - YKS (12): ÖSYM Sınavı -> Her 4 Yanlış 1 Doğruyu Götürür!
 * - LGS (8): MEB LGS Sınavı -> Her 3 Yanlış 1 Doğruyu Götürür!
 */
export function calculateNetScoreByTier(
  tier: OnlineExamTier,
  correctCount: number,
  incorrectCount: number
): number {
  if (tier === 'lise1' || tier === 'lise2' || tier === 'lise3') {
    return correctCount;
  }
  if (tier === 'yks') {
    return Math.max(0, Number((correctCount - incorrectCount / 4).toFixed(2)));
  }
  return Math.max(0, Number((correctCount - incorrectCount / 3).toFixed(2)));
}

/**
 * Kademeye göre ders bazlı net hesaplar (calculateNetScoreByTier ile aynıdır)
 */
export const calculateCourseNetByTier = calculateNetScoreByTier;

/**
 * Kademeye uygun resmi puan, etiket, birim ve MEB/ÖSYM yönergesi üretir
 */
export function computeTierExamScore(params: {
  tier: OnlineExamTier;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  emptyCount: number;
  courseKey?: string;
}): ExamScoreCalculationResult {
  const { tier, totalQuestions, correctCount, incorrectCount, emptyCount, courseKey } = params;
  const safeTotal = Math.max(1, totalQuestions);

  if (tier === 'lise1' || tier === 'lise2' || tier === 'lise3') {
    // MEB Ortak Yazılı Sınavı: Yanlış doğruyu götürmez, 100 tam puan üzerinden not
    const netScore = correctCount;
    const scoreOutOf100 = Math.round((correctCount / safeTotal) * 100);

    // Maarif Modeli Baremi
    let gradeBadge = 'Geçer (2)';
    if (scoreOutOf100 >= 85) gradeBadge = 'Pekiyi (5)';
    else if (scoreOutOf100 >= 70) gradeBadge = 'İyi (4)';
    else if (scoreOutOf100 >= 60) gradeBadge = 'Orta (3)';
    else if (scoreOutOf100 >= 50) gradeBadge = 'Geçer (2)';
    else gradeBadge = 'Kaldı (1)';

    const isEdebiyat = courseKey === 'edebiyat' || courseKey === 'turk_dili';
    const isPassingGrade = isEdebiyat ? scoreOutOf100 >= 70 : scoreOutOf100 >= 50;

    return {
      tier,
      netScore,
      calculatedScore: scoreOutOf100,
      scoreLabel: 'MEB Yazılı Sınav Notu',
      scoreUnit: '/ 100',
      scoreDisplay: `${scoreOutOf100} / 100 (${gradeBadge})`,
      ruleExplanation:
        'MEB Maarif Modeli yazılı sınav yönergesine göre yanlışlar doğruyu götürmez; notunuz 100 tam puan üzerinden değerlendirildi.',
      targetLabel: 'Hedef Üniversite / Bölüm',
      gradeBadge,
      isPassingGrade,
    };
  }

  if (tier === 'yks') {
    // ÖSYM TYT / AYT: 4 Yanlış 1 Doğruyu Götürür (100 - 500 Ölçeği)
    const netScore = Math.max(0, Number((correctCount - incorrectCount / 4).toFixed(2)));
    const calculatedScore = Math.round(100 + (netScore / safeTotal) * 400);

    return {
      tier,
      netScore,
      calculatedScore,
      scoreLabel: 'Tahmini YKS (TYT) Puanı',
      scoreUnit: 'Puan',
      scoreDisplay: `${calculatedScore} Puan`,
      ruleExplanation: 'ÖSYM standartlarına göre her 4 yanlış 1 doğruyu götürerek netiniz hesaplandı.',
      targetLabel: 'Hedef Üniversite & Bölüm',
      percentile: Math.max(0.1, Number((100 - (netScore / safeTotal) * 99).toFixed(2))),
    };
  }

  // Varsayılan: 8. Sınıf LGS: 3 Yanlış 1 Doğruyu Götürür (200 - 500 Ölçeği)
  const netScore = Math.max(0, Number((correctCount - incorrectCount / 3).toFixed(2)));
  const calculatedScore = Math.round(200 + (netScore / safeTotal) * 300);

  return {
    tier: 'lgs',
    netScore,
    calculatedScore,
    scoreLabel: 'Tahmini LGS Puanı',
    scoreUnit: 'Puan',
    scoreDisplay: `${calculatedScore} Puan`,
    ruleExplanation: 'MEB standartlarına göre her 3 yanlış 1 doğruyu götürerek netiniz hesaplandı.',
    targetLabel: 'Hedef Lise',
    percentile: Math.max(0.2, Number((100 - (netScore / safeTotal) * 98).toFixed(2))),
  };
}
