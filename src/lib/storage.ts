import { supabase, isSupabaseConfigured } from '@/lib/supabase';

/**
 * İstemci tarafında görseli optimize eder:
 * - Maksimum 1200x1200 boyutuna ölçekler
 * - Kaliteyi %75 yaparak dosya boyutunu 5-10 kat küçültür (LocalStorage ve bant genişliği koruması)
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // WebP destekleniyorsa webp, değilse jpeg formatında sıkıştır
        try {
          const compressed = canvas.toDataURL('image/webp', quality);
          resolve(compressed);
        } catch {
          const compressedFallback = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedFallback);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Soru fotoğrafını Supabase Storage veya yerel önbelleğe yükler
 */
export async function uploadQuestionImage(
  file: File,
  userId?: string
): Promise<{ url: string; isStorage: boolean }> {
  // Önce görseli her durumda optimize et (bant genişliği ve tarayıcı performansı için)
  const compressedDataUrl = await compressImage(file);

  // Supabase yapılandırılmamışsa veya kullanıcı giriş yapmamışsa sıkıştırılmış veriyi döndür
  if (!isSupabaseConfigured || !userId) {
    return { url: compressedDataUrl, isStorage: false };
  }

  try {
    // Base64'ten Blob'a dönüştür
    const res = await fetch(compressedDataUrl);
    const blob = await res.blob();

    const fileExt = file.name.split('.').pop() || 'webp';
    const filePath = `${userId}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('question-images')
      .upload(filePath, blob, {
        contentType: blob.type || 'image/webp',
        upsert: false,
      });

    if (uploadError) {
      console.warn('Storage yükleme hatası, yerel görsel kullanılıyor:', uploadError);
      return { url: compressedDataUrl, isStorage: false };
    }

    // Public URL al
    const { data } = supabase.storage.from('question-images').getPublicUrl(filePath);

    return { url: data.publicUrl, isStorage: true };
  } catch (err) {
    console.warn('Görsel yükleme istisnası, fallback kullanılıyor:', err);
    return { url: compressedDataUrl, isStorage: false };
  }
}
