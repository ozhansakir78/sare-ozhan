'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LISE2_TOPICS_BY_COURSE,
  LISE2_COURSE_OPTIONS,
  Lise2CourseKey,
} from '@/lib/lise2-topics';
import {
  calculateFieldSelection,
  CourseGradeInput,
  StudentInterestsInput,
  FieldSelectionResult,
} from '@/lib/field-selection';
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
  Sparkles,
  FileCheck2,
  Search,
  Compass,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Info,
} from 'lucide-react';

function getLise2Icon(key: Lise2CourseKey) {
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

export default function Lise2KonulariPage() {
  const [activeTab, setActiveTab] = useState<'topics' | 'simulator'>('topics');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Alan Seçimi Simülatörü Durumu
  const [grades, setGrades] = useState<CourseGradeInput>({
    matematik: 80,
    fizik: 75,
    kimya: 75,
    biyoloji: 75,
    edebiyat: 80,
    tarih: 75,
    cografya: 75,
    felsefe: 75,
    din: 80,
    ingilizce: 75,
  });

  const [interests, setInterests] = useState<StudentInterestsInput>({
    math: 4,
    science: 4,
    literature: 3,
    social: 3,
    language: 3,
  });

  const simulationResult: FieldSelectionResult = calculateFieldSelection(grades, interests);

  const filteredCourses = LISE2_COURSE_OPTIONS.filter((c) => {
    if (selectedCourse !== 'all' && c.key !== selectedCourse) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 py-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
          <School className="h-4 w-4" />
          <span>MEB 10. Sınıf (Lise 2) &amp; 11. Sınıf Alan Seçimi Ekosistemi</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          10. Sınıf Konuları &amp;{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Alan Seçimi Rehberi
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          MEB 10. sınıf müfredatındaki 10 temel dersin (Matematik, Fizik, Kimya, Biyoloji, Türk Dili ve Edebiyatı, Tarih, Coğrafya, Felsefe, İngilizce, Din Kültürü) ünite kazanımları, yazılı provaları ve 11. sınıfa geçerken Sayısal, Eşit Ağırlık, Sözel ve Dil seçim simülatörü.
        </p>

        {/* Tab Seçimi: Konular vs Simülatör */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('topics')}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Müfredat &amp; Ünite Konuları</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Compass className="h-4 w-4 text-purple-400" />
            <span>🧭 11. Sınıf Alan Seçimi Radarı</span>
          </button>

          <Link
            href="/deneme-coz"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition"
          >
            <FileCheck2 className="h-4 w-4 text-blue-500" />
            <span>10. Sınıf Yazılı Provalarını Çöz</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* MEB 10. Sınıf Bilgi Kartları */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            MEB Baraj Dersi
          </div>
          <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <span>Edebiyat (70 Barajı)</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            MEB Ortaöğretim Yönetmeliği Madde 58: Türk Dili ve Edebiyatı yıl sonu notu 70 altında olan öğrenci sorumlu geçer.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Felsefe ile İlk Tanışma
          </div>
          <div className="mt-2 text-2xl font-black text-indigo-600 dark:text-indigo-400">
            Haftalık 2 Saat
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            10. sınıfta felsefe dersi başlar: epistemoloji, ontoloji ve mantıksal akıl yürütme YKS TYT/AYT temeli atılır.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            11. Sınıf Alan Seçimi
          </div>
          <div className="mt-2 text-2xl font-black text-purple-600 dark:text-purple-400">
            Kritik Yol Ayrımı
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Sayısal (MF), Eşit Ağırlık (TM), Sözel (TS) ve Dil seçimleri 10. sınıfın 2. döneminde e-Okul üzerinden yapılır.
          </p>
        </div>
      </section>

      {/* TAB 1: ALAN SEÇİMİ SİMÜLATÖRÜ */}
      {activeTab === 'simulator' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-purple-950/20 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-600 dark:text-purple-400 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Akademik Başarı + İlgi Yönelim Analitiği</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                11. Sınıf Alan Seçimi Uyum Radarı
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Ders notlarını ve ilgi düzeylerini gir; ÖSYM YKS katsayılarına ve MEB alanlaşma kriterlerine göre sana en uygun akademik alanı, güçlü yönlerini ve hedefleyebileceğin üniversite bölümlerini anında gör.
              </p>
            </div>

            {/* Giriş Paneli */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sol: Ders Notları Girişi */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-500" />
                  <span>Ders Başarı Notları (0 - 100)</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(
                    [
                      ['matematik', 'Matematik'],
                      ['fizik', 'Fizik'],
                      ['kimya', 'Kimya'],
                      ['biyoloji', 'Biyoloji'],
                      ['edebiyat', 'Edebiyat'],
                      ['tarih', 'Tarih'],
                      ['cografya', 'Coğrafya'],
                      ['felsefe', 'Felsefe'],
                      ['ingilizce', 'İngilizce'],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={grades[key] ?? 70}
                        onChange={(e) =>
                          setGrades({
                            ...grades,
                            [key]: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sağ: Öğrenci İlgi Anketi */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-purple-500" />
                  <span>Kişisel İlgi ve Yönelim (1: Düşük - 5: Çok Yüksek)</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { key: 'math', label: 'Matematik & Problem Çözme İlgisi' },
                    { key: 'science', label: 'Fen Bilimleri, Laboratuvar & Deney İlgisi' },
                    { key: 'literature', label: 'Edebiyat, Kitap Okuma & Yazma İlgisi' },
                    { key: 'social', label: 'Tarih, Toplum, Felsefe & Siyaset İlgisi' },
                    { key: 'language', label: 'Yabancı Dil, Kültürler & Çeviri İlgisi' },
                  ].map(({ key, label }) => {
                    const val = interests[key as keyof StudentInterestsInput] ?? 3;
                    return (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">
                          {label}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() =>
                                setInterests({
                                  ...interests,
                                  [key]: num,
                                })
                              }
                              className={`h-7 w-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                                val === num
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sonuç Kartı */}
            <div className="rounded-2xl border border-purple-200 bg-white p-6 dark:border-purple-900/40 dark:bg-slate-800/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 pb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Önerilen Birincil Alan
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {simulationResult.primaryTrack.trackName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {simulationResult.primaryTrack.description}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 px-4 py-2">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-bold">Uyum Skoru</div>
                    <div className="text-2xl font-black text-purple-700 dark:text-purple-300">
                      %{simulationResult.primaryTrack.compatibilityScore}
                    </div>
                  </div>
                  <div className="text-center rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Uyum Düzeyi</div>
                    <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                      {simulationResult.primaryTrack.suitabilityLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Alan Karşılaştırma Çubukları */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tüm Alanların Uyum Karşılaştırması
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {simulationResult.allTracks.map((tr) => (
                    <div
                      key={tr.track}
                      className={`rounded-xl border p-3.5 space-y-2 ${
                        tr.track === simulationResult.primaryTrack.track
                          ? 'border-purple-500/50 bg-purple-50/40 dark:border-purple-500/30 dark:bg-purple-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900 dark:text-white">{tr.shortName}</span>
                        <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                          %{tr.compatibilityScore}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${tr.compatibilityScore}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {tr.trackName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hedef Üniversite Bölümleri ve Meslekler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-500" />
                    <span>Hedefleyebileceğin Başlıca Üniversite Bölümleri</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {simulationResult.primaryTrack.prospectiveMajors.map((major) => (
                      <span
                        key={major}
                        className="rounded-lg border border-slate-200 bg-slate-100/70 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {major}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-indigo-500" />
                    <span>Geleceğin Kariyer Fırsatları</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {simulationResult.primaryTrack.topCareers.map((career) => (
                      <span
                        key={career}
                        className="rounded-lg border border-indigo-200/50 bg-indigo-50/60 px-2.5 py-1 text-xs text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pedagojik Rehberlik Raporu */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700/60 dark:bg-slate-900 dark:text-slate-400 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span>SınavKoçu Rehberlik Değerlendirmesi:</span>
                </div>
                <p className="leading-relaxed">{simulationResult.guidanceSummary}</p>
              </div>

              {/* MEB Mevzuat Kuralları */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  MEB 11. Sınıf Alan Seçim Mevzuatı Notları:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {simulationResult.mebSelectionRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: MÜFREDAT VE KONULAR */}
      {activeTab === 'topics' && (
        <>
          {/* Arama & Ders Filtre Çubuğu */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Arama */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Konu veya ünite adı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Ders Sayısı Rozeti */}
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Toplam <strong>10 Temel Ders</strong> | TTKB Resmi Müfredatı
              </div>
            </div>

            {/* Ders Hapları */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCourse('all')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedCourse === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                }`}
              >
                Tüm Dersler (10)
              </button>

              {LISE2_COURSE_OPTIONS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCourse(c.key)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    selectedCourse === c.key
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                  }`}
                >
                  {getLise2Icon(c.key)}
                  <span>{c.name.split(' (')[0]}</span>
                  {c.isPassingRequirement && (
                    <span className="ml-1 rounded-sm bg-rose-500 text-[10px] text-white px-1 py-0.2">
                      Baraj
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Ders ve Konu Listesi */}
          <section className="space-y-6">
            {filteredCourses.map((course) => {
              const allTopics = LISE2_TOPICS_BY_COURSE[course.key] || [];
              const matchingTopics = allTopics.filter((t) =>
                searchQuery.trim() === ''
                  ? true
                  : t.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (matchingTopics.length === 0) return null;

              return (
                <div
                  key={course.key}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Ders Başlığı */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 sm:px-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-2xl p-2.5 ${course.colorTheme.bg} ${course.colorTheme.text} border ${course.colorTheme.border}`}
                      >
                        {getLise2Icon(course.key)}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{course.name}</span>
                          {course.isPassingRequirement && (
                            <span className="rounded-md bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5">
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
                      <FileCheck2 className="h-3.5 w-3.5 text-blue-500" />
                      <span>Bu Dersin Yazılı Provasını Çöz</span>
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
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              MEB Ortak Yazılı Kazanımı
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/deneme-coz"
                          className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40 transition"
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
        </>
      )}
    </div>
  );
}
