'use client';

import React, { useState } from 'react';
import { PastQuestion } from '@/lib/meb-past-questions';
import { saveQuestionToStorage } from '@/lib/question-storage';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookmarkPlus,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

interface PastQuestionCardProps {
  question: PastQuestion;
}

export function PastQuestionCard({ question }: PastQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSavedToNotebook, setIsSavedToNotebook] = useState<boolean>(false);

  const isCorrect = selectedOption === question.correctOption;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return;
    setSelectedOption(key);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);
  };

  const handleSaveToNotebook = () => {
    try {
      saveQuestionToStorage({
        courseKey: question.courseKey,
        courseName: question.courseName,
        topicName: question.topicName,
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60',
        studentNote: `${question.year} LGS Çıkmış Soru: "${question.questionText}" - Doğru Cevap: ${question.correctOption}. MEB Notu: ${question.mebTrapNote}`,
        status: 'unresolved',
        isResolved: false,
        errorReason: 'carelessness',
      });
      setIsSavedToNotebook(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Üst Bilgi Rozetleri */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl bg-indigo-600 px-2.5 py-1 font-black text-white text-[11px] shadow-2xs">
            {question.sourceLabel}
          </span>
          <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-bold text-slate-700 dark:text-slate-300 text-[11px]">
            {question.courseName} &bull; Soru #{question.questionNumber}
          </span>
          <span className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 font-semibold text-indigo-700 dark:text-indigo-300 text-[11px]">
            {question.topicName}
          </span>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          Başarı Oranı: %{question.nationalSuccessRate}
        </span>
      </div>

      {/* Soru Gövdesi */}
      <div className="mt-4 space-y-3">
        {question.contextText && (
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            {question.contextText}
          </div>
        )}

        <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
          {question.questionText}
        </p>

        {/* Seçenekler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrectChoice = opt.key === question.correctOption;

            let buttonClass =
              'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800';

            if (isAnswered) {
              if (isCorrectChoice) {
                buttonClass =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                buttonClass =
                  'border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950/60 dark:text-rose-200';
              } else {
                buttonClass = 'border-slate-200/60 opacity-60 dark:border-slate-800';
              }
            } else if (isSelected) {
              buttonClass =
                'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-white';
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.key)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition text-left cursor-pointer ${buttonClass}`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sokratik İpucu Kutusu */}
      {showHint && !isAnswered && (
        <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-950 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Sokratik Düşünme İpucu:</span>
              <p className="mt-0.5 leading-relaxed">{question.socraticHint}</p>
            </div>
          </div>
        </div>
      )}

      {/* Çözüm ve Açıklama Bölümü */}
      {isAnswered && (
        <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-4 text-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Tebrikler! Doğru Seçenek: {question.correctOption}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="h-4 w-4" />
                  <span>Cevabın Yanlış. Doğru Seçenek: {question.correctOption}</span>
                </div>
              )}
            </div>

            {!isCorrect && (
              <div>
                {isSavedToNotebook ? (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    Yanlış Defterine Eklendi ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveToNotebook}
                    className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-rose-700 transition cursor-pointer"
                  >
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    <span>Yanlış Defterime Ekle</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 leading-relaxed font-medium">
              <span className="font-black block mb-0.5">📘 MEB Çözüm Adımları:</span>
              {question.solutionExplanation}
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
              <span className="font-black block mb-0.5">⚠️ MEB Çeldirici Tuzağı:</span>
              {question.mebTrapNote}
            </div>
          </div>
        </div>
      )}

      {/* Alt Butonlar */}
      {!isAnswered && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>{showHint ? 'İpucunu Kapat' : 'Sokratik İpucu İste'}</span>
          </button>

          <button
            type="button"
            disabled={!selectedOption}
            onClick={handleCheckAnswer}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              selectedOption
                ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'
            }`}
          >
            <span>Cevabı Kontrol Et</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
