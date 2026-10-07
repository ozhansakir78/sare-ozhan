-- Soru Havuzu Tablosu
CREATE TABLE IF NOT EXISTS public.question_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tier VARCHAR(50) NOT NULL,
    course VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'orta',
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(5) NOT NULL,
    solution TEXT NOT NULL,
    image_url TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS (Row Level Security)
ALTER TABLE public.question_pool ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (Sınav oluşturulurken API'den veya istemciden erişilecek)
CREATE POLICY "Herkes onaylanmis sorulari okuyabilir"
    ON public.question_pool FOR SELECT
    USING (is_approved = true);

-- Sadece admin/service_role ekleyebilir (Yapay zeka fabrikası)
-- Güvenlik için anonim eklemeyi kapalı tutuyoruz, admin yetkisi (SERVICE_ROLE_KEY) kullanılacak.

-- İndeksler (Hızlı arama için)
CREATE INDEX idx_question_pool_tier_course_topic ON public.question_pool(tier, course, topic);
