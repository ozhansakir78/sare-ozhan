import { Lise1CourseGradeInput, calculateLise1Term, SCHOOL_PRESETS } from '@/lib/lise1-calculation';
import { supabase } from '@/lib/supabase';

const STORAGE_KEY_GRADES = 'sinavkocu_lise1_grades_v2';
const STORAGE_KEY_PRESET = 'sinavkocu_lise1_school_preset';

export interface StoredLise1Data {
  presetId: string;
  grades: Lise1CourseGradeInput[];
  updatedAt: string;
}

/**
 * Tarayıcıdan ve yerel depolamadan kayıtlı dersleri ve notları çeker.
 * Hiç kayıt yoksa varsayılan Anadolu Lisesi şablonunu boş notlarla başlatır.
 */
export function getStoredLise1Grades(userId?: string): Lise1CourseGradeInput[] {
  if (typeof window === 'undefined') {
    return SCHOOL_PRESETS.anadolu.courses;
  }

  try {
    const key = userId ? `${STORAGE_KEY_GRADES}_${userId}` : STORAGE_KEY_GRADES;
    let raw = localStorage.getItem(key);
    if (!raw && userId) {
      // Genel anahtara bak
      raw = localStorage.getItem(STORAGE_KEY_GRADES);
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      if (parsed && Array.isArray(parsed.grades) && parsed.grades.length > 0) {
        return parsed.grades;
      }
    }
  } catch (err) {
    console.warn('Lise 1 notları yüklenirken hata:', err);
  }

  // Varsayılan: Anadolu lisesi boş notlar
  return SCHOOL_PRESETS.anadolu.courses;
}

/**
 * Aktif seçili okul şablonunu çeker ('anadolu' | 'fen' | 'imam_hatip' | 'ozel')
 */
export function getStoredSchoolPreset(userId?: string): string {
  if (typeof window === 'undefined') return 'anadolu';
  try {
    const key = userId ? `${STORAGE_KEY_PRESET}_${userId}` : STORAGE_KEY_PRESET;
    return localStorage.getItem(key) || 'anadolu';
  } catch {
    return 'anadolu';
  }
}

/**
 * Ders notlarını ve haftalık ders saatlerini yerel depolamaya ve (kullanıcı giriş yaptıysa) Supabase'e kaydeder.
 */
export async function saveStoredLise1Grades(
  grades: Lise1CourseGradeInput[],
  presetId: string = 'anadolu',
  userId?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  const data: StoredLise1Data = {
    presetId,
    grades,
    updatedAt: new Date().toISOString(),
  };

  try {
    const key = userId ? `${STORAGE_KEY_GRADES}_${userId}` : STORAGE_KEY_GRADES;
    const presetKey = userId ? `${STORAGE_KEY_PRESET}_${userId}` : STORAGE_KEY_PRESET;

    localStorage.setItem(key, JSON.stringify(grades));
    localStorage.setItem(presetKey, presetId);
    // Genel anahtarı da güncelle
    localStorage.setItem(STORAGE_KEY_GRADES, JSON.stringify(grades));
    localStorage.setItem(STORAGE_KEY_PRESET, presetId);

    // Diğer bileşenlerin (Profil, Radar vb.) anında haberdar olması için event fırlat
    window.dispatchEvent(new Event('lise1_grades_updated'));

    // Kullanıcı oturum açmışsa Supabase auth user_metadata'ya da senkronize et
    if (userId) {
      try {
        await supabase.auth.updateUser({
          data: {
            lise1_grades: grades,
            lise1_school_preset: presetId,
            lise1_grades_updated_at: data.updatedAt,
          },
        });
      } catch (cloudErr) {
        console.warn('Buluta not kaydı başarısız (çevrimdışı çalışıyor):', cloudErr);
      }
    }
  } catch (err) {
    console.error('Lise 1 notları kaydedilirken hata:', err);
    throw err;
  }
}

/**
 * Öğrencinin girilen notlarından gerçek dönem ağırlıklı not ortalamasını hesaplar.
 * Hiç not girilmemişse null döndürür (böylece sahte 88.5 gibi sayılar gösterilmez).
 */
export function getStoredLise1TermAverage(userId?: string): number | null {
  const grades = getStoredLise1Grades(userId);
  const result = calculateLise1Term(grades);
  if (!result.hasAnyGrades) {
    return null;
  }
  return result.termAverage;
}

/**
 * Kayıtlı notları sıfırlar (temizler)
 */
export function resetStoredLise1Grades(userId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = userId ? `${STORAGE_KEY_GRADES}_${userId}` : STORAGE_KEY_GRADES;
    const presetKey = userId ? `${STORAGE_KEY_PRESET}_${userId}` : STORAGE_KEY_PRESET;
    localStorage.removeItem(key);
    localStorage.removeItem(presetKey);
    localStorage.removeItem(STORAGE_KEY_GRADES);
    localStorage.removeItem(STORAGE_KEY_PRESET);
    window.dispatchEvent(new Event('lise1_grades_updated'));
  } catch (err) {
    console.warn('Lise 1 notları temizlenirken hata:', err);
  }
}
