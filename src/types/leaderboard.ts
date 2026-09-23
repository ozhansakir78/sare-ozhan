export interface LeaderboardEntry {
  id: string;
  nickname: string;
  examTitle: string;
  examSlug: string;
  score: number;
  totalNet: number;
  correctCount: number;
  wrongCount: number;
  city?: string;
  targetSchool?: string;
  createdAt: string;
  isCurrentUser?: boolean;
}
