'use client';

import React, { useState, useCallback } from 'react';
import type {
  OnlineExam,
  StudentAnswers,
  ExamQuestionOptionKey,
  OnlineExamResult,
  QuestionResultDetail,
} from '@/types/online-exam';
import { ExamTimer } from '@/components/exam-session/ExamTimer';
import { ExamOpticalNavigator } from '@/components/exam-session/ExamOpticalNavigator';
import { ExamQuestionView } from '@/components/exam-session/ExamQuestionView';
import { ExamResultSummary } from '@/components/exam-session/ExamResultSummary';
import { ArrowLeft, CheckCircle2, AlertTriangle, X, Printer } from 'lucide-react';
import Link from 'next/link';

interface ExamSessionContainerProps {
  exam: OnlineExam;
}

export function ExamSessionContainer({ exam }: ExamSessionContainerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<StudentAnswers>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [result, setResult] = useState<OnlineExamResult | null>(null);
  const [startTime, setStartTime] = useState<number>(() => Date.now());

  const totalQuestions = exam.questions.length;
  const currentQuestion = exam.questions[currentIndex];

  // Şık Seçimi
  const handleSelectOption = useCallback(
    (option: ExamQuestionOptionKey) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: option,
      }));
    },
    [currentQuestion.id]
  );

  // Şıkkı Temizleme
  const handleClearOption = useCallback(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  }, [currentQuestion.id]);

  // Bayrak Ekle/Kaldır
  const handleToggleFlag = useCallback(() => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  }, [currentQuestion.id]);

  // Sınavı Tamamla & Net Hesapla (MEB Formülü)
  const calculateResult = useCallback((): OnlineExamResult => {
    let correctCount = 0;
    let incorrectCount = 0;
    let emptyCount = 0;

    const questionDetails: QuestionResultDetail[] = exam.questions.map((q) => {
      const studentAnswer = answers[q.id] || null;
      const isEmpty = studentAnswer === null;
      const isCorrect = studentAnswer === q.correctAnswer;

      if (isEmpty) {
        emptyCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        question: q,
        studentAnswer,
        isCorrect,
        isEmpty,
      };
    });

    // MEB Formülü: Her 3 yanlış 1 doğruyu götürür
    const netScore = Math.max(0, correctCount - incorrectCount / 3);
    const scorePercentage = Math.round((netScore / totalQuestions) * 100);
    const timeSpentSeconds = Math.min(
      exam.durationMinutes * 60,
      Math.max(1, Math.round((Date.now() - startTime) / 1000))
    );

    return {
      examId: exam.id,
      examTitle: exam.title,
      courseKey: exam.courseKey,
      totalQuestions,
      correctCount,
      incorrectCount,
      emptyCount,
      netScore,
      scorePercentage,
      timeSpentSeconds,
      questionDetails,
      completedAt: new Date().toISOString(),
    };
  }, [answers, exam, startTime, totalQuestions]);

  const handleSubmitConfirmed = () => {
    const finalResult = calculateResult();
    setResult(finalResult);
    setIsSubmitModalOpen(false);
  };

  const handleTimeUp = () => {
    const finalResult = calculateResult();
    setResult(finalResult);
    setIsSubmitModalOpen(false);
  };

  const handleRestart = () => {
    setAnswers({});
    setFlaggedIds(new Set());
    setCurrentIndex(0);
    setResult(null);
    setStartTime(Date.now());
  };

  const answeredCount = Object.keys(answers).length;
  const emptyCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Sınav Üst Barı */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/deneme-coz"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Deneme Listesi</span>
            </Link>

            <span className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:inline" />

            <h1 className="text-xs font-black text-slate-800 dark:text-slate-200 sm:text-sm truncate max-w-[200px] sm:max-w-md">
              {exam.title}
            </h1>
          </div>

          {/* Sayaç, Yazdır ve Bitir Butonu (Sınav Devam Ederken) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/deneme-coz/${exam.slug}/yazdir`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition shadow-xs"
              title="Kitapçık formatında yazdır veya PDF olarak indir"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden md:inline">Yazdır / PDF</span>
            </Link>

            {!result && (
              <>
                <ExamTimer
                  durationMinutes={exam.durationMinutes}
                  onTimeUp={handleTimeUp}
                />

                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Sınavı Bitir</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {result ? (
            /* Sonuç & Karne Ekranı */
            <ExamResultSummary
              exam={exam}
              result={result}
              onRestartExam={handleRestart}
            />
          ) : (
            /* Soru Çözüm Ekranı */
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Sol / Ana Kolon: Soru Kartı */}
              <div className="lg:col-span-8">
                <ExamQuestionView
                  question={currentQuestion}
                  currentIndex={currentIndex}
                  totalQuestions={totalQuestions}
                  answers={answers}
                  isFlagged={flaggedIds.has(currentQuestion.id)}
                  onSelectOption={handleSelectOption}
                  onClearOption={handleClearOption}
                  onToggleFlag={handleToggleFlag}
                  onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  onNext={() =>
                    setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
                  }
                  onSubmitExam={() => setIsSubmitModalOpen(true)}
                />
              </div>

              {/* Sağ Kolon: Optik Form ve Soru Seçici */}
              <div className="lg:col-span-4">
                <div className="sticky top-20">
                  <ExamOpticalNavigator
                    questions={exam.questions}
                    currentIndex={currentIndex}
                    answers={answers}
                    flaggedQuestionIds={flaggedIds}
                    onSelectQuestion={(idx) => setCurrentIndex(idx)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sınavı Teslim Etme Onay Modalı */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-white">
              Sınavı Tamamlamak İstiyor Musun?
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Şu ana kadar <strong>{answeredCount}</strong> soruyu cevapladın. Henüz cevaplamadığın{' '}
              <strong className="text-rose-600">{emptyCount} boş soru</strong> bulunuyor.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
              >
                Sorulara Dön
              </button>

              <button
                type="button"
                onClick={handleSubmitConfirmed}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition cursor-pointer"
              >
                Evet, Sınavı Bitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
