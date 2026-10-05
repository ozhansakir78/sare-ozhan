'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { OnlineExam, OnlineExamTier } from '@/types/online-exam';
import { ExamCard } from '@/components/exam-session/ExamCard';
import { getOnlineExams } from '@/lib/online-exams-data';
import { LGS_COURSE_OPTIONS } from '@/lib/lgs-topics';
import { LISE1_COURSE_OPTIONS } from '@/lib/lise1-topics';
import { LISE2_COURSE_OPTIONS } from '@/lib/lise2-topics';
import { LISE3_COURSE_OPTIONS } from '@/lib/lise3-topics';
import { useGradeTier } from '@/lib/grade-tier';
import {
  getAllSavedExamProgress,
  removeSavedExamProgress,
  SavedExamProgress,
} from '@/lib/exam-progress-storage';
import {
  Sparkles,
  Calculator,
  BookOpen,
  Atom,
  Compass,
  Trophy,
  GraduationCap,
  School,
  FileCheck2,
  CheckCircle2,
  Clock,
  PlayCircle,
  Layers,
} from 'lucide-react';

const YKS_COURSE_FILTERS = [
  { key: 'tyt', name: 'TYT Denemeleri' },
  { key: 'ayt-matematik', name: 'AYT Matematik' },
  { key: 'tyt-matematik', name: 'TYT Matematik' },
  { key: 'ayt-fizik', name: 'AYT Fizik' },
  { key: 'ayt-kimya', name: 'AYT Kimya' },
  { key: 'ayt-biyoloji', name: 'AYT Biyoloji' },
  { key: 'ayt-edebiyat', name: 'AYT Edebiyat' },
  { key: 'tyt-turkce', name: 'TYT Türkçe' },
  { key: 'ydt-ingilizce', name: 'YDT İngilizce' },
];

interface ExamCatalogGridProps {
  initialExams: OnlineExam[];
  initialTier?: OnlineExamTier;
  initialFilter?: string;
}

function ExamCatalogGridContent({
  initialExams,
  initialTier,
  initialFilter,
}: ExamCatalogGridProps) {
  const { tier: activeGradeTier, setTier: setActiveGradeTier } = useGradeTier();
  const searchParams = useSearchParams();

  const queryTier = searchParams.get('tier') as OnlineExamTier | null;
  const queryFilter = searchParams.get('filter');

  const [exams, setExams] = useState<OnlineExam[]>(initialExams);
  const [selectedTier, setSelectedTier] = useState<OnlineExamTier>(
    queryTier || initialTier || activeGradeTier || 'lgs'
  );
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>(
    queryFilter || initialFilter || 'all'
  );

  // URL query parametreleri veya global kademe değiştiğinde filtreyi güncelle
  useEffect(() => {
    if (queryTier && ['lgs', 'lise1', 'lise2', 'lise3', 'yks'].includes(queryTier)) {
      setSelectedTier(queryTier);
    } else if (activeGradeTier) {
      setSelectedTier(activeGradeTier);
    }

    if (queryFilter) {
      setSelectedSubFilter(queryFilter);
    }
  }, [queryTier, queryFilter, activeGradeTier]);

  const [savedExams, setSavedExams] = useState<SavedExamProgress[]>([]);

  const loadSavedExams = useCallback(() => {
    setSavedExams(getAllSavedExamProgress(selectedTier));
  }, [selectedTier]);

  useEffect(() => {
    loadSavedExams();
    window.addEventListener('exam_progress_updated', loadSavedExams);
    return () => window.removeEventListener('exam_progress_updated', loadSavedExams);
  }, [loadSavedExams]);

  useEffect(() => {
    // Client hydration: LocalStorage'daki özel denemelerle birleştir
    const clientExams = getOnlineExams();
    if (clientExams.length !== exams.length) {
      setExams(clientExams);
    }
  }, [exams.length]);

  const handleTierSwitch = (newTier: OnlineExamTier) => {
    setSelectedTier(newTier);
    setSelectedSubFilter('all');
    setActiveGradeTier(newTier);
  };

  // 1. Kademe Filtresi (Her kademe kesinlikle kendi sınavlarını gösterir)
  const tierExams = exams.filter((exam) => {
    if (selectedTier === 'lgs') {
      return !exam.tier || exam.tier === 'lgs';
    }
    return exam.tier === selectedTier;
  });

  const customExamsCount = tierExams.filter(
    (e) => e.isCustomGenerated || e.id.startsWith('custom-ai') || e.slug.startsWith('ozel-test')
  ).length;

  const handleDeleteCustomExam = (examId: string) => {
    try {
      const raw = localStorage.getItem('lgs_custom_exams_v1');
      if (raw) {
        const list: OnlineExam[] = JSON.parse(raw);
        const updated = list.filter((e) => e.id !== examId);
        localStorage.setItem('lgs_custom_exams_v1', JSON.stringify(updated));
        setExams((prev) => prev.filter((e) => e.id !== examId));
      }
    } catch (e) {
      console.error('Delete custom exam error:', e);
    }
  };

  // 2. Alt Filtre (Genel, Yazılı, TYT, Özel veya Ders)
  const filteredExams = tierExams.filter((exam) => {
    if (selectedSubFilter === 'all') return true;
    if (selectedSubFilter === 'custom') {
      return exam.isCustomGenerated || exam.id.startsWith('custom-ai') || exam.slug.startsWith('ozel-test');
    }
    if (selectedSubFilter === 'full') return exam.type === 'full';
    if (selectedSubFilter === 'yazili') return exam.type === 'yazili';
    if (selectedSubFilter === 'tyt') return exam.type === 'tyt';
    return exam.courseKey === selectedSubFilter;
  });

  const lgsCount = exams.filter((e) => !e.tier || e.tier === 'lgs').length;
  const lise1Count = exams.filter((e) => e.tier === 'lise1').length;
  const lise2Count = exams.filter((e) => e.tier === 'lise2').length;
  const lise3Count = exams.filter((e) => e.tier === 'lise3').length;
  const yksCount = exams.filter((e) => e.tier === 'yks').length;

  return (
    <div className="space-y-6">
      {/* Üst Kademe Sekmeleri (Tüm 5 Kademe) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 w-fit">
        {/* LGS */}
        <button
          type="button"
          onClick={() => handleTierSwitch('lgs')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lgs'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>8. Sınıf LGS</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lgs' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lgsCount}
          </span>
        </button>

        {/* 9. Sınıf */}
        <button
          type="button"
          onClick={() => handleTierSwitch('lise1')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lise1'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <School className="h-3.5 w-3.5" />
          <span>9. Sınıf Yazılı</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lise1' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lise1Count}
          </span>
        </button>

        {/* 10. Sınıf */}
        <button
          type="button"
          onClick={() => handleTierSwitch('lise2')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lise2'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <Compass className="h-3.5 w-3.5" />
          <span>10. Sınıf Yazılı</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lise2' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lise2Count}
          </span>
        </button>

        {/* 11. Sınıf */}
        <button
          type="button"
          onClick={() => handleTierSwitch('lise3')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lise3'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>11. Sınıf Alan</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lise3' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lise3Count}
          </span>
        </button>

        {/* 12. Sınıf / YKS */}
        <button
          type="button"
          onClick={() => handleTierSwitch('yks')}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'yks'
              ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>12. Sınıf YKS</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'yks' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {yksCount}
          </span>
        </button>
      </div>

      {/* Yarıda Bırakılan & Devam Eden Sınavlar Başlığı */}
      {savedExams.length > 0 && (
        <section className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white p-5 sm:p-6 shadow-sm dark:border-amber-900/60 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/25">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>⏳ Yarıda Bıraktığın / Devam Eden Sınavlar</span>
                  <span className="rounded-full bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                    {savedExams.length} Sınav
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Daha önce mola verdiğin veya yarıda bıraktığın sınavlara kaldığın dakikadan ve işaretlediğin sorulardan devam edebilirsin.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {savedExams.map((item) => {
              const percent = Math.round((item.answeredCount / item.totalQuestions) * 100);
              const remMinutes = Math.ceil(item.remainingSeconds / 60);

              return (
                <div
                  key={item.examSlug}
                  className="flex flex-col justify-between rounded-2xl border border-amber-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                        {item.courseName}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        Kalan Süre: ~{remMinutes} dk
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                      {item.examTitle}
                    </h4>
                  </div>

                  {/* İlerleme Çubuğu */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <span>İlerleme: {item.answeredCount} / {item.totalQuestions} Soru</span>
                      <span className="text-amber-600 dark:text-amber-400">%{percent}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                        style={{ width: `${Math.max(5, percent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Aksiyon Butonları */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`"${item.examTitle}" sınav ilerlemesini sıfırlamak istediğine emin misin?`)) {
                          removeSavedExamProgress(item.examSlug);
                        }
                      }}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    >
                      Sıfırla
                    </button>

                    <Link
                      href={`/deneme-coz/${item.examSlug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 py-1.5 text-xs font-black text-white shadow-xs hover:from-emerald-700 hover:to-teal-700 transition cursor-pointer"
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      <span>Kaldığın Yerden Devam Et →</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Alt Ders / Tip Filtreleri */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedSubFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              selectedSubFilter === 'all'
                ? selectedTier === 'lise1'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : selectedTier === 'lise2'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : selectedTier === 'lise3'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : selectedTier === 'yks'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            Tümü ({tierExams.length})
          </button>

          {/* Kullanıcının Ürettiği Özel Testler Butonu */}
          {customExamsCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSubFilter('custom')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedSubFilter === 'custom'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                  : 'border border-purple-200 bg-purple-50/60 text-purple-700 hover:bg-purple-100/70 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span>✨ Özel Testler ({customExamsCount})</span>
            </button>
          )}

          {/* 8. Sınıf LGS Filtreleri */}
          {selectedTier === 'lgs' && (
            <>
              <button
                type="button"
                onClick={() => setSelectedSubFilter('full')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSubFilter === 'full'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'border border-amber-200 bg-amber-50/50 text-amber-800 hover:bg-amber-100/60 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300'
                }`}
              >
                <Trophy className="h-3.5 w-3.5 text-amber-500" />
                <span>🏆 Genel LGS Denemeleri</span>
              </button>

              {LGS_COURSE_OPTIONS.map((c) => {
                const count = tierExams.filter((e) => e.courseKey === c.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedSubFilter(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedSubFilter === c.key
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{c.name.split(' ')[0]} ({count})</span>
                  </button>
                );
              })}
            </>
          )}

          {/* 9. Sınıf Lise 1 Filtreleri */}
          {selectedTier === 'lise1' && (
            <>
              {LISE1_COURSE_OPTIONS.map((c) => {
                const count = tierExams.filter((e) => e.courseKey === c.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedSubFilter(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedSubFilter === c.key
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{c.name.split(' ')[0]} ({count})</span>
                  </button>
                );
              })}
            </>
          )}

          {/* 10. Sınıf Lise 2 Filtreleri */}
          {selectedTier === 'lise2' && (
            <>
              {LISE2_COURSE_OPTIONS.map((c) => {
                const count = tierExams.filter((e) => e.courseKey === c.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedSubFilter(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedSubFilter === c.key
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{c.name.split(' ')[0]} ({count})</span>
                  </button>
                );
              })}
            </>
          )}

          {/* 11. Sınıf Lise 3 Filtreleri */}
          {selectedTier === 'lise3' && (
            <>
              {LISE3_COURSE_OPTIONS.map((c) => {
                const count = tierExams.filter((e) => e.courseKey === c.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedSubFilter(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedSubFilter === c.key
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{c.name.split(' ')[0]} ({count})</span>
                  </button>
                );
              })}
            </>
          )}

          {/* 12. Sınıf / YKS Filtreleri */}
          {selectedTier === 'yks' && (
            <>
              {YKS_COURSE_FILTERS.map((c) => {
                const count = tierExams.filter((e) => e.courseKey === c.key || (c.key === 'tyt' && e.type === 'tyt')).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedSubFilter(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      selectedSubFilter === c.key
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{c.name} ({count})</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {filteredExams.length} Sınav Yayında
        </span>
      </div>

      {/* Deneme Kartları */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} onDelete={handleDeleteCustomExam} />
        ))}
      </div>
    </div>
  );
}

export function ExamCatalogGrid(props: ExamCatalogGridProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-bold text-slate-400 animate-pulse">
          Sınav kataloğu yükleniyor...
        </div>
      }
    >
      <ExamCatalogGridContent {...props} />
    </Suspense>
  );
}
