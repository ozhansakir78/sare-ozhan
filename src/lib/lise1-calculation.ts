import { Lise1CourseKey, LISE1_COURSE_OPTIONS } from '@/lib/lise1-topics';

export interface Lise1CourseGradeInput {
  courseKey: Lise1CourseKey;
  courseName: string;
  weeklyHours: number;
  exam1: number | null;
  exam2: number | null;
  performance1: number | null;
  performance2: number | null;
}

export interface Lise1CourseGradeResult {
  courseKey: Lise1CourseKey;
  courseName: string;
  weeklyHours: number;
  averageGrade: number; // 100 üzerinden tek ders ortalaması
  weightedGrade: number; // averageGrade * weeklyHours
  isPassing: boolean; // Baraj kontrolü: Edebiyat için 70, diğerleri için 50
  passingThreshold: number;
  statusNote: string;
}

export type Lise1CertificateStatus = 'takdir' | 'tesekkur' | 'duz_gecti' | 'sorumlu' | 'kaldi';

export interface Lise1CalculationResult {
  courses: Lise1CourseGradeResult[];
  totalWeeklyHours: number;
  weightedTotalPoints: number;
  termAverage: number; // Dönem ağırlıklı genel not ortalaması (0 - 100)
  estimatedObp: number; // 4 Yıllık tahmini OBP karşılığı (500 üzerinden)
  yksAdditionalPoints: number; // YKS yerleştirme puanına OBP katkısı (OBP * 0.12)
  certificateStatus: Lise1CertificateStatus;
  certificateLabel: string;
  certificateBadgeColor: string;
  failedCourseCount: number;
  isEdebiyatPassed: boolean;
  notes: string[];
}

export const DEFAULT_LISE1_GRADES: Lise1CourseGradeInput[] = LISE1_COURSE_OPTIONS.map((c) => ({
  courseKey: c.key,
  courseName: c.name,
  weeklyHours: c.weeklyHours,
  exam1: 85,
  exam2: 85,
  performance1: 90,
  performance2: null,
}));

/**
 * Tek bir dersin girilen yazılı ve performans notlarından aritmetik ortalamasını hesaplar
 */
export function calculateCourseAverage(
  input: Pick<Lise1CourseGradeInput, 'exam1' | 'exam2' | 'performance1' | 'performance2'>
): number {
  const scores: number[] = [];
  if (input.exam1 !== null && !isNaN(input.exam1)) scores.push(Math.min(100, Math.max(0, input.exam1)));
  if (input.exam2 !== null && !isNaN(input.exam2)) scores.push(Math.min(100, Math.max(0, input.exam2)));
  if (input.performance1 !== null && !isNaN(input.performance1)) scores.push(Math.min(100, Math.max(0, input.performance1)));
  if (input.performance2 !== null && !isNaN(input.performance2)) scores.push(Math.min(100, Math.max(0, input.performance2)));

  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / scores.length).toFixed(2));
}

/**
 * 9. Sınıf MEB Yönetmeliğine tam uygun Dönem Notu, Belge ve OBP Hesabı
 */
export function calculateLise1Term(inputs: Lise1CourseGradeInput[]): Lise1CalculationResult {
  let totalWeeklyHours = 0;
  let weightedTotalPoints = 0;
  let failedCourseCount = 0;
  let isEdebiyatPassed = true;
  const notes: string[] = [];

  const courseResults: Lise1CourseGradeResult[] = inputs.map((item) => {
    const avg = calculateCourseAverage(item);
    const weighted = Number((avg * item.weeklyHours).toFixed(2));
    totalWeeklyHours += item.weeklyHours;
    weightedTotalPoints += weighted;

    // MEB Yeni Yönetmelik Kuralı: Türk Dili ve Edebiyatı dersi için baraj 70'tir, diğer dersler için 50'dir.
    const isEdebiyat = item.courseKey === 'edebiyat';
    const threshold = isEdebiyat ? 70 : 50;
    const isPassing = avg >= threshold;

    if (!isPassing) {
      failedCourseCount++;
      if (isEdebiyat) {
        isEdebiyatPassed = false;
        notes.push('⚠️ Türk Dili ve Edebiyatı MEB baraj dersidir; dönem puanı 70\'in altında kaldığı için doğrudan belge alınamaz.');
      } else {
        notes.push(`⚠️ ${item.courseName} dersi ortalaması 50\'nin altında kaldı (${avg}).`);
      }
    }

    return {
      courseKey: item.courseKey,
      courseName: item.courseName,
      weeklyHours: item.weeklyHours,
      averageGrade: avg,
      weightedGrade: weighted,
      isPassing,
      passingThreshold: threshold,
      statusNote: isPassing ? 'Başarılı' : isEdebiyat ? 'Baraj Altında (<70)' : 'Kaldı (<50)',
    };
  });

  const termAverage =
    totalWeeklyHours > 0 ? Number((weightedTotalPoints / totalWeeklyHours).toFixed(2)) : 0;

  // 4 yıllık tahmini OBP: 100 üzerinden ortalama * 5 (500 üzerinden)
  const estimatedObp = Number((termAverage * 5).toFixed(2));
  // YKS yerleştirme puanına OBP katkısı: OBP * 0.12 (Maksimum 60 puan)
  const yksAdditionalPoints = Number((estimatedObp * 0.12).toFixed(2));

  // MEB Belge Durumu Belirleme
  let certificateStatus: Lise1CertificateStatus = 'duz_gecti';
  let certificateLabel = 'Geçti (Düz Sınıf Geçişi)';
  let certificateBadgeColor = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';

  if (termAverage < 50) {
    certificateStatus = 'kaldi';
    certificateLabel = 'Sınıf Tekrarı / Başarısız';
    certificateBadgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
  } else if (!isEdebiyatPassed || failedCourseCount > 0) {
    certificateStatus = 'sorumlu';
    certificateLabel = isEdebiyatPassed
      ? 'Sorumlu Olarak Geçti (Zayıf Ders Var)'
      : 'Edebiyat Barajı Aşılamadı (Belgesiz Geçiş)';
    certificateBadgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
  } else if (termAverage >= 85) {
    certificateStatus = 'takdir';
    certificateLabel = '🎖️ Takdir Belgesi';
    certificateBadgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
  } else if (termAverage >= 70) {
    certificateStatus = 'tesekkur';
    certificateLabel = '📜 Teşekkür Belgesi';
    certificateBadgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
  }

  return {
    courses: courseResults,
    totalWeeklyHours,
    weightedTotalPoints,
    termAverage,
    estimatedObp,
    yksAdditionalPoints,
    certificateStatus,
    certificateLabel,
    certificateBadgeColor,
    failedCourseCount,
    isEdebiyatPassed,
    notes,
  };
}
