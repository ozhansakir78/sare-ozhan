import type { LgsCourseKey } from '@/types/exam';
import type { AiHintHistoryItem } from '@/types/database';

export type QuestionStatus = 'unresolved' | 'hinted' | 'resolved';

export type ErrorReason =
  | 'knowledge_gap'      // Bilgi Eksiği (Konuyu tam bilmiyordum)
  | 'carelessness'       // Dikkatsizlik (Soru kökünü yanlış okudum)
  | 'time_pressure'      // Süre Yetmedi (Zaman darlığından acele ettim)
  | 'calculation_error'; // İşlem Hatası (Dört işlemde kaydırdım)

export interface WrongQuestionItem {
  id: string;
  courseKey: string;
  courseName: string;
  topicName: string;
  imageUrl: string;
  studentNote?: string;
  status: QuestionStatus;
  errorReason?: ErrorReason;
  isResolved: boolean;
  createdAt: string;
  aiHintHistory?: AiHintHistoryItem[];
  // Online deneme veya pekiştirme testlerinden aktarılan sorular için:
  isOnlineExamQuestion?: boolean;
  questionText?: string;
  options?: Record<string, string>;
  correctAnswer?: string;
  studentAnswer?: string;
  solutionExplanation?: string;
  examTitle?: string;
  tier?: 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks';
  gradeLevel?: '8' | '9' | '10' | '11' | '12' | 'mezun';
}

export interface QuestionFilterState {
  courseKey: string | 'all';
  status: QuestionStatus | 'all';
  tier?: 'all' | 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks';
  searchQuery?: string;
}

export interface QuestionStats {
  total: number;
  unresolved: number;
  hinted: number;
  resolved: number;
}
