export interface TopicStudyNote {
  topicId: string;
  courseKey: string;
  courseName: string;
  topicName: string;
  lgsFrequency: string; // MEB Yazılı Ağırlığı veya Çıkma Sıklığı
  difficultyLevel: 'Temel' | 'Orta' | 'Belirleyici / Zor';
  summaryBullets: string[]; // 3-5 maddelik hap kurallar & formüller
  formulas?: string[]; // Matematik & Fen için formüller
  mebTraps: string[]; // Sık düşülen tuzaklar & çeldirici uyarıları
  questionStrategy: string; // Soru çözerken strateji
  relatedExamSlug?: string; // Tıklayınca sınavına yönlendirme
  exampleQuestion?: {
    questionText: string;
    solutionSteps: string[];
    keyTakeaway: string;
  };
}
