'use client';

import React from 'react';
import type {
  OnlineExamQuestion,
  ExamQuestionOptionKey,
  StudentAnswers,
} from '@/types/online-exam';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { speechService } from '@/lib/speech-service';

interface ExamQuestionViewProps {
  question: OnlineExamQuestion;
  currentIndex: number;
  totalQuestions: number;
  answers: StudentAnswers;
  isFlagged: boolean;
  onSelectOption: (option: ExamQuestionOptionKey) => void;
  onClearOption: () => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmitExam: () => void;
}

export function ExamQuestionView({
  question,
  currentIndex,
  totalQuestions,
  answers,
  isFlagged,
  onSelectOption,
  onClearOption,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmitExam,
}: ExamQuestionViewProps) {
  const currentAnswer = answers[question.id];
  const optionKeys = (['A', 'B', 'C', 'D', 'E'] as const).filter(
    (k) => question.options[k] !== undefined && question.options[k] !== ''
  ) as ExamQuestionOptionKey[];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const [isReading, setIsReading] = React.useState<boolean>(false);

  // Soru değiştiğinde konuşmayı durdur
  React.useEffect(() => {
    speechService.stop();
    setIsReading(false);
    return () => {
      speechService.stop();
    };
  }, [question.id]);

  const handleToggleSpeech = () => {
    if (isReading) {
      speechService.stop();
      setIsReading(false);
    } else {
      const optionsSpeech = optionKeys.map((k) => `${k} şıkkı: ${question.options[k]}`).join('. ');
      const fullTextToRead = `Soru ${question.questionNumber}. ${question.questionText}. ${optionsSpeech}.`;
      speechService.speak(fullTextToRead, {
        onStart: () => setIsReading(true),
        onEnd: () => setIsReading(false),
        onError: () => setIsReading(false),
      });
    }
  };

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* Soru Üst Barı */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-xs">
            {question.questionNumber}
          </span>
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {question.courseName}
            </span>
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">&bull;</span>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
              {question.topicName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sesli Oku Butonu */}
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
              isReading
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300 animate-pulse'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title="Soruyu ve şıkları sesli dinle"
          >
            {isReading ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-indigo-600" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Sesli Dinle</span>
              </>
            )}
          </button>

          {/* Sonra Bak (Bayrak) Butonu */}
          <button
            type="button"
            onClick={onToggleFlag}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
              isFlagged
                ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-300'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isFlagged ? 'İşaretlendi' : 'Sonra Bak'}</span>
          </button>
        </div>
      </div>

      {/* Soru İçeriği */}
      <div className="flex-1 p-5 sm:p-7 space-y-6">
        {/* Soru Görseli Varsa */}
        {question.questionImageUrl && (
          <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={question.questionImageUrl}
              alt={`Soru ${question.questionNumber}`}
              className="max-h-72 w-full object-contain bg-slate-50 dark:bg-slate-950"
            />
          </div>
        )}

        {/* Soru Metni */}
        <div className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line sm:text-base">
          {question.questionText}
        </div>

        {/* Şıklar */}
        <div className="space-y-3 pt-2">
          {optionKeys.map((optKey) => {
            const isSelected = currentAnswer === optKey;
            const optionText = question.options[optKey];

            return (
              <button
                key={optKey}
                type="button"
                onClick={() => onSelectOption(optKey)}
                className={`flex w-full items-center gap-3.5 rounded-2xl border-2 p-3.5 text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm dark:border-indigo-500 dark:bg-indigo-950/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700'
                }`}
              >
                {/* Şık Harf Rozeti */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {optKey}
                </div>

                {/* Şık Metni */}
                <span
                  className={`text-sm font-medium leading-normal ${
                    isSelected
                      ? 'font-bold text-indigo-950 dark:text-indigo-200'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {optionText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Seçimi Temizle Butonu (Eğer işaretlenmişse) */}
        {currentAnswer && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onClearOption}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>İşareti Temizle</span>
            </button>
          </div>
        )}
      </div>

      {/* Soru Alt Gezinme Butonları */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/50">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition cursor-pointer ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-800'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Önceki Soru</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          {currentIndex + 1} / {totalQuestions}
        </span>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={onSubmitExam}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-500/20 transition hover:from-emerald-700 hover:to-teal-700 cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Sınavı Tamamla</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 cursor-pointer"
          >
            <span>Sonraki Soru</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
