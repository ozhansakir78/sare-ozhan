export type LgsCourseKey =
  | 'turkce'
  | 'matematik'
  | 'fen'
  | 'inkilap'
  | 'din'
  | 'ingilizce';

export interface LgsCourseConfig {
  key: LgsCourseKey;
  name: string;
  questionCount: number;
  weight: number;
  iconName?: string;
}

export interface LgsCourseInput {
  correct: number;
  incorrect: number;
}

export interface LgsCourseResult {
  courseKey: LgsCourseKey;
  courseName: string;
  questionCount: number;
  weight: number;
  correct: number;
  incorrect: number;
  empty: number;
  net: number;
  lostNet: number;
}

export interface LgsCalculationResult {
  courses: Record<LgsCourseKey, LgsCourseResult>;
  totalCorrect: number;
  totalIncorrect: number;
  totalEmpty: number;
  totalNet: number;
  totalWeightedPoints: number;
  score: number;
  percentile: number;
  highestLossCourse: LgsCourseResult | null;
}

export interface SavedStudentExam {
  id: string;
  userId?: string;
  tier?: 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks';
  scoreLabel?: string;
  scoreUnit?: string;
  examTitle: string;
  examDate: string;
  totalScore: number;
  calculatedPercentile: number;
  totalNet: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalEmpty: number;
  courses: Record<string, any>;
  createdAt: string;
}

