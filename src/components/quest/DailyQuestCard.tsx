'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getTodayQuestQuestion,
  getDailyQuestState,
  submitDailyQuestAnswer,
  DailyQuestQuestion,
  DailyQuestState,
  QuestOptionKey,
} from '@/lib/daily-quest-engine';
import { saveQuestionToStorage } from '@/lib/question-storage';
import { MathText } from '@/components/ui/MathText';
import { useGradeTier } from '@/lib/grade-tier';
import {
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookmarkPlus,
  TrendingUp,
  AlertTriangle,
  Zap,
} from 'lucide-react';

export function DailyQuestCard() {
  const { tier } = useGradeTier();
  const [question, setQuestion] = useState<DailyQuestQuestion>(() => getTodayQuestQuestion(tier));
  const [questState, setQuestState] = useState<DailyQuestState>(() => getDailyQuestState(tier));
  const [selectedOption, setSelectedOption] = useState<QuestOptionKey | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSavedToNotebook, setIsSavedToNotebook] = useState<boolean>(false);

  useEffect(() => {
    const q = getTodayQuestQuestion(tier);
    const st = getDailyQuestState(tier);
    setQuestion(q);
    setQuestState(st);
    if (st.isSolved && st.selectedOption) {
      setSelectedOption(st.selectedOption);
    } else {
      setSelectedOption(null);
    }
    setIsSavedToNotebook(false);
    setShowHint(false);
  }, [tier]);

  const handleSelectOption = (key: QuestOptionKey) => {
    if (questState.isSolved) return;
    setSelectedOption(key);
  };

  const handleSubmit = () => {
    if (!selectedOption || questState.isSolved) return;
    const result = submitDailyQuestAnswer(selectedOption, tier);
    setQuestState(result);
  };

  const handleSaveToNotebook = () => {
    try {
      saveQuestionToStorage({
        courseKey: question.courseKey,
        courseName: question.courseName,
        topicName: question.topicName,
        imageUrl: '',
        isOnlineExamQuestion: true,
        questionText: question.questionText,
        options: question.options.reduce((acc, opt) => ({ ...acc, [opt.key]: opt.text }), {}),
        correctAnswer: question.correctOption,
        solutionExplanation: question.solutionExplanation,
        studentNote: `Günün Sorusu: "${question.questionText}" - Doğru Cevap: ${question.correctOption}. MEB/ÖSYM Notu: ${question.mebTrapNote}`,
        status: 'unresolved',
        isResolved: false,
        errorReason: 'carelessness',
        tier: question.tier,
        gradeLevel:
          question.tier === 'lgs'
            ? '8'
            : question.tier === 'lise1'
            ? '9'
            : question.tier === 'lise2'
            ? '10'
            : question.tier === 'lise3'
            ? '11'
            : '12',
      });
      setIsSavedToNotebook(true);
    } catch (e) {
      console.error(e);
    }
  };

  const badgeLabel =
    tier === 'yks'
      ? 'GÜNÜN ÖSYM YKS MEYDAN OKUMASI'
      : tier === 'lise3'
      ? 'GÜNÜN 11. SINIF ALAN SORUSU'
      : tier === 'lise2'
      ? 'GÜNÜN 10. SINIF YAZILI SORUSU'
      : tier === 'lise1'
      ? 'GÜNÜN 9. SINIF YAZILI SORUSU'
      : 'GÜNÜN LGS MEYDAN OKUMASI';

  return (
    <section
      aria-label={badgeLabel}
      className="relative overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/20 to-amber-50/30 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 sm:p-7"
    >
      {/* Üst Rozet Satırı */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[11px] font-black text-white shadow-xs">
            <Flame className="h-3.5 w-3.5 fill-white" />
            {badgeLabel}
          </span>
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
            {question.courseName} &bull; {question.topicName}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Zorluk: {question.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
          <Award className="h-4 w-4" />
          <span>Ödül: +50 XP &bull; +1 Seri</span>
        </div>
      </div>

      {/* Soru Gövdesi */}
      <div className="mt-5 space-y-4">
        {question.contextText && (
          <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            <MathText text={question.contextText} />
          </div>
        )}

        <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
          <MathText text={question.questionText} />
        </div>

        {/* Şıklar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isAnswerRevealed = questState.isSolved;
            const isCorrectAnswer = opt.key === question.correctOption;

            let cardStyle =
              'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800';

            if (isAnswerRevealed) {
              if (isCorrectAnswer) {
                cardStyle =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200';
              } else if (isSelected && !questState.isCorrect) {
                cardStyle =
                  'border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950/60 dark:text-rose-200';
              } else {
                cardStyle = 'border-slate-200/60 opacity-60 dark:border-slate-800';
              }
            } else if (isSelected) {
              cardStyle =
                'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-white';
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={questState.isSolved}
                onClick={() => handleSelectOption(opt.key)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition text-left cursor-pointer ${cardStyle}`}
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
                <span className="text-xs sm:text-sm font-semibold">
                  <MathText text={opt.text} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sokratik İpucu Alanı */}
      {showHint && !questState.isSolved && (
        <div className="mt-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 p-3.5 text-xs text-amber-950 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-black">Sokratik Düşünme İpucu:</span>
              <div className="mt-0.5 leading-relaxed">
                <MathText text={question.socraticHint} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sonuç & Çözüm Bölümü (Çözüldükten Sonra Açılır) */}
      {questState.isSolved && (
        <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {questState.isCorrect ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm">
                  <XCircle className="h-5 w-5" />
                </div>
              )}
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {questState.isCorrect ? 'Tebrikler! Doğru Cevap (+50 XP)' : 'Cevabın Yanlış, Ama Pes Etmek Yok!'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Türkiye genelinde öğrencilerin %{question.nationalSuccessRate}&apos;i bu soruyu doğru bildi.
                </p>
              </div>
            </div>

            {!questState.isCorrect && (
              <div>
                {isSavedToNotebook ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Yanlış Defterine Eklendi ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveToNotebook}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition cursor-pointer"
                  >
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    <span>Yanlış Defterime Kaydet</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* MEB / ÖSYM Çözüm Açıklaması & Tuzağı */}
          <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200">
              <span className="font-black block mb-1">📘 Resmi Çözüm Yolu:</span>
              <div className="leading-relaxed font-medium">
                <MathText text={question.solutionExplanation} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200">
              <span className="font-black block mb-1">⚠️ Sınav Çeldirici Tuzağı:</span>
              <div className="leading-relaxed font-medium">
                <MathText text={question.mebTrapNote} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alt Butonlar */}
      {!questState.isSolved && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>{showHint ? 'İpucunu Gizle' : 'Tıkandım, Sokratik İpucu Ver'}</span>
          </button>

          <button
            type="button"
            disabled={!selectedOption}
            onClick={handleSubmit}
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-black shadow-xs transition cursor-pointer ${
              selectedOption
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'
            }`}
          >
            <span>Cevabı Gönder</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
