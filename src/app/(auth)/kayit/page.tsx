'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { HierarchicalTargetSelector } from '@/components/school/HierarchicalTargetSelector';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  School,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function KayitPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, resendConfirmationEmail } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<'8' | '9'>('8');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Şifreniz en az 6 karakterden oluşmalıdır.');
      return;
    }

    setLoading(true);
    const res = await signUpWithEmail(email, password, displayName, selectedSchool, {
      gradeLevel,
      targetCity: selectedCity,
      targetDistrict: selectedDistrict,
      targetUniversity: gradeLevel === '9' ? selectedSchool : undefined,
      targetDepartment: gradeLevel === '9' ? selectedDepartment : undefined,
    });
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else if (res.confirmationRequired) {
      setConfirmationSent(true);
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

  if (confirmationSent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            SınavKoçu<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
          </span>
        </Link>

        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Mail className="h-8 w-8 animate-bounce" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            ✓ Hesap Kaydınız Oluşturuldu
          </span>

          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            Onay E-postanız Gönderildi! 📬
          </h2>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
            <strong className="text-slate-900 dark:text-white">{email}</strong> adresine bir aktivasyon bağlantısı ilettik.
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 space-y-2.5">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">1</span>
              <span>E-posta kutunuza (veya <strong>spam / gereksiz</strong> klasörüne) gidin.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">2</span>
              <span>Gelen doğrulama bağlantısına (<strong>Confirm signup</strong>) tıklayın.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">3</span>
              <span>Bağlantıya tıkladıktan sonra hesabınız hem mobilde hem bilgisayarda senkronize açılacaktır!</span>
            </div>
          </div>

          {resendMessage && (
            <div className="mt-3 rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              {resendMessage}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              disabled={resendLoading}
              onClick={async () => {
                setResendLoading(true);
                setResendMessage(null);
                const res = await resendConfirmationEmail(email);
                setResendLoading(false);
                if (res.error) {
                  setResendMessage(`Hata: ${res.error}`);
                } else {
                  setResendMessage(res.message || 'Onay e-postası tekrar iletildi!');
                }
              }}
              className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 py-3 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50 cursor-pointer dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300"
            >
              {resendLoading ? 'Gönderiliyor...' : 'Onay E-postasını Tekrar Gönder'}
            </button>

            <Link
              href="/giris"
              className="w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-slate-800 text-center dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Giriş Yap Sayfasına Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Ücretsiz Öğrenci Hesabı</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Hedefine Bir Adım At 🚀
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Tüm deneme netlerini kaydet ve yapay zekâ koçunla eksiklerini sıfırla.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs font-medium text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300 space-y-2.5">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span className="font-semibold leading-relaxed">{error}</span>
            </div>
            {error.includes('zaten kayıtlı') && (
              <div className="pt-2 border-t border-rose-200 dark:border-rose-900/60 flex items-center gap-2">
                <Link
                  href="/giris"
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition"
                >
                  Giriş Yap Sayfasına Git →
                </Link>
              </div>
            )}
            {(error.includes('kotası aşıldı') || error.includes('rate limit')) && (
              <div className="pt-2 border-t border-rose-200/80 text-[11px] space-y-1.5 dark:border-rose-900/60">
                <p className="font-bold text-rose-900 dark:text-rose-200">
                  💡 Bu sorun neden yaşanıyor ve nasıl çözülür?
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  Supabase'in varsayılan e-posta servisinde spam koruması için <strong>saatte 3-4 mail</strong> sınırı vardır. Birkaç deneme yapıldığında bu kota dolar.
                </p>
                <div className="rounded-lg bg-white/80 p-2.5 dark:bg-slate-800/80 border border-rose-200/60 dark:border-slate-700">
                  <span className="font-bold text-slate-800 dark:text-slate-100">1 Dakikalık Çözüm:</span>
                  <ol className="list-decimal pl-4 mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                    <li><a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-semibold">Supabase Dashboard</a> projenizi açın.</li>
                    <li>Sol menüden <strong>Authentication ➔ Providers ➔ Email</strong> sekmesine gidin.</li>
                    <li><strong>"Confirm email"</strong> seçeneğini kapatıp <strong>Save</strong> butonuna basın.</li>
                  </ol>
                  <p className="mt-1.5 text-[10px] text-slate-500">
                    Kapatıldığında tüm öğrenciler hiç beklemeden anında kayıt olabilir ve sisteme hemen giriş yapabilir.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Sınıf & Hazırlık Hedefi Seçimi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Sınıfınız &amp; Hazırlık Hedefiniz
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setGradeLevel('8');
                  setSelectedSchool('');
                  setSelectedDepartment('');
                }}
                className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition cursor-pointer ${
                  gradeLevel === '8'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400'
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  🎯
                </div>
                <div>
                  <div className="text-xs font-black">8. Sınıf (LGS)</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Liseye Geçiş Hazırlığı</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setGradeLevel('9');
                  setSelectedSchool('');
                  setSelectedDepartment('');
                }}
                className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition cursor-pointer ${
                  gradeLevel === '9'
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-sm dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400'
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  🏛️
                </div>
                <div>
                  <div className="text-xs font-black">9. Sınıf (Lise 1)</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">MEB Yazılı &amp; YKS Temel</div>
                </div>
              </button>
            </div>
          </div>

          {/* Ad Soyad */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Ad Soyad
            </label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-9 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* E-posta */}
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
                placeholder="ahmet@ogrenci.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-9 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Şifre (en az 6 karakter)
            </label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
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

          {/* Hiyerarşik Hedef Seçici (İl / İlçe / Lise veya Üniversite / Bölüm) */}
          <HierarchicalTargetSelector
            gradeLevel={gradeLevel}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedSchool={selectedSchool}
            onSchoolChange={(sch) => setSelectedSchool(sch)}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-md transition focus:outline-none cursor-pointer disabled:opacity-60 ${
              gradeLevel === '9'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700'
            }`}
          >
            <span>{loading ? 'Hesap Oluşturuluyor...' : 'Ücretsiz Kayıt Ol'}</span>
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

        {/* Google ile Kayıt */}
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
          <span>Google ile Kayıt Ol</span>
        </button>

        {/* Giriş Yap Linki */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Zaten hesabın var mı?{' '}
          <Link
            href="/giris"
            className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
