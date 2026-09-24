'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AuthGuard({ children, title, description }: AuthGuardProps) {
  const pathname = usePathname();
  const { user, profile, isLoading, signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Oturum durumu kontrol edilirken yükleniyor ekranı
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Kullanıcı oturumu doğrulanıyor...
        </p>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa içeriği doğrudan göster
  if (user || profile) {
    return <>{children}</>;
  }

  const handleGoogleSignIn = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    const res = await signInWithGoogle();
    if (res.error) {
      setGoogleError(res.error);
      setGoogleLoading(false);
    }
  };

  const redirectParam = pathname ? `?redirect=${encodeURIComponent(pathname)}` : '';

  // Kullanıcı giriş yapmamışsa erişim kilit ekranını göster
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900 text-center">
        {/* Dekoratif Efekt */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-6 shadow-inner ring-8 ring-indigo-50/50 dark:ring-indigo-950/40">
          <Lock className="h-8 w-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-950/60 dark:border-amber-900/60 dark:text-amber-300 mb-3">
          <ShieldCheck className="h-3.5 w-3.5" />
          ÜYE GİRİŞİ ZORUNLUDUR
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {title || 'Bu Özelliği Kullanabilmek İçin Giriş Yapmalısınız'}
        </h2>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          {description ||
            'Sare Sınav Koçluğu platformunun deneme sınavları, soru arşivi, yapay zekâ çözümleri ve net analizlerini kullanabilmek için lütfen ücretsiz hesabınıza giriş yapın.'}
        </p>

        {googleError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            {googleError}
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-slate-300 px-6 py-3 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Google ile Hızlı Giriş Yap</span>
          </button>

          <Link
            href={`/kayit${redirectParam}`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>Ücretsiz Kayıt Ol</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Zaten bir hesabınız var mı?{' '}
          <Link
            href={`/giris${redirectParam}`}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Giriş Yapın
          </Link>
        </div>

        {/* Avantaj Listesi */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white">Sınırsız Deneme</strong>
              <span className="text-slate-500">Tüm netlerinizi ve başarı grafiğinizi biriktirin</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white">AI Sokratik Koç</strong>
              <span className="text-slate-500">Yanlış sorularınızı adım adım çözün</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white">Hedef Radarı</strong>
              <span className="text-slate-500">Liseyi kazanmak için kalan netlerinizi görün</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
