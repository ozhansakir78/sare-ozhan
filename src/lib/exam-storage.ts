import type { SavedStudentExam, LgsCalculationResult } from '@/types/exam';
export type { SavedStudentExam };
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const EXAM_STORAGE_KEY = 'lgs_saved_exams_v1';

// Başlangıçta boş kalmaması için örnek eğitici deneme verileri
const SAMPLE_EXAMS: SavedStudentExam[] = [
  {
    id: 'sample-exam-1',
    examTitle: 'Özdebir Türkiye Geneli LGS-1',
    examDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
    totalScore: 412.45,
    calculatedPercentile: 7.2,
    totalNet: 72.33,
    totalCorrect: 76,
    totalIncorrect: 11,
    totalEmpty: 3,
    courses: {
      turkce: { courseKey: 'turkce', courseName: 'Türkçe', questionCount: 20, weight: 4, correct: 18, incorrect: 2, empty: 0, net: 17.33, lostNet: 2.67 },
      matematik: { courseKey: 'matematik', courseName: 'Matematik', questionCount: 20, weight: 4, correct: 14, incorrect: 4, empty: 2, net: 12.67, lostNet: 7.33 },
      fen: { courseKey: 'fen', courseName: 'Fen Bilimleri', questionCount: 20, weight: 4, correct: 17, incorrect: 2, empty: 1, net: 16.33, lostNet: 3.67 },
      inkilap: { courseKey: 'inkilap', courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
      din: { courseKey: 'din', courseName: 'Din Kültürü ve Ahlak Bilgisi', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
      ingilizce: { courseKey: 'ingilizce', courseName: 'Yabancı Dil (İngilizce)', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'sample-exam-2',
    examTitle: 'TÖDER LGS Genel Deneme Sınavı',
    examDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0],
    totalScore: 438.12,
    calculatedPercentile: 4.5,
    totalNet: 78.0,
    totalCorrect: 81,
    totalIncorrect: 9,
    totalEmpty: 0,
    courses: {
      turkce: { courseKey: 'turkce', courseName: 'Türkçe', questionCount: 20, weight: 4, correct: 19, incorrect: 1, empty: 0, net: 18.67, lostNet: 1.33 },
      matematik: { courseKey: 'matematik', courseName: 'Matematik', questionCount: 20, weight: 4, correct: 16, incorrect: 4, empty: 0, net: 14.67, lostNet: 5.33 },
      fen: { courseKey: 'fen', courseName: 'Fen Bilimleri', questionCount: 20, weight: 4, correct: 18, incorrect: 2, empty: 0, net: 17.33, lostNet: 2.67 },
      inkilap: { courseKey: 'inkilap', courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük', questionCount: 10, weight: 1, correct: 10, incorrect: 0, empty: 0, net: 10.0, lostNet: 0 },
      din: { courseKey: 'din', courseName: 'Din Kültürü ve Ahlak Bilgisi', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
      ingilizce: { courseKey: 'ingilizce', courseName: 'Yabancı Dil (İngilizce)', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: 'sample-exam-3',
    examTitle: 'Okul Sonu Değerlendirme Denemesi',
    examDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0],
    totalScore: 456.80,
    calculatedPercentile: 2.8,
    totalNet: 82.67,
    totalCorrect: 85,
    totalIncorrect: 7,
    totalEmpty: 0,
    courses: {
      turkce: { courseKey: 'turkce', courseName: 'Türkçe', questionCount: 20, weight: 4, correct: 20, incorrect: 0, empty: 0, net: 20.0, lostNet: 0 },
      matematik: { courseKey: 'matematik', courseName: 'Matematik', questionCount: 20, weight: 4, correct: 17, incorrect: 3, empty: 0, net: 16.0, lostNet: 4.0 },
      fen: { courseKey: 'fen', courseName: 'Fen Bilimleri', questionCount: 20, weight: 4, correct: 19, incorrect: 1, empty: 0, net: 18.67, lostNet: 1.33 },
      inkilap: { courseKey: 'inkilap', courseName: 'T.C. İnkılap Tarihi ve Atatürkçülük', questionCount: 10, weight: 1, correct: 10, incorrect: 0, empty: 0, net: 10.0, lostNet: 0 },
      din: { courseKey: 'din', courseName: 'Din Kültürü ve Ahlak Bilgisi', questionCount: 10, weight: 1, correct: 10, incorrect: 0, empty: 0, net: 10.0, lostNet: 0 },
      ingilizce: { courseKey: 'ingilizce', courseName: 'Yabancı Dil (İngilizce)', questionCount: 10, weight: 1, correct: 9, incorrect: 1, empty: 0, net: 8.67, lostNet: 1.33 },
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

export function getStoredExams(): SavedStudentExam[] {
  if (typeof window === 'undefined') return SAMPLE_EXAMS;
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(SAMPLE_EXAMS));
      return SAMPLE_EXAMS;
    }
    const parsed = JSON.parse(raw) as SavedStudentExam[];
    return parsed.sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime());
  } catch {
    return SAMPLE_EXAMS;
  }
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
