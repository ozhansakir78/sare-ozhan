import type { SavedStudentExam, LgsCalculationResult } from '@/types/exam';
export type { SavedStudentExam };
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const EXAM_STORAGE_KEY = 'lgs_saved_exams_v1';

// Örnek / mock veri artık yüklenmez. Gerçek kullanıcılar sıfır veriden başlar.
export const SAMPLE_EXAMS: SavedStudentExam[] = [];

export function getStoredExams(): SavedStudentExam[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SavedStudentExam[];
    // Varsa eski mock/örnek sınavları temizle
    const clean = parsed.filter(
      (e) => !e.id?.startsWith('sample-') && !['Özdebir Türkiye Geneli LGS-1', 'TÖDER LGS Genel Deneme Sınavı', 'Okul Sonu Değerlendirme Denemesi'].includes(e.examTitle)
    );
    if (clean.length !== parsed.length) {
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(clean));
    }
    return clean.sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime());
  } catch {
    return [];
  }
}

export function clearAllStoredExams(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(EXAM_STORAGE_KEY);
  } catch {}
}

export function saveExamToStorage(
  examTitle: string,
  examDate: string,
  calcResult: LgsCalculationResult,
  userId?: string
): SavedStudentExam {
  const current = getStoredExams();
  const newItem: SavedStudentExam = {
    id: 'exam_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    userId,
    examTitle: examTitle.trim() || `Deneme ${current.length + 1}`,
    examDate: examDate || new Date().toISOString().split('T')[0],
    totalScore: calcResult.score,
    calculatedPercentile: calcResult.percentile,
    totalNet: calcResult.totalNet,
    totalCorrect: calcResult.totalCorrect,
    totalIncorrect: calcResult.totalIncorrect,
    totalEmpty: calcResult.totalEmpty,
    courses: calcResult.courses,
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Deneme kaydetme hatası:', e);
    }
  }

  return newItem;
}

export function saveStudentExamToStorage(
  examData: Omit<SavedStudentExam, 'id' | 'createdAt'>
): SavedStudentExam {
  const current = getStoredExams();
  const newItem: SavedStudentExam = {
    ...examData,
    id: 'exam_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Deneme kaydetme hatası:', e);
    }
  }

  return newItem;
}

export function deleteStoredExam(id: string): SavedStudentExam[] {
  const current = getStoredExams();
  const updated = current.filter((item) => item.id !== id);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Deneme silme hatası:', e);
    }
  }

  return updated;
}

export interface ExamTrends {
  totalCount: number;
  highestScore: number;
  lowestScore: number;
  averageScore: number;
  latestScore: number;
  scoreChange: number; // son deneme ile ilk deneme farkı
  latestNet: number;
  averageNet: number;
  bestCourse: string;
}

export function calculateExamTrends(exams: SavedStudentExam[]): ExamTrends {
  if (exams.length === 0) {
    return {
      totalCount: 0,
      highestScore: 0,
      lowestScore: 0,
      averageScore: 0,
      latestScore: 0,
      scoreChange: 0,
      latestNet: 0,
      averageNet: 0,
      bestCourse: '-',
    };
  }

  const sortedByDate = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  let highestScore = exams[0].totalScore;
  let lowestScore = exams[0].totalScore;
  let sumScore = 0;
  let sumNet = 0;

  for (const exam of exams) {
    if (exam.totalScore > highestScore) highestScore = exam.totalScore;
    if (exam.totalScore < lowestScore) lowestScore = exam.totalScore;
    sumScore += exam.totalScore;
    sumNet += exam.totalNet;
  }

  const latestExam = sortedByDate[sortedByDate.length - 1];
  const firstExam = sortedByDate[0];
  const scoreChange = Number((latestExam.totalScore - firstExam.totalScore).toFixed(2));

  return {
    totalCount: exams.length,
    highestScore: Number(highestScore.toFixed(2)),
    lowestScore: Number(lowestScore.toFixed(2)),
    averageScore: Number((sumScore / exams.length).toFixed(2)),
    latestScore: Number(latestExam.totalScore.toFixed(2)),
    scoreChange,
    latestNet: Number(latestExam.totalNet.toFixed(2)),
    averageNet: Number((sumNet / exams.length).toFixed(2)),
    bestCourse: 'Türkçe',
  };
}
