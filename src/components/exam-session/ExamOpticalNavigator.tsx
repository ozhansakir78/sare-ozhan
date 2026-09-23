'use client';

import React from 'react';
import type { OnlineExamQuestion, StudentAnswers } from '@/types/online-exam';
import { Bookmark, CheckCircle2 } from 'lucide-react';

interface ExamOpticalNavigatorProps {
  questions: OnlineExamQuestion[];
  currentIndex: number;
  answers: StudentAnswers;
  flaggedQuestionIds: Set<string>;
  onSelectQuestion: (index: number) => void;
  className?: string;
}

export function ExamOpticalNavigator({
  questions,
  currentIndex,
  answers,
  flaggedQuestionIds,
  onSelectQuestion,
  className = '',
}: ExamOpticalNavigatorProps) {
  const answeredCount = questions.filter((q) => answers[q.id] != null).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Soru Formu &amp; Durum
        </h3>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {answeredCount} / {questions.length}
        </span>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Soru Butonları Gridi */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const answer = answers[q.id];
          const isAnswered = answer != null;
          const isFlagged = flaggedQuestionIds.has(q.id);

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`relative flex h-11 flex-col items-center justify-center rounded-xl border text-xs font-bold transition cursor-pointer ${
                isCurrent
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 dark:border-indigo-400'
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
              } ${
                isAnswered
                  ? 'bg-indigo-600 text-white dark:bg-indigo-600'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <span className="text-[10px] opacity-80">{q.questionNumber}</span>
              <span className="text-xs font-black">
                {isAnswered ? answer : '—'}
              </span>

              {/* Bayrak İkonu */}
              {isFlagged && (
                <Bookmark className="absolute -top-1 -right-1 h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Açıklama Lejantı */}
      <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-md bg-indigo-600" />
          <span>Cevaplanmış ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-md border border-slate-200 bg-slate-100 dark:bg-slate-800" />
          <span>Boş Bırakılmış ({questions.length - answeredCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <Bookmark className="h-3 w-3 fill-amber-400 text-amber-500" />
          <span>Tekrar Bakılacak ({flaggedQuestionIds.size})</span>
        </div>
      </div>
    </div>
  );
}
