-- ==============================================================================
-- SINAV KOÇLUĞU & SORU ANALİTİĞİ PLATFORMU (LGS / YKS / KPSS)
-- Supabase PostgreSQL Eksiksiz Veritabanı & Storage Şeması
-- ==============================================================================

-- 1. Gerekli Eklentiler
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLOLAR
-- ==============================================================================

-- 2.1 user_profiles (Kullanıcı Profil ve Abonelik Durumu)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    target_high_school TEXT DEFAULT 'Kabataş Erkek Lisesi',
    target_score NUMERIC(6, 2) DEFAULT 485.00,
    is_pro BOOLEAN NOT NULL DEFAULT false,
    pro_expires_at TIMESTAMPTZ,
    daily_quota_used INTEGER NOT NULL DEFAULT 0,
    quota_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.2 exams (Sınav Türleri Tablosu: LGS, YKS, KPSS vb. Modüler Mimari)
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 courses (Sınava Bağlı Dersler: Türkçe, Matematik, Fen vb.)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4 topics (Derslere Bağlı Konular)
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.5 student_exams (Öğrencinin Girdiği Denemeler)
CREATE TABLE IF NOT EXISTS public.student_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exam_id UUID REFERENCES public.exams(id) ON DELETE SET NULL,
    exam_title VARCHAR(255) NOT NULL,
    exam_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_score NUMERIC(6, 2) DEFAULT 0.00,
    calculated_percentile NUMERIC(5, 2),
    total_correct INTEGER DEFAULT 0,
    total_incorrect INTEGER DEFAULT 0,
    total_empty INTEGER DEFAULT 0,
    total_net NUMERIC(5, 2) DEFAULT 0.00,
    courses_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.6 exam_results (Deneme İçindeki Ders Bazlı Sonuçlar & Netler)
CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_exam_id UUID NOT NULL REFERENCES public.student_exams(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT,
    course_name VARCHAR(100),
    correct_count INTEGER NOT NULL DEFAULT 0,
    incorrect_count INTEGER NOT NULL DEFAULT 0,
    empty_count INTEGER NOT NULL DEFAULT 0,
    net_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_positive_counts CHECK (correct_count >= 0 AND incorrect_count >= 0 AND empty_count >= 0)
);

-- 2.7 wrong_questions (Yanlış Defteri & Sokratik İpucu Geçmişi)
CREATE TABLE IF NOT EXISTS public.wrong_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_key VARCHAR(50),
    course_name VARCHAR(100),
    topic_name VARCHAR(255),
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    student_note TEXT,
    ai_hint_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. İNDEKSLER (Performans Optimizasyonu)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_courses_exam_id ON public.courses(exam_id);
CREATE INDEX IF NOT EXISTS idx_topics_course_id ON public.topics(course_id);
CREATE INDEX IF NOT EXISTS idx_student_exams_user_id ON public.student_exams(user_id);
CREATE INDEX IF NOT EXISTS idx_student_exams_date ON public.student_exams(exam_date DESC);
CREATE INDEX IF NOT EXISTS idx_exam_results_student_exam_id ON public.exam_results(student_exam_id);
CREATE INDEX IF NOT EXISTS idx_wrong_questions_user_id ON public.wrong_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_wrong_questions_is_resolved ON public.wrong_questions(is_resolved);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS GÜVENLİK KURALLARI)
-- ==============================================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wrong_questions ENABLE ROW LEVEL SECURITY;

-- Kullanıcı Profili: Herkes kendi profilini görebilir ve güncelleyebilir
CREATE POLICY "user_profiles_select_own" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "user_profiles_update_own" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "user_profiles_insert_own" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Genel Sınav ve Ders Katalogları: Herkese okuma izni
CREATE POLICY "exams_read_all" ON public.exams FOR SELECT USING (true);
CREATE POLICY "courses_read_all" ON public.courses FOR SELECT USING (true);
CREATE POLICY "topics_read_all" ON public.topics FOR SELECT USING (true);

-- Öğrenci Denemeleri: Sadece öğrencinin kendisine ait kayıtlar
CREATE POLICY "student_exams_all_own" ON public.student_exams 
    FOR ALL USING (auth.uid() = user_id);

-- Deneme Ders Sonuçları: Öğrencinin kendi denemesiyle eşleşenler
CREATE POLICY "exam_results_all_own" ON public.exam_results 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.student_exams se 
            WHERE se.id = exam_results.student_exam_id 
            AND se.user_id = auth.uid()
        )
    );

-- Yanlış Defteri Soruları: Sadece öğrencinin kendisine ait sorular
CREATE POLICY "wrong_questions_all_own" ON public.wrong_questions 
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- 5. OTOMATİK PROFİL OLUŞTURMA TRİGGER'I (Google Auth & Email Signup)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, display_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        now(),
        now()
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı auth.users tablosuna bağla
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 6. SUPABASE STORAGE (question-images Bucket) KURULUMU
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('question-images', 'question-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Herkes görseli görüntüleyebilir (public CDN)
CREATE POLICY "Public Access for Question Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'question-images');

-- Sadece giriş yapmış kullanıcı soru görseli yükleyebilir
CREATE POLICY "Authenticated users can upload question images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'question-images' 
        AND auth.role() = 'authenticated'
    );

-- Kullanıcı sadece kendi yüklediği görseli silebilir
CREATE POLICY "Users can delete their own question images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'question-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ==============================================================================
-- 7. SEED VERİSİ (LGS 2027 & 6 Temel Ders)
-- ==============================================================================
DO $$
DECLARE
    lgs_id UUID;
BEGIN
    INSERT INTO public.exams (name, slug, is_active)
    VALUES ('Liselere Geçiş Sistemi', 'lgs', true)
    ON CONFLICT (slug) DO UPDATE 
    SET name = EXCLUDED.name, is_active = EXCLUDED.is_active
    RETURNING id INTO lgs_id;

    INSERT INTO public.courses (exam_id, name, order_index)
    SELECT lgs_id, course_name, course_order
    FROM (
        VALUES 
            ('Türkçe', 1),
            ('Matematik', 2),
            ('Fen Bilimleri', 3),
            ('T.C. İnkılap Tarihi ve Atatürkçülük', 4),
            ('Din Kültürü ve Ahlak Bilgisi', 5),
            ('Yabancı Dil (İngilizce)', 6)
    ) AS c(course_name, course_order)
    WHERE NOT EXISTS (
        SELECT 1 FROM public.courses existing_c 
        WHERE existing_c.exam_id = lgs_id 
        AND existing_c.name = c.course_name
    );
END $$;
