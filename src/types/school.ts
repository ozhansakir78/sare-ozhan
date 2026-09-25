export type HighSchoolType = 'fen' | 'anadolu' | 'sosyal_bilimler';

export interface LgsHighSchool {
  id: string;
  name: string;
  city: string;
  district?: string;
  type: HighSchoolType;
  minScore: number;
  minPercentile: number;
  quota: number;
  badge?: string;
  description?: string;
}

export interface TargetGapAnalysis {
  targetSchool: LgsHighSchool;
  currentScore: number;
  scoreDifference: number;
  progressPercent: number;
  isAchieved: boolean;
  neededNetEquivalent: {
    course: 'matematik' | 'fen' | 'turkce';
    neededNets: number;
  }[];
  smartAdvice: string;
}
