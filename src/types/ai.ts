export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface SolveApiRequest {
  questionImage?: string;
  courseName: string;
  topicName: string;
  studentNote?: string;
  userMessage?: string;
  mode?: 'hint' | 'full_solve';
  tier?: 'lgs' | 'lise1' | 'lise2' | 'lise3' | 'yks';
  gradeLevel?: '8' | '9' | '10' | '11' | '12' | 'mezun';
  scoreType?: 'SAY' | 'EA' | 'SÖZ' | 'DİL' | 'TYT';
  conversationHistory?: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}

export interface SolveApiResponse {
  reply: string;
  message?: string;
  isMock: boolean;
  suggestedAction?: 'continue' | 'resolve';
}

