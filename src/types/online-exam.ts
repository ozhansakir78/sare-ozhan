import type { LgsCourseKey } from '@/types/exam';

export type ExamQuestionOptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface OnlineExamQuestion {
  id: string;
  courseKey: string;
  courseName: string;
  topicName: string;
  questionNumber: number;
  questionText: string;
  questionImageUrl?: string;
  options: Record<'A' | 'B' | 'C' | 'D', string> & { E?: string };
  correctAnswer: ExamQuestionOptionKey;
  explanation: string; // Pedagojik çözüm açıklaması
  hintForSocratic?: string; // Sokratik asistan için ön ipucu
}

export type OnlineExamTier = 'lgs' | 'lise1';

export type OnlineExamType = 'branch' | 'mini' | 'full' | 'yazili' | 'tyt';

export interface OnlineExam {
  id: string;
  slug: string;
  title: string;
  description: string;
  tier?: OnlineExamTier; // 'lgs' | 'lise1' (varsayılan: lgs)
  type: OnlineExamType;
  courseKey?: string; // Branş veya yazılı denemesi ise
  courseName?: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: 'Kolay' | 'Orta' | 'LGS Düzeyi' | 'MEB Yazılı Düzeyi' | 'Zorlayıcı' | 'YKS (TYT) Düzeyi';
  isPro: boolean;
  questions: OnlineExamQuestion[];
  badgeText?: string;
  isCustomGenerated?: boolean; // Kullanıcının oluşturduğu özel sınav
  unitName?: string; // İlgili ünite adı
}

export interface StudentAnswers {
  // questionId -> seçilen şık veya null
  [questionId: string]: ExamQuestionOptionKey | null;
}

export interface QuestionResultDetail {
  question: OnlineExamQuestion;
  studentAnswer: ExamQuestionOptionKey | null;
  isCorrect: boolean;
  isEmpty: boolean;
}

export interface OnlineExamResult {
  examId: string;
  examTitle: string;
  courseKey?: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  emptyCount: number;
  netScore: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  questionDetails: QuestionResultDetail[];
  completedAt: string;
}
