-- ==============================================================================
-- 003_STORAGE_BUCKET.SQL: Soru Fotoğrafları İçin Supabase Storage Bucket & RLS
-- ==============================================================================

-- 1. question-images Bucket Oluşturma (Public okuma erişimli)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'question-images',
    'question-images',
    true,
    8388608, -- 8MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 8388608,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 2. Storage RLS Politikaları
-- Herkes yüklenmiş soru fotoğraflarını görüntüleyebilir (Public CDN)
CREATE POLICY "Public Access for Question Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'question-images');

-- Sadece oturum açmış kullanıcılar kendi klasörlerine görsel yükleyebilir
CREATE POLICY "Authenticated users can upload question images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'question-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );

-- Kullanıcı kendi yüklediği görseli silebilir
CREATE POLICY "Users can delete own question images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'question-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );
