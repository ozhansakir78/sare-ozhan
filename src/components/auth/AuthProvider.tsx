'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProfile, UserProfileInsert, UserProfileUpdate } from '@/types/database';
import { getQuotaStatus, consumeQuota as consumeLocalQuota } from '@/lib/quota';
import { syncLocalDataToCloud, pullCloudDataToLocal } from '@/lib/cloud-sync';
import { normalizeSchoolName } from '@/lib/lgs-high-schools';
import { setActiveTier } from '@/lib/grade-tier';

export interface SignUpExtraOptions {
  gradeLevel?: '8' | '9' | string;
  targetCity?: string;
  targetDistrict?: string;
  targetUniversity?: string;
  targetDepartment?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isPro: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string,
    targetSchool?: string,
    extraOptions?: SignUpExtraOptions
  ) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: string }>;
  refreshProfile: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<{ error?: string; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_PROFILE_KEY = 'lgs_local_user_profile_v1';

function getLocalProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_USER_PROFILE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as UserProfile;
      if (data.target_high_school) {
        data.target_high_school = normalizeSchoolName(data.target_high_school);
      }
      return data;
    }
  } catch {}
  return null;
}

function saveLocalProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Supabase'den profil çekme
  const fetchProfile = useCallback(async (userId: string, userEmail?: string | null) => {
    if (!isSupabaseConfigured) {
      const local = getLocalProfile();
      if (local) {
        setProfile(local);
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        const userProf = data as UserProfile;
        setProfile(userProf);
        saveLocalProfile(userProf);
        if (userProf.grade_level === '9') {
          setActiveTier('lise1');
        } else if (userProf.grade_level === '8') {
          setActiveTier('lgs');
        }
      } else if (error && error.code === 'PGRST116') {
        // Profil henüz oluşmamışsa manuel oluştur
        const newProfile: UserProfileInsert = {
          id: userId,
          email: userEmail || null,
          display_name: userEmail ? userEmail.split('@')[0] : 'Öğrenci',
          target_high_school: null,
          target_score: null,
          is_pro: false,
          pro_expires_at: null,
          daily_quota_used: 0,
          quota_date: new Date().toISOString().split('T')[0],
        };

        const { data: created } = await supabase
          .from('user_profiles')
          .insert(newProfile)
          .select()
          .single();

        if (created) {
          setProfile(created as UserProfile);
          saveLocalProfile(created as UserProfile);
        }
      }
    } catch (e) {
      console.warn('Profil getirme uyarısı:', e);
      // Yerel profil ile devam et
      const local = getLocalProfile();
      if (local) {
        setProfile(local);
        if (local.grade_level === '9') {
          setActiveTier('lise1');
        } else if (local.grade_level === '8') {
          setActiveTier('lgs');
        }
      }
    }
  }, []);

  // Auth durumu dinleyicisi
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Çevrimdışı / Yerel mod
      const local = getLocalProfile();
      if (local) {
        setProfile(local);
        if (local.grade_level === '9') {
          setActiveTier('lise1');
        } else if (local.grade_level === '8') {
          setActiveTier('lgs');
        }
      }
      setIsLoading(false);
      return;
    }

    // İlk oturumu al
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          fetchProfile(currentUser.id, currentUser.email);
          syncLocalDataToCloud(currentUser.id).then(() => {
            pullCloudDataToLocal(currentUser.id).then(() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('cloud_synced'));
              }
            });
          });
        } else {
          // Bulut oturumu yoksa yerel profil varsa yükle (çevrimdışı modu koru)
          const local = getLocalProfile();
          if (local) setProfile(local);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn('Oturum bilgisi alınamadı, yerel profil kontrol ediliyor:', err);
        const local = getLocalProfile();
        if (local) setProfile(local);
        setIsLoading(false);
      });

    // Oturum değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.email);
        syncLocalDataToCloud(currentUser.id).then(() => {
          pullCloudDataToLocal(currentUser.id).then(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('cloud_synced'));
            }
          });
        });
      } else {
        // Çıkış yapıldığında oturumu kapat
        const local = getLocalProfile();
        if (local) setProfile(local);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signInWithEmail = async (email: string, password: string): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) {
      // Yerel mod simülasyonu
      const existing = getLocalProfile();
      const mockProfile: UserProfile = {
        id: existing?.id || 'local-user-' + Date.now(),
        email,
        display_name: existing?.display_name || email.split('@')[0],
        target_high_school: existing?.target_high_school || 'Galatasaray Lisesi',
        target_score: existing?.target_score || 490,
        is_pro: existing?.is_pro || false,
        pro_expires_at: existing?.pro_expires_at || null,
        daily_quota_used: existing?.daily_quota_used || 0,
        quota_date: existing?.quota_date || new Date().toISOString().split('T')[0],
        created_at: existing?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfile(mockProfile);
      saveLocalProfile(mockProfile);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message?.toLowerCase().includes('failed to fetch')) {
          throw error;
        }
        if (error.message?.toLowerCase().includes('email not confirmed')) {
          return {
            error:
              'E-posta adresiniz henüz onaylanmamış! Lütfen gelen kutunuzdaki onay linkine tıklayın veya Supabase Dashboard > Authentication > Providers > Email altından "Confirm email" ayarını kapatın.',
          };
        }
        if (error.message?.toLowerCase().includes('invalid login credentials')) {
          return {
            error: 'E-posta adresi veya şifre hatalı. Lütfen bilgilerinizi kontrol ediniz.',
          };
        }
        return { error: error.message };
      }
      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, data.user.email);
        await syncLocalDataToCloud(data.user.id);
        await pullCloudDataToLocal(data.user.id);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cloud_synced'));
        }
      }
      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Giriş yapılamadı.';
      if (msg.toLowerCase().includes('failed to fetch')) {
        console.warn('Supabase sunucusuna ulaşılamadı, yerel profil açılıyor:', msg);
        const existing = getLocalProfile();
        const mockProfile: UserProfile = {
          id: existing?.id || 'local-user-' + Date.now(),
          email,
          display_name: existing?.display_name || email.split('@')[0],
          target_high_school: existing?.target_high_school || 'Galatasaray Lisesi',
          target_score: existing?.target_score || 490,
          is_pro: existing?.is_pro || false,
          pro_expires_at: existing?.pro_expires_at || null,
          daily_quota_used: existing?.daily_quota_used || 0,
          quota_date: existing?.quota_date || new Date().toISOString().split('T')[0],
          created_at: existing?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(mockProfile);
        saveLocalProfile(mockProfile);
        return {};
      }
      return { error: msg };
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string,
    targetSchool?: string,
    extraOptions?: SignUpExtraOptions
  ): Promise<{ error?: string }> => {
    const cleanSchool = targetSchool ? normalizeSchoolName(targetSchool) : null;
    const gradeLevel = extraOptions?.gradeLevel || '8';
    const targetCity = extraOptions?.targetCity || null;
    const targetDistrict = extraOptions?.targetDistrict || null;
    const targetUniversity = extraOptions?.targetUniversity || null;
    const targetDepartment = extraOptions?.targetDepartment || null;

    // Seçilen kademeye anında geçiş yap
    if (gradeLevel === '9') {
      setActiveTier('lise1');
    } else {
      setActiveTier('lgs');
    }

    if (!isSupabaseConfigured) {
      // Yerel mod simülasyonu
      const mockProfile: UserProfile = {
        id: 'local-user-' + Date.now(),
        email,
        display_name: displayName || email.split('@')[0],
        grade_level: gradeLevel,
        target_city: targetCity,
        target_district: targetDistrict,
        target_high_school: cleanSchool,
        target_score: null,
        target_university: targetUniversity,
        target_department: targetDepartment,
        is_pro: false,
        pro_expires_at: null,
        daily_quota_used: 0,
        quota_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfile(mockProfile);
      saveLocalProfile(mockProfile);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
            grade_level: gradeLevel,
          },
        },
      });

      if (error) {
        if (error.message?.toLowerCase().includes('failed to fetch')) {
          throw error;
        }
        return { error: error.message };
      }
      if (data.user) {
        setUser(data.user);
        // Profili kaydet
        const initialProfile: UserProfileInsert = {
          id: data.user.id,
          email,
          display_name: displayName || email.split('@')[0],
          grade_level: gradeLevel,
          target_city: targetCity,
          target_district: targetDistrict,
          target_high_school: cleanSchool,
          target_score: null,
          target_university: targetUniversity,
          target_department: targetDepartment,
          is_pro: false,
          pro_expires_at: null,
          daily_quota_used: 0,
          quota_date: new Date().toISOString().split('T')[0],
        };

        if (isSupabaseConfigured) {
          await supabase.from('user_profiles').upsert(initialProfile);
        }

        const fullProfile: UserProfile = {
          ...initialProfile,
          email: initialProfile.email ?? null,
          display_name: initialProfile.display_name ?? null,
          grade_level: initialProfile.grade_level ?? gradeLevel,
          target_city: initialProfile.target_city ?? targetCity,
          target_district: initialProfile.target_district ?? targetDistrict,
          target_high_school: initialProfile.target_high_school ?? cleanSchool,
          target_score: initialProfile.target_score ?? null,
          target_university: initialProfile.target_university ?? targetUniversity,
          target_department: initialProfile.target_department ?? targetDepartment,
          is_pro: initialProfile.is_pro ?? false,
          pro_expires_at: initialProfile.pro_expires_at ?? null,
          daily_quota_used: initialProfile.daily_quota_used ?? 0,
          quota_date: initialProfile.quota_date ?? new Date().toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(fullProfile);
        saveLocalProfile(fullProfile);

        if (!data.session) {
          return {
            error:
              'Kayıt oluşturuldu! Ancak Supabase e-posta onayı bekliyor. Mobil ve PC senkronizasyonu için lütfen gelen kutunuzdaki onay linkine tıklayın veya Supabase Dashboard > Authentication > Providers > Email altından "Confirm email" seçeneğini kapatınız.',
          };
        }
      }
      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kayıt oluşturulamadı.';
      if (msg.toLowerCase().includes('failed to fetch')) {
        console.warn('Supabase sunucusuna ulaşılamadı, yerel kayıt oluşturuluyor:', msg);
        const mockProfile: UserProfile = {
          id: 'local-user-' + Date.now(),
          email,
          display_name: displayName || email.split('@')[0],
          grade_level: gradeLevel,
          target_city: targetCity,
          target_district: targetDistrict,
          target_high_school: cleanSchool,
          target_score: null,
          target_university: targetUniversity,
          target_department: targetDepartment,
          is_pro: false,
          pro_expires_at: null,
          daily_quota_used: 0,
          quota_date: new Date().toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(mockProfile);
        saveLocalProfile(mockProfile);
        return {};
      }
      return { error: msg };
    }
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) {
      return {
        error:
          'Google ile giriş yapabilmek için Supabase bağlantı anahtarlarınızı .env.local dosyasına ekleyiniz.',
      };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) return { error: error.message };
      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google girişi başlatılamadı.';
      return { error: msg };
    }
  };

  const resetPasswordForEmail = async (
    email: string
  ): Promise<{ error?: string; message?: string }> => {
    if (!isSupabaseConfigured) {
      return {
        message:
          'Test Modu: Şifre sıfırlama talebi simüle edildi. Canlı Supabase anahtarı eklendiğinde gerçek e-posta gönderilecektir.',
      };
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/profil`,
      });
      if (error) return { error: error.message };
      return { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Şifre sıfırlama isteği iletilemedi.';
      return { error: msg };
    }
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_USER_PROFILE_KEY);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ error?: string }> => {
    if (!profile) return { error: 'Oturum açmış kullanıcı bulunamadı.' };

    const sanitizedUpdates = { ...updates };
    if (sanitizedUpdates.target_high_school) {
      sanitizedUpdates.target_high_school = normalizeSchoolName(sanitizedUpdates.target_high_school);
    }

    const updated: UserProfile = {
      ...profile,
      ...sanitizedUpdates,
      updated_at: new Date().toISOString(),
    };

    setProfile(updated);
    saveLocalProfile(updated);

    if (isSupabaseConfigured && user) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update(sanitizedUpdates)
          .eq('id', user.id);
        if (error) return { error: error.message };
      } catch (err: unknown) {
        console.error('Profil güncelleme hatası:', err);
      }
    }

    return {};
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id, user.email);
    }
  };

  // Kullanıcı PRO mu? (Hem profilden hem yerel kotadan kontrol eder)
  const isPro = Boolean(profile?.is_pro || getQuotaStatus().isPro);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isPro,
        isConfigured: isSupabaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateProfile,
        refreshProfile,
        resetPasswordForEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
