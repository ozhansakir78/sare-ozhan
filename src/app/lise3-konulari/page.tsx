'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  LISE3_TOPICS_BY_COURSE,
  LISE3_COURSE_OPTIONS,
  Lise3CourseKey,
  getLise3CoursesByTrack,
} from '@/lib/lise3-topics';
import type { HighSchoolTrack } from '@/lib/field-selection';
import {
  analyzeEarlyTytProgress,
  TytSubjectKey,
} from '@/lib/early-tyt-engine';
import {
  BookOpen,
  School,
  Calculator,
  FlaskConical,
  Atom,
  Dna,
  Landmark,
  Globe2,
  Languages,
  BookHeart,
  ArrowRight,
  FileCheck2,
  Search,
  Compass,
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

function getLise3Icon(key: Lise3CourseKey) {
  const iconClass = 'h-5 w-5';
  switch (key) {
    case 'edebiyat':
      return <BookOpen className={iconClass} />;
    case 'matematik':
      return <Calculator className={iconClass} />;
    case 'fizik':
      return <Atom className={iconClass} />;
    case 'kimya':
      return <FlaskConical className={iconClass} />;
    case 'biyoloji':
      return <Dna className={iconClass} />;
    case 'tarih':
      return <Landmark className={iconClass} />;
    case 'cografya':
      return <Globe2 className={iconClass} />;
    case 'felsefe':
      return <Compass className={iconClass} />;
    case 'ingilizce':
      return <Languages className={iconClass} />;
    case 'din':
      return <BookHeart className={iconClass} />;
    default:
      return <School className={iconClass} />;
  }
}

export default function Lise3KonulariPage() {
  // Ana Sekme: Müfredat mı yoksa Erken TYT Radarı mı?
  const [activeTab, setActiveTab] = useState<'topics' | 'early_tyt'>('topics');

  // Müfredat Sekmesi Durumları
  const [selectedTrack, setSelectedTrack] = useState<HighSchoolTrack | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Erken TYT Radarı Durumları
  const [tytTrack, setTytTrack] = useState<HighSchoolTrack>('sayisal');
  const [turkceNet, setTurkceNet] = useState<number>(28);
  const [sosyalNet, setSosyalNet] = useState<number>(12);
  const [matematikNet, setMatematikNet] = useState<number>(18);
  const [fenNet, setFenNet] = useState<number>(8);
  const [weeklyHours, setWeeklyHours] = useState<number>(20);
  const [targetNet, setTargetNet] = useState<number>(90);

  // Erken TYT Analizi
  const earlyTytResult = useMemo(() => {
    return analyzeEarlyTytProgress({
      track: tytTrack,
      scores: {
        turkce: turkceNet,
        sosyal: sosyalNet,
        matematik: matematikNet,
        fen: fenNet,
      },
      weeklyStudyHours: weeklyHours,
      target12thGradeTytNet: targetNet,
    });
  }, [tytTrack, turkceNet, sosyalNet, matematikNet, fenNet, weeklyHours, targetNet]);

  const displayedCourses = selectedTrack === 'all'
    ? LISE3_COURSE_OPTIONS
    : getLise3CoursesByTrack(selectedTrack);

  const filteredCourses = displayedCourses.filter((c) => {
    if (selectedCourse !== 'all' && c.key !== selectedCourse) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 py-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Layers className="h-4 w-4" />
          <span>MEB 11. Sınıf (Lise 3) Alanlaşma &amp; ÖSYM YKS (AYT/TYT) Temeli</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          11. Sınıf Konuları &amp;{' '}
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
            Erken TYT Radarı
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          11. sınıf, YKS AYT&apos;nin omurgasını oluştururken, 9 ve 10. sınıf kazanımlarını pekiştiren Erken TYT başlangıcı için altın yıldır. İster alan bazlı ders kazanımlarını incele, ister Erken TYT denge motoruyla haftalık çalışma planını çıkar.
        </p>

        {/* Ana Sekme Değiştirici */}
        <div className="flex items-center justify-center gap-2 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('topics')}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-amber-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>11. Sınıf Konuları &amp; Alan Müfredatı</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('early_tyt')}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'early_tyt'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>⚡ Erken TYT Başlangıç &amp; İlerleme Radarı</span>
          </button>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 1. SEKME: 11. SINIF MÜFREDAT VE KAZANIMLARI */}
      {/* ==================================================================== */}
      {activeTab === 'topics' && (
        <div className="space-y-8">
          {/* Alan Filtreleme Butonları */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedTrack('all');
                setSelectedCourse('all');
              }}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedTrack === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Tüm Alanlar
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTrack('sayisal');
                setSelectedCourse('all');
              }}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedTrack === 'sayisal'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              🔬 Sayısal (MF)
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTrack('esit_agirlik');
                setSelectedCourse('all');
              }}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedTrack === 'esit_agirlik'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              ⚖️ Eşit Ağırlık (TM)
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTrack('sozel');
                setSelectedCourse('all');
              }}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedTrack === 'sozel'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              📜 Sözel (TS)
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTrack('dil');
                setSelectedCourse('all');
              }}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedTrack === 'dil'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              🌍 Yabancı Dil (DİL)
            </button>
          </div>

          {/* 11. Sınıf Stratejik Göstergeler */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AYT Soru Kapsamı
              </div>
              <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
                %55 - %60 Ağırlık
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                AYT Matematik, Fen ve Edebiyat-Sosyal testlerindeki soruların yarıdan fazlası 11. sınıf müfredatından sorulur.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                MEB Baraj Dersi
              </div>
              <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400">
                Edebiyat (70 Barajı)
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hangi alanda olursan ol, Türk Dili ve Edebiyatı dersinden doğrudan geçmek için yıl sonu ortalaması en az 70 olmalıdır.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Erken TYT Denge Kuralı
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                %70 AYT / %30 TYT
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                11. sınıfta çalışma süresinin %70&apos;i okul/AYT derslerine, %30&apos;u ise 9 ve 10. sınıf TYT tekrarına ayrılmalıdır.
              </p>
            </div>
          </section>

          {/* Arama & Ders Filtreleri */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="11. sınıf konusu veya kazanımı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {selectedTrack === 'all'
                  ? 'Tüm Alanlar (10 Ders)'
                  : `${selectedTrack.toUpperCase()} Alanı (${displayedCourses.length} Ders)`}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCourse('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  selectedCourse === 'all'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                Tüm Dersler
              </button>
              {displayedCourses.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCourse(c.key)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    selectedCourse === c.key
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </section>

          {/* Ders ve Konu Listesi */}
          <section className="space-y-6">
            {filteredCourses.map((course) => {
              const topics = LISE3_TOPICS_BY_COURSE[course.key] || [];
              const matchingTopics = topics.filter((t) =>
                searchQuery.trim() === ''
                  ? true
                  : t.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery.trim() !== '' && matchingTopics.length === 0) {
                return null;
              }

              return (
                <div
                  key={course.key}
                  className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:px-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl ${course.colorTheme.bg} ${course.colorTheme.text}`}>
                        {getLise3Icon(course.key)}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{course.name}</span>
                          {course.isPassingRequirement && (
                            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                              MEB BARAJ DERSİ (70)
                            </span>
                          )}
                        </h2>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Haftalık {course.weeklyHours} Saat | {course.modelName}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/deneme-coz"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                    >
                      <FileCheck2 className="h-3.5 w-3.5 text-amber-500" />
                      <span>11. Sınıf Yazılı Provasını Çöz</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Konu Satırları */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {matchingTopics.map((topicName, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 p-4 sm:px-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {topicName}
                            </div>
                            <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                              ÖSYM AYT &amp; MEB Ortak Yazılı Kazanımı
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/deneme-coz"
                          className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 transition"
                        >
                          Soru Çöz
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. SEKME: ERKEN TYT BAŞLANGIÇ & İLERLEME RADARI */}
      {/* ==================================================================== */}
      {activeTab === 'early_tyt' && (
        <div className="space-y-8">
          {/* Giriş & Simülatör Kartı */}
          <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent p-6 sm:p-8 dark:border-amber-500/10 dark:bg-slate-900/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Target className="h-3.5 w-3.5" />
                  <span>Kişiselleştirilmiş 11. Sınıf TYT Teşhis Motoru</span>
                </div>
                <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Mevcut TYT Netlerini Gir, 12. Sınıfa 1-0 Önde Başla
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  11. sınıf yoğun geçerken 9 ve 10. sınıf konularını unutmamak için haftalık çalışma dengeni otomatik kur.
                </p>
              </div>

              {/* Alan Seçimi */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTytTrack('sayisal')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    tytTrack === 'sayisal'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  🔬 Sayısal
                </button>
                <button
                  type="button"
                  onClick={() => setTytTrack('esit_agirlik')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    tytTrack === 'esit_agirlik'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  ⚖️ Eşit Ağırlık
                </button>
                <button
                  type="button"
                  onClick={() => setTytTrack('sozel')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    tytTrack === 'sozel'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  📜 Sözel
                </button>
                <button
                  type="button"
                  onClick={() => setTytTrack('dil')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    tytTrack === 'dil'
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  🌍 Dil
                </button>
              </div>
            </div>

            {/* Net Girişleri */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Türkçe (40 Soru)
                </label>
                <div className="mt-1.5 flex items-center justify-between">
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    value={turkceNet}
                    onChange={(e) => setTurkceNet(Number(e.target.value))}
                    className="w-20 rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-black text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <span className="text-xs font-bold text-slate-400">Net</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Temel Mat (40 Soru)
                </label>
                <div className="mt-1.5 flex items-center justify-between">
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    value={matematikNet}
                    onChange={(e) => setMatematikNet(Number(e.target.value))}
                    className="w-20 rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-black text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <span className="text-xs font-bold text-slate-400">Net</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Fen Bilimleri (20 Soru)
                </label>
                <div className="mt-1.5 flex items-center justify-between">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={fenNet}
                    onChange={(e) => setFenNet(Number(e.target.value))}
                    className="w-20 rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-black text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <span className="text-xs font-bold text-slate-400">Net</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Sosyal Bilimler (20 Soru)
                </label>
                <div className="mt-1.5 flex items-center justify-between">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={sosyalNet}
                    onChange={(e) => setSosyalNet(Number(e.target.value))}
                    className="w-20 rounded-xl border border-slate-300 bg-slate-50 p-2 text-center text-sm font-black text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <span className="text-xs font-bold text-slate-400">Net</span>
                </div>
              </div>
            </div>

            {/* Çalışma Saati ve Hedef Ayarları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Haftalık Çalışma Kapasitesi
                  </div>
                  <div className="text-[11px] text-slate-400">Okul dışı ders &amp; soru saati</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="40"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="w-16 rounded-xl border border-slate-300 bg-slate-50 p-1.5 text-center text-xs font-black text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <span className="text-xs font-bold text-slate-500">Saat / Hafta</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    12. Sınıfa Başlama TYT Hedefi
                  </div>
                  <div className="text-[11px] text-slate-400">Alanına göre önerilen: {earlyTytResult.target12thGradeTytNet} Net</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="40"
                    max="120"
                    value={targetNet}
                    onChange={(e) => setTargetNet(Number(e.target.value))}
                    className="w-16 rounded-xl border border-slate-300 bg-slate-50 p-1.5 text-center text-xs font-black text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-400"
                  />
                  <span className="text-xs font-bold text-slate-500">Net Hedefi</span>
                </div>
              </div>
            </div>
          </section>

          {/* TEŞHİS VE SKOR KARTI */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:col-span-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Mevcut TYT Toplamı
              </div>
              <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                {earlyTytResult.currentTotalNet}{' '}
                <span className="text-sm font-normal text-slate-400">/ 120</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                {earlyTytResult.levelTitle}
              </div>
              <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-500">
                12. Sınıf Hedefine Kalan Fark:{' '}
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {earlyTytResult.netGap > 0 ? `+${earlyTytResult.netGap} Net` : 'Hedefe Ulaşıldı 🎉'}
                </span>
              </div>
            </div>

            {/* 70/30 Denge Kartı */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:col-span-3 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    11. Sınıf Altın Kuralı: 70/30 Zaman Yönetimi
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Haftalık Soru Hedefi:{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-black">
                    {earlyTytResult.timeAllocation.targetWeeklyQuestions} Soru
                  </span>
                </div>
              </div>

              {/* Çift Çubuk */}
              <div className="space-y-1.5">
                <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    style={{ width: `${earlyTytResult.timeAllocation.aytPercentage}%` }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                  />
                  <div
                    style={{ width: `${earlyTytResult.timeAllocation.tytPercentage}%` }}
                    className="bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-500"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-amber-600 dark:text-amber-400">
                    %70 11. Sınıf AYT ({earlyTytResult.timeAllocation.aytHours} Saat)
                  </span>
                  <span className="text-sky-600 dark:text-sky-400">
                    %30 9-10. Sınıf TYT ({earlyTytResult.timeAllocation.tytHours} Saat)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {earlyTytResult.pedagogicalSummary}
              </p>
            </div>
          </section>

          {/* Kritik Darboğazlar (Bottlenecks) */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              <span>Koçluk Tespiti &amp; Kritik Darboğaz Analizi</span>
            </h3>
            <div className="space-y-2">
              {earlyTytResult.criticalBottlenecks.map((msg, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 leading-relaxed"
                >
                  {msg}
                </div>
              ))}
            </div>
          </section>

          {/* 4 Ders Strateji Kartları */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Ders Bazlı Erken TYT Yol Haritası
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['turkce', 'matematik', 'fen', 'sosyal'] as TytSubjectKey[]).map((key) => {
                const strat = earlyTytResult.subjectStrategies[key];
                return (
                  <div
                    key={key}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {strat.subjectName}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            strat.status === 'acil_oncelik'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                              : strat.status === 'gelistirilmeli'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                        >
                          {strat.status === 'acil_oncelik' ? 'Acil Öncelik' : strat.status === 'gelistirilmeli' ? 'Geliştirilmeli' : 'Güçlü'}
                        </span>
                      </div>

                      <div className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                        {strat.currentNet}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          (Hedef: {strat.targetNetForTrack})
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {strat.guidanceNote}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      Haftalık Soru Hedefi: ~{strat.weeklyTargetQuestions} Soru
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 9 ve 10. Sınıf Öncelikli Temel Konular */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  9 ve 10. Sınıftan Hemen Kapatılması Gereken Omurga Konular
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Bu konular TYT&apos;de soru getirdiği gibi, 11 ve 12. sınıf AYT konularının doğrudan temelini teşkil eder.
                </p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                AYT Geçiş Köprüsü
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {earlyTytResult.priorityFoundationalTopics.map((topic) => (
                <div key={topic.id} className="py-3.5 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {topic.grade}. Sınıf
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {topic.topicName}
                      </span>
                    </div>
                    <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                      {topic.priority}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Neden Hayati? </span>
                    {topic.whyVital}
                  </div>

                  <div className="text-[11px] text-amber-600 dark:text-amber-400">
                    <span className="font-semibold">AYT Bağlantısı: </span>
                    {topic.aytConnection}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7 Günlük Dengeli Çalışma Planı */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span>Örnek 7 Günlük AYT (%70) &amp; TYT (%30) Çalışma Çizelgesi</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Gün</th>
                    <th className="pb-3 font-bold">11. Sınıf AYT Odağı (%70)</th>
                    <th className="pb-3 font-bold">Erken TYT Tekrar Odağı (%30)</th>
                    <th className="pb-3 font-bold text-right">Hedef Soru</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {earlyTytResult.weeklyPlan.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 font-bold text-slate-900 dark:text-white">{d.day}</td>
                      <td className="py-3 text-amber-600 dark:text-amber-400 font-medium">{d.aytFocus}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">{d.tytFocus}</td>
                      <td className="py-3 font-bold text-right text-slate-800 dark:text-slate-200">
                        ~{d.targetQuestionCount} Soru
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Önerilen Test Havuzu */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Platformumuzdaki Doğrulanmış Prova ve Pekiştirme Testleri
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                9, 10 ve 11. sınıf deneme havuzlarımızdaki sorularla hemen pratik yapabilirsin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {earlyTytResult.recommendedExams.map((exam) => (
                <div
                  key={exam.slug}
                  className="rounded-2xl border border-slate-200 p-4 hover:border-amber-500 transition dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {exam.tier.toUpperCase()}
                    </span>
                    <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {exam.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {exam.reason}
                    </p>
                  </div>

                  <Link
                    href={`/deneme-coz?slug=${exam.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                  >
                    <span>Hemen Çöz ({exam.questionCount} Soru)</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
