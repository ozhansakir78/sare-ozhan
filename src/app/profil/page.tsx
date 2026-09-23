'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getStoredExams } from '@/lib/exam-storage';
import type { SavedStudentExam } from '@/types/exam';
import { getStoredQuestions } from '@/lib/question-storage';
import { getStreakData, StreakData, DEFAULT_STREAK } from '@/lib/streak-storage';
import { getLeaderboardEntries } from '@/lib/leaderboard-storage';
import { LGS_HIGH_SCHOOLS } from '@/lib/lgs-high-schools';
import { SchoolAutocompleteInput } from '@/components/school/SchoolAutocompleteInput';
import { useGradeTier } from '@/lib/grade-tier';
import { GradeTierSwitcher } from '@/components/ui/GradeTierSwitcher';
import { UniversityRadarCard } from '@/components/target/UniversityRadarCard';
import {
  User,
  School,
  Target,
  Trophy,
  Flame,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Save,
  ShieldCheck,
  Zap,
  ChevronRight,
  BrainCircuit,
  Compass,
} from 'lucide-react';

export default function ProfilPage() {
  const router = useRouter();
  const { profile, user, updateProfile, signOut, isPro } = useAuth();
  const { isLise1 } = useGradeTier();

  const [mounted, setMounted] = useState(false);
  const [exams, setExams] = useState<SavedStudentExam[]>([]);
  const [wrongQuestionsCount, setWrongQuestionsCount] = useState(0);
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Form State
  const [displayName, setDisplayName] = useState('');
  const [targetSchool, setTargetSchool] = useState('');
  const [targetScore, setTargetScore] = useState<number>(485);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // Denemeleri yükle
    const storedExams = getStoredExams();
    setExams(storedExams);

    // Yanlış defteri sayısını al
    const questions = getStoredQuestions();
    setWrongQuestionsCount(questions.length);

    // Seri bilgisini al
    setStreak(getStreakData());

    // Sıralamayı hesapla
    const leaderboard = getLeaderboardEntries('all-time');
    if (storedExams.length > 0) {
      const best = Math.max(...storedExams.map((e) => e.totalScore));
      const higherCount = leaderboard.filter((e) => e.score > best).length;
      setUserRank(higherCount + 1);
    } else {
      const myIdx = leaderboard.findIndex((e) => e.isCurrentUser);
      if (myIdx !== -1) {
        setUserRank(myIdx + 1);
      }
    }
  }, []);

  // Profil verilerini form state'ine senkronize et
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setTargetSchool(profile.target_high_school || 'Kabataş Erkek Lisesi');
      setTargetScore(Number(profile.target_score) || 485);
    } else if (user?.email) {
      setDisplayName(user.email.split('@')[0]);
    }
  }, [profile, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const res = await updateProfile({
      display_name: displayName.trim(),
      target_high_school: targetSchool.trim(),
      target_score: targetScore,
    });

    setIsSaving(false);

    if (res.error) {
      setSaveError(res.error);
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Giriş Yapılmamışsa
  if (!user && !profile) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <User className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900 dark:text-white">
            Öğrenci Profiline Erişmek İçin Giriş Yapın
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Deneme netlerinizi, yanlış defterinizi ve hedeflerinizi yönetmek için ücretsiz hesabınıza giriş yapın.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/giris"
              className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="flex-1 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
            >
              Ücretsiz Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // İstatistik Hesaplamaları
  const totalExams = exams.length;
  const bestScore = totalExams > 0 ? Math.max(...exams.map((e) => e.totalScore)) : 0;
  const avgScore =
    totalExams > 0
      ? (exams.reduce((acc, curr) => acc + curr.totalScore, 0) / totalExams).toFixed(1)
      : '0.0';
  const avgNet =
    totalExams > 0
      ? (exams.reduce((acc, curr) => acc + curr.totalNet, 0) / totalExams).toFixed(1)
      : '0.0';

  // Seçilen hedefe göre fark
  const targetDiff = bestScore > 0 ? (targetScore - bestScore).toFixed(1) : targetScore.toFixed(1);
  const isTargetAchieved = bestScore >= targetScore && bestScore > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Üst Profil Başlık Kartı */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Sol: Avatar ve Temel Bilgiler */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-2xl sm:text-3xl font-black text-white shadow-lg ring-4 ring-white/10">
                {(displayName || 'Ö')[0].toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {displayName || 'Öğrenci'}
                  </h1>
                  {isPro ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[11px] font-black text-amber-300">
                      <Sparkles className="h-3 w-3 text-amber-400" /> PRO Üye
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 text-[11px] font-bold text-indigo-200">
                      <ShieldCheck className="h-3 w-3" /> Ücretsiz Hesap
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-300 flex items-center gap-1.5">
                  <span>{user?.email || profile?.email || 'Yerel Öğrenci Hesabı'}</span>
                  <span>&bull;</span>
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <School className="h-3.5 w-3.5" /> {targetSchool}
                  </span>
                </p>

                <p className="mt-1 text-[11px] text-indigo-200/80">
                  {isLise1 ? 'Lise 1 Modu: Hedef Üniversite & OBP Takibi' : `Hedef LGS Puanı: `}
                  {!isLise1 && <strong className="text-white font-bold">{targetScore} Puan</strong>}
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[11px] text-slate-300 font-medium">Aktif Kademe:</span>
                  <GradeTierSwitcher variant="dropdown" />
                </div>
              </div>
            </div>

            {/* Sağ: Aksiyon Butonları */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/deneme-coz"
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md transition cursor-pointer"
              >
                <span>Hemen Deneme Çöz</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6'lı KPI / Performans Sayaçları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Çözülen Deneme */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">Kayıtlı Deneme</span>
              <FileSpreadsheet className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {totalExams}
            </div>
            <div className="text-[10px] text-slate-400">Sınav Tamamlandı</div>
          </div>

          {/* En Yüksek Puan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">En İyi Skor</span>
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {bestScore > 0 ? bestScore.toFixed(1) : '---'}
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
              {bestScore > 0 ? 'Rekor Puan' : 'Henüz Sınav Yok'}
            </div>
          </div>

          {/* Ortalama Net */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">Ortalama Net</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {avgNet}
            </div>
            <div className="text-[10px] text-slate-400">/ 90 Toplam Soru</div>
          </div>

          {/* Yanlış Defteri */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">Yanlış Defteri</span>
              <BookOpen className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {wrongQuestionsCount}
            </div>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
              Kayıtlı Soru
            </div>
          </div>

          {/* Günlük Seri */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">Günlük Seri</span>
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {streak.currentStreak}g
            </div>
            <div className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold">
              Rekor: {streak.bestStreak}g
            </div>
          </div>

          {/* Lig Sıralaması */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-bold">Canlı Lig</span>
              <Compass className="h-4 w-4 text-violet-500" />
            </div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {userRank ? `#${userRank}` : '---'}
            </div>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
              Türkiye Sırası
            </div>
          </div>
        </div>

        {/* Orta İkili Blok: Hedef Analizi & Bilgi Düzenleme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sol Kolon: Hedef Radarı (7 Kolon) */}
          {isLise1 ? (
            <div className="lg:col-span-7">
              <UniversityRadarCard />
            </div>
          ) : (
            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Hedef Lise ve Başarı Radarı
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Mevcut puanın ile hedefin arasındaki gerçek mesafe analizi
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl">
                Hedef: {targetScore}P
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {/* Hedef Okul Başlığı */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex items-center gap-3">
                  <School className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      {targetSchool}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Hedeflenen Lise Taban Puanı: ~{targetScore}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400">
                  En İyi Puanın: {bestScore > 0 ? bestScore.toFixed(1) : '0.0'}
                </span>
              </div>

              {/* İlerleme Çubuğu */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Hedefe Ulaşma Oranı
                  </span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400">
                    %{Math.min(100, Math.round((bestScore / targetScore) * 100)) || 0}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-indigo-600 to-emerald-500 transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.round((bestScore / targetScore) * 100)) || 2}%`,
                    }}
                  />
                </div>
              </div>

              {/* Koçluk Tavsiyesi */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50 text-xs">
                {isTargetAchieved ? (
                  <div className="flex items-start gap-2.5 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Tebrikler! En iyi puanın hedefini aştı ({bestScore.toFixed(1)}P). Artık hedefini korumalı ve zorlandığın branşlardaki yanlışlarını sıfırlamalısın.
                    </span>
                  </div>
                ) : bestScore > 0 ? (
                  <div className="flex items-start gap-2.5 text-indigo-950 dark:text-indigo-200">
                    <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-black">{targetSchool}</strong> için yaklaşık{' '}
                      <strong className="font-black underline">{targetDiff} puana</strong> daha ihtiyacın var.
                      Günde ortalama 2 net matematik veya fen artışı seni bu hedefe taşıyacaktır!
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <Clock className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>
                      İlk deneme sonucunu eklediğinde hedefine kaç net ve puan kaldığını yapay zekâ koçun otomatik hesaplayacaktır.
                    </span>
                  </div>
                )}
              </div>

              {/* Hızlı Kısayollar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <Link
                  href="/deneme-gecmisi"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-indigo-300 hover:shadow-xs text-center transition dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <FileSpreadsheet className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Denemelerim</span>
                </Link>

                <Link
                  href="/yanlis-defteri"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-rose-300 hover:shadow-xs text-center transition dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <BookOpen className="h-4 w-4 text-rose-600 dark:text-rose-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Yanlış Defteri</span>
                </Link>

                <Link
                  href="/odaklanma-odasi"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-amber-300 hover:shadow-xs text-center transition dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <BrainCircuit className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Odak Odası</span>
                </Link>

                <Link
                  href="/veli-raporu"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-emerald-300 hover:shadow-xs text-center transition dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Veli Raporu</span>
                </Link>
              </div>
            </div>
          </div>
          )}

          {/* Sağ Kolon: Profil ve Hedef Güncelleme Formu (5 Kolon) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Profil &amp; Hedef Bilgileri
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  İsmini ve hedef lise tercihini istediğin zaman güncelle
                </p>
              </div>
            </div>

            {saveSuccess && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Profil bilgileriniz başarıyla kaydedildi!</span>
              </div>
            )}

            {saveError && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              {/* Ad Soyad */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Hedef Lise Seçimi / Girişi (Akıllı Arama ve Otomatik Düzeltme) */}
              <SchoolAutocompleteInput
                value={targetSchool}
                onChange={(schoolName, minScore) => {
                  setTargetSchool(schoolName);
                  if (minScore) {
                    setTargetScore(minScore);
                  }
                }}
                label="Hedef Lise"
                placeholder="Örn: Kabataş Erkek Lisesi, Galatasaray Lisesi..."
              />

              {/* Hedef LGS Puanı */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Hedef Puan
                  </label>
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                    {targetScore} Puan
                  </span>
                </div>
                <input
                  type="range"
                  min={350}
                  max={500}
                  step={1}
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>350 Puan</span>
                  <span>450 Puan</span>
                  <span>500 (Tam Puan)</span>
                </div>
              </div>

              {/* Kaydet Butonu */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition cursor-pointer disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
