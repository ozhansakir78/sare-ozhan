-- ==============================================================================
-- 002_USER_PROFILES.SQL: Kullanıcı Profilleri, Hedef Lise ve Kota Yönetimi
-- ==============================================================================

-- 1. user_profiles Tablosu
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name VARCHAR(150),
    target_high_school VARCHAR(255),
    target_score NUMERIC(5, 2) DEFAULT 450.00,
    is_pro BOOLEAN NOT NULL DEFAULT false,
    pro_expires_at TIMESTAMPTZ,
    daily_quota_used INTEGER NOT NULL DEFAULT 0,
    quota_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. İndeksler
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_pro ON public.user_profiles(is_pro);
CREATE INDEX IF NOT EXISTS idx_user_profiles_quota_date ON public.user_profiles(quota_date);

-- 3. RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.user_profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.user_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 4. Otomatik Profil Oluşturma Tetikleyicisi (Trigger)
-- auth.users tablosuna yeni kullanıcı eklendiğinde otomatik user_profiles kaydı açar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, display_name, is_pro, daily_quota_used, quota_date)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        false,
        0,
        CURRENT_DATE
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger tanımı
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Updated_at Otomatik Güncelleme Fonksiyonu
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER trg_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
