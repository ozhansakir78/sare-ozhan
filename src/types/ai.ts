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

