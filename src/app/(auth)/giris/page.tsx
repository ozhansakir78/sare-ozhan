'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  KeyRound,
} from 'lucide-react';

export default function GirisPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, resetPasswordForEmail, resendConfirmationEmail, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Şifremi Unuttum State'leri
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // E-posta Onay Tekrar Gönderme
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Lütfen önce yukarıdaki alana e-posta adresinizi giriniz.');
      return;
    }
    setResendLoading(true);
    setResendSuccess(false);
    try {
      const res = await resendConfirmationEmail(email.trim());
      if (res.error) {
        setError(`Onay e-postası gönderilemedi: ${res.error}`);
      } else {
        setResendSuccess(true);
      }
    } catch {
      setError('Onay e-postası gönderilemedi.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signInWithEmail(email, password);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const res = await signInWithGoogle();
    if (res.error) {
      setError(res.error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    setForgotMessage(null);

    const res = await resetPasswordForEmail(forgotEmail);
    setForgotLoading(false);

    if (res.error) {
      setForgotMessage({ text: res.error, isError: true });
    } else {
      setForgotMessage({
        text: res.message || 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
        isError: false,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      {/* Üst Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
          <GraduationCap className="h-6 w-6" />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          SınavKoçu<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
        </span>
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Öğrenci &amp; Veli Girişi</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Tekrar Hoş Geldin! 👋
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Deneme netlerini takip et ve çözemediğin soruları öğrenmeye devam et.
          </p>
        </div>

        {error && (
          <div className="mt-5 space-y-2">
            <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <span className="font-bold">{error}</span>
                {error.includes('onaylanmamış') && (
                  <div className="pt-2 border-t border-rose-200/80 dark:border-rose-900/60 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={resendLoading}
                      className="inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition cursor-pointer disabled:opacity-50"
                    >
                      <span>{resendLoading ? 'Gönderiliyor...' : 'Onay Linkini Tekrar Gönder'}</span>
                    </button>
                    {resendSuccess && (
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        ✓ Onay e-postası tekrar iletildi!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              E-posta Adresi
            </label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@ogrenci.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-9 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Şifre
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotMessage(null);
                  setIsForgotModalOpen(true);
                }}
                className="text-[11px] font-bold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
              >
                Şifremi Unuttum?
              </button>
            </div>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-10 pl-9 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 focus:outline-none cursor-pointer disabled:opacity-60"
          >
            <span>{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Ayırıcı */}
        <div className="relative my-5 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <span className="relative bg-white px-3 dark:bg-slate-900">veya</span>
        </div>

        {/* Google ile Giriş */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
        >
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
          <span>Google ile Devam Et</span>
        </button>

        {/* Kayıt Ol Linki */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Hesabın yok mu?{' '}
          <Link
            href="/kayit"
            className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Hemen Kayıt Ol
          </Link>
        </p>
      </div>

      {/* Şifremi Unuttum Modalı */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Şifremi Sıfırla
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kayıtlı e-posta adresine sıfırlama bağlantısı gönderilir
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {forgotMessage && (
              <div
                className={`mt-4 rounded-xl p-3 text-xs font-semibold ${
                  forgotMessage.isError
                    ? 'border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300'
                    : 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300'
                }`}
              >
                <div>{forgotMessage.text}</div>
                {forgotMessage.isError && (forgotMessage.text.includes('rate limit') || forgotMessage.text.includes('limiti aşıldı')) && (
                  <p className="mt-2 text-[11px] font-normal text-rose-700 dark:text-rose-300">
                    💡 <strong>Hızlı Çözüm:</strong> Supabase Dashboard ➔ Authentication ➔ Users bölümünden kullanıcınızı bulup doğrudan şifrenizi belirleyebilir veya birkaç dakika sonra tekrar deneyebilirsiniz.
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  E-Posta Adresiniz
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="ornek@ogrenci.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition cursor-pointer disabled:opacity-60"
                >
                  <span>{forgotLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
