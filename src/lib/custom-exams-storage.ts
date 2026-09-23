import type { OnlineExam } from '@/types/online-exam';

const CUSTOM_EXAMS_STORAGE_KEY = 'lgs_custom_exams_v1';

export function getCustomStoredExams(): OnlineExam[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_EXAMS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OnlineExam[]) : [];
  } catch (error) {
    console.error('Özel denemeler yüklenirken hata:', error);
    return [];
  }
}

export function saveCustomExamToStorage(newExam: OnlineExam): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomStoredExams();
    // Varsa güncelle, yoksa başa ekle
    const filtered = current.filter((e) => e.id !== newExam.id && e.slug !== newExam.slug);
    const updated = [newExam, ...filtered];
    localStorage.setItem(CUSTOM_EXAMS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Özel deneme kaydedilirken hata:', error);
  }
}

export function deleteCustomExamFromStorage(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomStoredExams();
    const updated = current.filter((e) => e.id !== id);
    localStorage.setItem(CUSTOM_EXAMS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Özel deneme silinirken hata:', error);
  }
}
