import { Lise1CourseKey, LISE1_COURSE_OPTIONS } from '@/lib/lise1-topics';

export interface Lise1CourseGradeInput {
  courseKey: string;
  courseName: string;
  weeklyHours: number;
  exam1: number | null;
  exam2: number | null;
  performance1: number | null;
  performance2: number | null;
  isCustom?: boolean;
}

export interface Lise1CourseGradeResult {
  courseKey: string;
  courseName: string;
  weeklyHours: number;
  averageGrade: number | null; // 100 üzerinden tek ders ortalaması (not girilmediyse null)
  weightedGrade: number; // averageGrade * weeklyHours
  hasGrades: boolean;
  isPassing: boolean | null; // Baraj kontrolü: Edebiyat için 70, diğerleri için 50 (not girilmediyse null)
  passingThreshold: number;
  statusNote: string;
  isCustom?: boolean;
}

export type Lise1CertificateStatus =
  | 'takdir'
  | 'tesekkur'
  | 'duz_gecti'
  | 'sorumlu'
  | 'kaldi'
  | 'not_girilmedi';

export interface Lise1CalculationResult {
  courses: Lise1CourseGradeResult[];
  totalWeeklyHours: number;
  activeWeeklyHours: number;
  weightedTotalPoints: number;
  termAverage: number; // Dönem ağırlıklı genel not ortalaması (0 - 100)
  hasAnyGrades: boolean;
  estimatedObp: number; // 4 Yıllık tahmini OBP karşılığı (500 üzerinden)
  yksAdditionalPoints: number; // YKS yerleştirme puanına OBP katkısı (OBP * 0.12)
  certificateStatus: Lise1CertificateStatus;
  certificateLabel: string;
  certificateBadgeColor: string;
  failedCourseCount: number;
  isEdebiyatPassed: boolean;
  notes: string[];
}

export interface SchoolPreset {
  id: string;
  name: string;
  description: string;
  courses: Lise1CourseGradeInput[];
}

export const SCHOOL_PRESETS: Record<string, SchoolPreset> = {
  anadolu: {
    id: 'anadolu',
    name: 'Anadolu Lisesi',
    description: 'MEB 9. Sınıf Standart Anadolu Lisesi (40 Saat)',
    courses: [
      { courseKey: 'edebiyat', courseName: 'Türk Dili ve Edebiyatı', weeklyHours: 5, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'matematik', courseName: 'Matematik (9. Sınıf)', weeklyHours: 6, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'fizik', courseName: 'Fizik (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'kimya', courseName: 'Kimya (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'biyoloji', courseName: 'Biyoloji (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'tarih', courseName: 'Tarih (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'cografya', courseName: 'Coğrafya (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'ingilizce', courseName: 'Birinci Yabancı Dil (İngilizce)', weeklyHours: 4, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'almanca', courseName: 'İkinci Yabancı Dil (Almanca)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'din', courseName: 'Din Kültürü ve Ahlak Bilgisi', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'beden', courseName: 'Beden Eğitimi ve Spor', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'muzik_sanat', courseName: 'Görsel Sanatlar / Müzik', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'saglik', courseName: 'Sağlık Bilgisi ve Trafik Kültürü', weeklyHours: 1, exam1: null, exam2: null, performance1: null, performance2: null },
    ],
  },
  fen: {
    id: 'fen',
    name: 'Fen Lisesi',
    description: 'MEB 9. Sınıf Fen Lisesi Müfredatı',
    courses: [
      { courseKey: 'edebiyat', courseName: 'Türk Dili ve Edebiyatı', weeklyHours: 5, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'matematik', courseName: 'Fen Lisesi Matematik', weeklyHours: 6, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'fizik', courseName: 'Fen Lisesi Fizik', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'kimya', courseName: 'Fen Lisesi Kimya', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'biyoloji', courseName: 'Fen Lisesi Biyoloji', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'bilgisayar', courseName: 'Bilgisayar Bilimi', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'tarih', courseName: 'Tarih (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'cografya', courseName: 'Coğrafya (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'ingilizce', courseName: 'Birinci Yabancı Dil (İngilizce)', weeklyHours: 4, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'almanca', courseName: 'İkinci Yabancı Dil (Almanca)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'din', courseName: 'Din Kültürü ve Ahlak Bilgisi', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'beden', courseName: 'Beden Eğitimi ve Spor', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'saglik', courseName: 'Sağlık Bilgisi ve Trafik Kültürü', weeklyHours: 1, exam1: null, exam2: null, performance1: null, performance2: null },
    ],
  },
  imam_hatip: {
    id: 'imam_hatip',
    name: 'İmam Hatip Lisesi',
    description: 'MEB 9. Sınıf Anadolu İmam Hatip Lisesi',
    courses: [
      { courseKey: 'edebiyat', courseName: 'Türk Dili ve Edebiyatı', weeklyHours: 5, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'matematik', courseName: 'Matematik (9. Sınıf)', weeklyHours: 6, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'kuran', courseName: "Kur'an-ı Kerim", weeklyHours: 4, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'arapca', courseName: 'Mesleki Arapça', weeklyHours: 4, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'fizik', courseName: 'Fizik (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'kimya', courseName: 'Kimya (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'biyoloji', courseName: 'Biyoloji (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'tarih', courseName: 'Tarih (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'cografya', courseName: 'Coğrafya (9. Sınıf)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'ingilizce', courseName: 'Yabancı Dil (İngilizce)', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'temel_dini', courseName: 'Temel Dini Bilgiler', weeklyHours: 1, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'beden', courseName: 'Beden Eğitimi ve Spor', weeklyHours: 2, exam1: null, exam2: null, performance1: null, performance2: null },
      { courseKey: 'saglik', courseName: 'Sağlık Bilgisi ve Trafik Kültürü', weeklyHours: 1, exam1: null, exam2: null, performance1: null, performance2: null },
    ],
  },
};

export const EMPTY_LISE1_GRADES: Lise1CourseGradeInput[] = SCHOOL_PRESETS.anadolu.courses;

// Geriye dönük uyumluluk için: Başlangıçta tüm notlar boştur (null)
export const DEFAULT_LISE1_GRADES: Lise1CourseGradeInput[] = EMPTY_LISE1_GRADES;

/**
 * Tek bir dersin girilen yazılı ve performans notlarından aritmetik ortalamasını hesaplar.
 * Hiçbir not girilmemişse null döndürür.
 */
export function calculateCourseAverage(
  input: Pick<Lise1CourseGradeInput, 'exam1' | 'exam2' | 'performance1' | 'performance2'>
): number | null {
  const scores: number[] = [];
  if (input.exam1 !== null && !isNaN(input.exam1)) scores.push(Math.min(100, Math.max(0, input.exam1)));
  if (input.exam2 !== null && !isNaN(input.exam2)) scores.push(Math.min(100, Math.max(0, input.exam2)));
  if (input.performance1 !== null && !isNaN(input.performance1)) scores.push(Math.min(100, Math.max(0, input.performance1)));
  if (input.performance2 !== null && !isNaN(input.performance2)) scores.push(Math.min(100, Math.max(0, input.performance2)));

  if (scores.length === 0) return null;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / scores.length).toFixed(2));
}

/**
 * 9. Sınıf MEB Yönetmeliğine tam uygun Dönem Notu, Belge ve OBP Hesabı
 */
export function calculateLise1Term(inputs: Lise1CourseGradeInput[]): Lise1CalculationResult {
  let totalWeeklyHours = 0;
  let activeWeeklyHours = 0;
  let weightedTotalPoints = 0;
  let failedCourseCount = 0;
  let isEdebiyatPassed = true;
  let hasAnyGrades = false;
  const notes: string[] = [];

  const courseResults: Lise1CourseGradeResult[] = inputs.map((item) => {
    const avg = calculateCourseAverage(item);
    const hasGrade = avg !== null;
    if (hasGrade) hasAnyGrades = true;

    totalWeeklyHours += item.weeklyHours;

    // MEB Yeni Yönetmelik Kuralı: Türk Dili ve Edebiyatı dersi için baraj 70'tir, diğer dersler için 50'dir.
    const isEdebiyat = item.courseKey === 'edebiyat' || item.courseName.toLowerCase().includes('edebiyat');
    const threshold = isEdebiyat ? 70 : 50;

    let isPassing: boolean | null = null;
    let statusNote = 'Not Girilmedi';
    let weighted = 0;

    if (hasGrade) {
      activeWeeklyHours += item.weeklyHours;
      weighted = Number((avg * item.weeklyHours).toFixed(2));
      weightedTotalPoints += weighted;
      isPassing = avg >= threshold;

      if (!isPassing) {
        failedCourseCount++;
        if (isEdebiyat) {
          isEdebiyatPassed = false;
          notes.push('⚠️ Türk Dili ve Edebiyatı MEB baraj dersidir; dönem puanı 70\'in altında kaldığı için doğrudan belge alınamaz.');
        } else {
          notes.push(`⚠️ ${item.courseName} dersi ortalaması 50\'nin altında kaldı (${avg}).`);
        }
        statusNote = isEdebiyat ? 'Baraj Altında (<70)' : 'Kaldı (<50)';
      } else {
        statusNote = 'Başarılı';
      }
    }

    return {
      courseKey: item.courseKey,
      courseName: item.courseName,
      weeklyHours: item.weeklyHours,
      averageGrade: avg,
      weightedGrade: weighted,
      hasGrades: hasGrade,
      isPassing,
      passingThreshold: threshold,
      statusNote,
      isCustom: item.isCustom,
    };
  });

  const termAverage =
    activeWeeklyHours > 0 ? Number((weightedTotalPoints / activeWeeklyHours).toFixed(2)) : 0;

  // 4 yıllık tahmini OBP: 100 üzerinden ortalama * 5 (500 üzerinden)
  const estimatedObp = Number((termAverage * 5).toFixed(2));
  // YKS yerleştirme puanına OBP katkısı: OBP * 0.12 (Maksimum 60 puan)
  const yksAdditionalPoints = Number((estimatedObp * 0.12).toFixed(2));

  // MEB Belge Durumu Belirleme
  let certificateStatus: Lise1CertificateStatus = 'not_girilmedi';
  let certificateLabel = 'Not Girişi Bekleniyor';
  let certificateBadgeColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

  if (!hasAnyGrades) {
    certificateStatus = 'not_girilmedi';
    certificateLabel = 'Not Girişi Bekleniyor';
    certificateBadgeColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  } else if (termAverage < 50) {
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
  } else {
    certificateStatus = 'duz_gecti';
    certificateLabel = 'Geçti (Düz Sınıf Geçişi)';
    certificateBadgeColor = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
  }

  return {
    courses: courseResults,
    totalWeeklyHours,
    activeWeeklyHours,
    weightedTotalPoints,
    termAverage,
    hasAnyGrades,
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
