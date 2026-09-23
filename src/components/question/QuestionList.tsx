'use client';

import React, { useState, useMemo } from 'react';
import type { WrongQuestionItem, QuestionStatus } from '@/types/question';
import type { LgsCourseKey } from '@/types/exam';
import { QuestionCard } from '@/components/question/QuestionCard';
import { LGS_COURSE_OPTIONS } from '@/lib/lgs-topics';
import {
  Search,
  Filter,
  Inbox,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Plus,
} from 'lucide-react';

interface QuestionListProps {
  questions: WrongQuestionItem[];
  onStatusChange: (id: string, newStatus: QuestionStatus) => void;
  onDelete: (id: string) => void;
  onOpenAiAssistant?: (question: WrongQuestionItem) => void;
  onOpenUploader?: () => void;
}

export function QuestionList({
  questions,
  onStatusChange,
  onDelete,
  onOpenAiAssistant,
  onOpenUploader,
}: QuestionListProps) {
  const [selectedCourse, setSelectedCourse] = useState<LgsCourseKey | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<QuestionStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Ders Filtresi
      if (selectedCourse !== 'all' && q.courseKey !== selectedCourse) {
        return false;
      }

      // Durum Filtresi
      if (selectedStatus !== 'all' && q.status !== selectedStatus) {
        return false;
      }

      // Arama Filtresi (Konu, Ders, Öğrenci Notu)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTopic = q.topicName.toLowerCase().includes(query);
        const matchesCourse = q.courseName.toLowerCase().includes(query);
        const matchesNote = q.studentNote?.toLowerCase().includes(query) || false;
        return matchesTopic || matchesCourse || matchesNote;
      }

      return true;
    });
  }, [questions, selectedCourse, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filtre ve Arama Araç Çubuğu */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Arama Alanı */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Konu, ders veya not ara (Örn: Çarpanlar, Basınç)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
            />
          </div>

          {/* Durum Filtreleri (Pill Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setSelectedStatus('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Tümü ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('unresolved')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === 'unresolved'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300'
              }`}
            >
              Çözülemedi
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('hinted')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === 'hinted'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300'
              }`}
            >
              İpucu Alındı
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('resolved')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === 'resolved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300'
              }`}
            >
              Öğrenildi ✓
            </button>
          </div>
        </div>

        {/* Ders Sekmeleri */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedCourse('all')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCourse === 'all'
                ? 'bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950 dark:text-indigo-300'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            Tüm Dersler
          </button>
          {LGS_COURSE_OPTIONS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCourse(c.key)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCourse === c.key
                  ? 'bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950 dark:text-indigo-300'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Soru Listesi Grid */}
      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onOpenAiAssistant={onOpenAiAssistant}
            />
          ))}
        </div>
      ) : (
        /* Boş Durum (Empty State) */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Eşleşen Soru Bulunamadı
          </h3>
          <p className="mt-1.5 max-w-sm text-xs text-slate-500 dark:text-slate-400">
            Seçtiğiniz filtrelerde kayıtlı soru bulunmuyor veya arama kriterinize uygun soru yok.
          </p>
          {onOpenUploader && (
            <button
              type="button"
              onClick={onOpenUploader}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Soru Yükle</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
