export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AiHintHistoryItem = {
  id: string;
  step: number;
  prompt: string;
  hint: string;
  created_at: string;
};

export type Exam = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
};

export type ExamInsert = {
  id?: string;
  name: string;
  slug: string;
  is_active?: boolean;
  created_at?: string;
};

export type ExamUpdate = {
  id?: string;
  name?: string;
  slug?: string;
  is_active?: boolean;
  created_at?: string;
};

export type Course = {
  id: string;
  exam_id: string;
  name: string;
  order_index: number;
  created_at: string;
};

export type CourseInsert = {
  id?: string;
  exam_id: string;
  name: string;
  order_index?: number;
  created_at?: string;
};

export type CourseUpdate = {
  id?: string;
  exam_id?: string;
  name?: string;
  order_index?: number;
  created_at?: string;
};

export type Topic = {
  id: string;
  course_id: string;
  name: string;
  created_at: string;
};

export type TopicInsert = {
  id?: string;
  course_id: string;
  name: string;
  created_at?: string;
};

export type TopicUpdate = {
  id?: string;
  course_id?: string;
  name?: string;
  created_at?: string;
};

export type StudentExam = {
  id: string;
  user_id: string;
  exam_id?: string | null;
  exam_title: string;
  exam_date: string;
  total_score: number | null;
  calculated_percentile: number | null;
  total_correct?: number;
  total_incorrect?: number;
  total_empty?: number;
  total_net?: number;
  courses_json?: Json;
  created_at: string;
};

export type StudentExamInsert = {
  id?: string;
  user_id: string;
  exam_id?: string | null;
  exam_title: string;
  exam_date?: string;
  total_score?: number | null;
  calculated_percentile?: number | null;
  total_correct?: number;
  total_incorrect?: number;
  total_empty?: number;
  total_net?: number;
  courses_json?: Json;
  created_at?: string;
};

export type StudentExamUpdate = {
  id?: string;
  user_id?: string;
  exam_id?: string | null;
  exam_title?: string;
  exam_date?: string;
  total_score?: number | null;
  calculated_percentile?: number | null;
  total_correct?: number;
  total_incorrect?: number;
  total_empty?: number;
  total_net?: number;
  courses_json?: Json;
  created_at?: string;
};

export type ExamResult = {
  id: string;
  student_exam_id: string;
  course_id: string;
  correct_count: number;
  incorrect_count: number;
  empty_count: number;
  net_score: number;
  created_at: string;
};

export type ExamResultInsert = {
  id?: string;
  student_exam_id: string;
  course_id: string;
  correct_count?: number;
  incorrect_count?: number;
  empty_count?: number;
  net_score?: number;
  created_at?: string;
};

export type ExamResultUpdate = {
  id?: string;
  student_exam_id?: string;
  course_id?: string;
  correct_count?: number;
  incorrect_count?: number;
  empty_count?: number;
  net_score?: number;
  created_at?: string;
};

export type WrongQuestion = {
  id: string;
  user_id: string;
  course_key?: string | null;
  course_name?: string | null;
  topic_name?: string | null;
  topic_id?: string | null;
  image_url: string;
  student_note?: string | null;
  ai_hint_history: AiHintHistoryItem[] | Json;
  is_resolved: boolean;
  created_at: string;
};

export type WrongQuestionInsert = {
  id?: string;
  user_id: string;
  course_key?: string | null;
  course_name?: string | null;
  topic_name?: string | null;
  topic_id?: string | null;
  image_url: string;
  student_note?: string | null;
  ai_hint_history?: AiHintHistoryItem[] | Json;
  is_resolved?: boolean;
  created_at?: string;
};

export type WrongQuestionUpdate = {
  id?: string;
  user_id?: string;
  course_key?: string | null;
  course_name?: string | null;
  topic_name?: string | null;
  topic_id?: string | null;
  image_url?: string;
  student_note?: string | null;
  ai_hint_history?: AiHintHistoryItem[] | Json;
  is_resolved?: boolean;
  created_at?: string;
};

export type UserProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  grade_level?: string | null; // '8' | '9'
  target_city?: string | null;
  target_district?: string | null;
  target_high_school: string | null;
  target_score: number | null;
  target_university?: string | null;
  target_department?: string | null;
  is_pro: boolean;
  pro_expires_at: string | null;
  daily_quota_used: number;
  quota_date: string;
  created_at: string;
  updated_at: string;
};

export type UserProfileInsert = {
  id: string;
  email?: string | null;
  display_name?: string | null;
  grade_level?: string | null;
  target_city?: string | null;
  target_district?: string | null;
  target_high_school?: string | null;
  target_score?: number | null;
  target_university?: string | null;
  target_department?: string | null;
  is_pro?: boolean;
  pro_expires_at?: string | null;
  daily_quota_used?: number;
  quota_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type UserProfileUpdate = {
  id?: string;
  email?: string | null;
  display_name?: string | null;
  grade_level?: string | null;
  target_city?: string | null;
  target_district?: string | null;
  target_high_school?: string | null;
  target_score?: number | null;
  target_university?: string | null;
  target_department?: string | null;
  is_pro?: boolean;
  pro_expires_at?: string | null;
  daily_quota_used?: number;
  quota_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      exams: {
        Row: Exam;
        Insert: ExamInsert;
        Update: ExamUpdate;
        Relationships: [];
      };
      courses: {
        Row: Course;
        Insert: CourseInsert;
        Update: CourseUpdate;
        Relationships: [
          {
            foreignKeyName: 'courses_exam_id_fkey';
            columns: ['exam_id'];
            isOneToOne: false;
            referencedRelation: 'exams';
            referencedColumns: ['id'];
          },
        ];
      };
      topics: {
        Row: Topic;
        Insert: TopicInsert;
        Update: TopicUpdate;
        Relationships: [
          {
            foreignKeyName: 'topics_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'courses';
            referencedColumns: ['id'];
          },
        ];
      };
      student_exams: {
        Row: StudentExam;
        Insert: StudentExamInsert;
        Update: StudentExamUpdate;
        Relationships: [
          {
            foreignKeyName: 'student_exams_exam_id_fkey';
            columns: ['exam_id'];
            isOneToOne: false;
            referencedRelation: 'exams';
            referencedColumns: ['id'];
          },
        ];
      };
      exam_results: {
        Row: ExamResult;
        Insert: ExamResultInsert;
        Update: ExamResultUpdate;
        Relationships: [
          {
            foreignKeyName: 'exam_results_student_exam_id_fkey';
            columns: ['student_exam_id'];
            isOneToOne: false;
            referencedRelation: 'student_exams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'exam_results_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'courses';
            referencedColumns: ['id'];
          },
        ];
      };
      wrong_questions: {
        Row: WrongQuestion;
        Insert: WrongQuestionInsert;
        Update: WrongQuestionUpdate;
        Relationships: [
          {
            foreignKeyName: 'wrong_questions_topic_id_fkey';
            columns: ['topic_id'];
            isOneToOne: false;
            referencedRelation: 'topics';
            referencedColumns: ['id'];
          },
        ];
      };
      user_profiles: {
        Row: UserProfile;
        Insert: UserProfileInsert;
        Update: UserProfileUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
