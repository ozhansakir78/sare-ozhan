'use client';

import React, { useState, useEffect } from 'react';
import type { OnlineExam, OnlineExamTier } from '@/types/online-exam';
import { ExamCard } from '@/components/exam-session/ExamCard';
import { getOnlineExams } from '@/lib/online-exams-data';
import { LGS_COURSE_OPTIONS } from '@/lib/lgs-topics';
import { LISE1_COURSE_OPTIONS } from '@/lib/lise1-topics';
import { useGradeTier } from '@/lib/grade-tier';
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
} from 'lucide-react';

interface ExamCatalogGridProps {
  initialExams: OnlineExam[];
}

export function ExamCatalogGrid({ initialExams }: ExamCatalogGridProps) {
  const { tier: activeGradeTier, setTier: setActiveGradeTier } = useGradeTier();
  const [exams, setExams] = useState<OnlineExam[]>(initialExams);
  const [selectedTier, setSelectedTier] = useState<OnlineExamTier>(activeGradeTier || 'lgs');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('all');

  // Sayfa yüklendiğinde ve global kademe değiştiğinde filtreyi eşitle
  useEffect(() => {
    setSelectedTier(activeGradeTier);
    setSelectedSubFilter('all');
  }, [activeGradeTier]);

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

  // 1. Kademe Filtresi (LGS vs Lise 1)
  const tierExams = exams.filter((exam) => {
    if (selectedTier === 'lise1') {
      return exam.tier === 'lise1';
    }
    // Varsayılan: LGS
    return !exam.tier || exam.tier === 'lgs';
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

  return (
    <div className="space-y-6">
      {/* Üst Kademe Sekmeleri (8. Sınıf LGS vs 9. Sınıf Lise 1) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 w-fit">
        <button
          type="button"
          onClick={() => handleTierSwitch('lgs')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lgs'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>🎓 8. Sınıf (LGS Denemeleri)</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lgs' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lgsCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTierSwitch('lise1')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            selectedTier === 'lise1'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
          }`}
        >
          <School className="h-4 w-4" />
          <span>🏛️ 9. Sınıf (MEB Ortak Yazılı &amp; TYT)</span>
          <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
            selectedTier === 'lise1' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {lise1Count}
          </span>
        </button>
      </div>

      {/* Alt Ders / Tip Filtreleri */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedSubFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              selectedSubFilter === 'all'
                ? selectedTier === 'lise1' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-indigo-600 text-white shadow-xs'
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
              <span>✨ Ürettiğim Özel Testler ({customExamsCount})</span>
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
              <button
                type="button"
                onClick={() => setSelectedSubFilter('yazili')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSubFilter === 'yazili'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'border border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/60 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                }`}
              >
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>📝 MEB Ortak Yazılı Provaları</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubFilter('tyt')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSubFilter === 'tyt'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'border border-indigo-200 bg-indigo-50/50 text-indigo-800 hover:bg-indigo-100/60 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300'
                }`}
              >
                <Trophy className="h-3.5 w-3.5 text-indigo-500" />
                <span>🎯 TYT Temel Tarama</span>
              </button>

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
