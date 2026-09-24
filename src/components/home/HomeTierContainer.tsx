'use client';

import React from 'react';
import Link from 'next/link';
import { useGradeTier } from '@/lib/grade-tier';
import { GradeTierSwitcher } from '@/components/ui/GradeTierSwitcher';
import { LgsCalculatorForm } from '@/components/exam/LgsCalculatorForm';
import { Lise1CalculatorForm } from '@/components/exam/Lise1CalculatorForm';
import { TargetHighSchoolCard } from '@/components/target/TargetHighSchoolCard';
import { UniversityRadarCard } from '@/components/target/UniversityRadarCard';
import { DailyQuestCard } from '@/components/quest/DailyQuestCard';
import { LiveSundayExamCard } from '@/components/exam/LiveSundayExamCard';
import { LgsCountdown } from '@/components/seo/LgsCountdown';
import {
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Wand2,
  School,
  GraduationCap,
  FileCheck2,
  BookOpen,
  Award,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export function HomeTierContainer() {
  const { isLise1, isLgs, mounted } = useGradeTier();
  const { user, profile, signInWithGoogle } = useAuth();
  const isAuthenticated = Boolean(user || profile);

  const renderAuthGate = (title: string, subtitle: string) => (
    <div className="rounded-3xl border border-indigo-200/90 bg-gradient-to-r from-indigo-50/90 via-white to-violet-50/90 p-8 sm:p-12 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg mb-5 ring-8 ring-indigo-500/10">
        <Lock className="h-8 w-8" />
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-black text-amber-700 dark:bg-amber-950/60 dark:border-amber-900/60 dark:text-amber-300 mb-3">
        <ShieldCheck className="h-4 w-4" />
        ÜYELİK ZORUNLUDUR
      </span>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-white border border-slate-300 px-6 py-3.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google ile Hızlı Giriş Yap</span>
        </button>
        <Link
          href="/kayit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>Ücretsiz Kayıt Ol</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Zaten bir hesabınız var mı?{' '}
        <Link href="/giris" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
          Giriş Yapın
        </Link>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 animate-pulse space-y-6">
        <div className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (isLise1) {
    return (
      <>
        {/* 9. Sınıf (Lise 1) Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50 py-12 dark:border-slate-800/80 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              {/* Kademe Değiştirici Butonları */}
              <div className="mb-4 flex justify-center">
                <GradeTierSwitcher variant="segmented" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>MEB 2026-2027 Yeni Ortak Yazılı &amp; Sınıf Geçme Sistemi</span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                9. Sınıf Yazılı Notu &amp;{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Takdir/Teşekkür Hesaplama
                </span>
              </h1>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:text-base leading-relaxed">
                Yazılı ve performans notlarını gir. Haftalık ders saati katsayılarına göre dönem ağırlıklı ortalamanı,
                belge durumunu ve <strong>üniversite yerleştirme puanına (YKS) eklenecek OBP katkını</strong> anında hesapla.
              </p>

              {/* Bilgilendirici Küçük İpuçları */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Türk Dili ve Edebiyatı 70 Barajı
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Takdir (85+) &amp; Teşekkür (70+)
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> 4 Yıllık OBP Simülasyonu
                </span>
              </div>

              {/* Hızlı Aksiyon Butonları */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/deneme-coz"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:from-emerald-700 hover:to-teal-700 transition"
                >
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span>MEB Ortak Yazılı Provalarını Çöz</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <Link
                  href="/lise1-konulari"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition shadow-2xs"
                >
                  <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                  <span>9. Sınıf Konu Rehberi</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <Link
                  href="/deneme-coz"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-1.5 text-xs font-black text-slate-950 shadow-xs hover:from-amber-400 hover:to-orange-400 transition"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>Özel Yazılı Testi Üret</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Sınıf İçerik Bölümü */}
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
            {!isAuthenticated ? (
              renderAuthGate(
                '9. Sınıf Yazılı Notu & OBP Hesaplama Modülü',
                'MEB 9. sınıf ortak yazılı notlarınızı hesaplamak, takdir/teşekkür durumunuzu görmek ve YKS OBP katkınızı takip edebilmek için lütfen ücretsiz üye olun veya giriş yapın.'
              )
            ) : (
              <>
                <UniversityRadarCard />
                <Lise1CalculatorForm />
              </>
            )}
          </div>
        </section>

        {/* 9. Sınıf Bilgilendirme ve MEB Yönetmeliği */}
        <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                MEB 9. Sınıf Yeni Sınıf Geçme ve Takdir/Teşekkür Kuralları
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Milli Eğitim Bakanlığı Ortaöğretim Kurumları Yönetmeliği&apos;ne göre 9. sınıf değerlendirme esasları:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Türk Dili ve Edebiyatı 70 Barajı
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Öğrencinin doğrudan sınıf geçebilmesi ve belge alabilmesi için Türk Dili ve Edebiyatı dersi dönem puanı en az 70.00 olmak zorundadır.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Takdir &amp; Teşekkür Belgesi
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ağırlıklı dönem puanı 70.00 - 84.99 arasında olanlara Teşekkür, 85.00 ve üzeri olanlara Takdir Belgesi verilir. Hiçbir dersin 50 altı olmaması şarttır.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. YKS ve OBP Katkısı
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lisede alınan her not 4 yıllık mezuniyet puanına yansır. 9. sınıf not ortalamanız, YKS yerleştirme puanınıza eklenecek OBP&apos;nin %25&apos;ini oluşturur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Varsayılan: 8. Sınıf LGS Deneyimi
  return (
    <>
      {/* LGS Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 py-12 dark:border-slate-800/80 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Segmented Switcher */}
            <div className="mb-4 flex justify-center">
              <GradeTierSwitcher variant="segmented" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>MEB Güncel Standart Sapma ve Ağırlık Katsayıları</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              LGS Puan &amp; Yüzdelik Dilim{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Hesaplama
              </span>
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:text-base leading-relaxed">
              Deneme sınavı doğru ve yanlışlarınızı girin. 3 yanlışın 1 doğruyu götürdüğü sistemde
              tahmini LGS standart puanınızı, yüzdelik diliminizi ve en çok net kaybettiğiniz
              dersleri anında görün.
            </p>

            {/* Bilgilendirici Küçük İpuçları */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Toplam 90 Soru
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> 100 - 500 Puan Aralığı
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> MEB Yığılmalı Yüzdelik Dilim
              </span>
            </div>

            {/* LGS Geri Sayım ve Deneme Çöz Butonu */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LgsCountdown variant="compact" />
              <Link
                href="/deneme-coz"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1 text-xs font-bold text-white shadow-xs hover:from-indigo-700 hover:to-violet-700 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Online Deneme Çöz</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/deneme-coz"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-3.5 py-1 text-xs font-black text-slate-950 shadow-xs hover:from-amber-400 hover:to-orange-400 transition"
              >
                <Wand2 className="h-3.5 w-3.5" />
                <span>Özel Pekiştirme Testi Üret</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hesaplama Modülü Bölümü */}
      <section id="hesaplama" className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
          {!isAuthenticated ? (
            renderAuthGate(
              'LGS Puan & Net Hesaplama ve Takip Modülü',
              '2027 LGS netlerinizi hesaplamak, deneme karnenizi kaydetmek, hedef lisenizin radarına bağlanmak ve Sokratik yapay zekâ koçuyla eksiklerinizi kapatmak için lütfen ücretsiz üye olun veya giriş yapın.'
            )
          ) : (
            <>
              <TargetHighSchoolCard />
              <DailyQuestCard />
              <LiveSundayExamCard />
              <LgsCalculatorForm />
            </>
          )}
        </div>
      </section>

      {/* LGS Bilgilendirme & Katsayılar Rehberi */}
      <section id="bilgi" className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              LGS Puanı ve Net Nasıl Hesaplanır?
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Milli Eğitim Bakanlığı standart hesaplama kılavuzuna göre:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                1. Net Hesaplama Formülü
              </h4>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Her test için ham puan (net) şu şekilde hesaplanır:
                <br />
                <code className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 font-mono text-[11px] text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  Net = Doğru Sayısı - (Yanlış Sayısı / 3)
                </code>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                2. Ağırlık Katsayıları
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>• Türkçe: <strong>4 katsayı</strong> (20 soru)</li>
                <li>• Matematik: <strong>4 katsayı</strong> (20 soru)</li>
                <li>• Fen Bilimleri: <strong>4 katsayı</strong> (20 soru)</li>
                <li>• İnkılap Tarihi: <strong>1 katsayı</strong> (10 soru)</li>
                <li>• Din Kültürü: <strong>1 katsayı</strong> (10 soru)</li>
                <li>• Yabancı Dil: <strong>1 katsayı</strong> (10 soru)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                3. Standart Sapma ve MSP
              </h4>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hesaplanan ağırlıklı netler, Türkiye genelindeki ortalama ve standart sapmaya göre
                standartlaştırılır. Taban puan 100 eklenerek en fazla 500 puan üretilir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
