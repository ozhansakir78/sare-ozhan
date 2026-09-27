import type { StudentAnswers, OnlineExamTier } from '@/types/online-exam';

export interface SavedExamProgress {
  examId: string;
  examSlug: string;
  examTitle: string;
  tier: OnlineExamTier;
  courseKey?: string;
  courseName: string;
  answers: StudentAnswers;
  flaggedQuestionIds: string[];
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  durationMinutes: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  savedAt: string; // ISO string
}

const STORAGE_KEY = 'sinavkocu_active_exams_v1';

export function getAllSavedExamProgress(tierFilter?: OnlineExamTier): SavedExamProgress[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as SavedExamProgress[];
    if (tierFilter) {
      return list.filter((item) => (tierFilter === 'lise1' ? item.tier === 'lise1' : !item.tier || item.tier === 'lgs'));
    }
    return list;
  } catch (err) {
    console.error('Error reading saved exam progress:', err);
    return [];
  }
}

export function getSavedExamProgress(examSlug: string): SavedExamProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const list = getAllSavedExamProgress();
    return list.find((item) => item.examSlug === examSlug) || null;
  } catch (err) {
    console.error('Error reading saved exam by slug:', err);
    return null;
  }
}

export function saveExamProgress(progress: SavedExamProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getAllSavedExamProgress();
    const existingIndex = list.findIndex((item) => item.examSlug === progress.examSlug);

    if (existingIndex >= 0) {
      list[existingIndex] = progress;
    } else {
      list.unshift(progress);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('exam_progress_updated'));
  } catch (err) {
    console.error('Error saving exam progress:', err);
  }
}

export function removeSavedExamProgress(examSlug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getAllSavedExamProgress();
    const filtered = list.filter((item) => item.examSlug !== examSlug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('exam_progress_updated'));
  } catch (err) {
    console.error('Error removing saved exam progress:', err);
  }
}

export function clearAllSavedExamProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('exam_progress_updated'));
  } catch (err) {
    console.error('Error clearing saved exams:', err);
  }
}
