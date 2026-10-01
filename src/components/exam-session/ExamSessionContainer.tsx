'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
import {
  saveExamProgress,
  getSavedExamProgress,
  removeSavedExamProgress,
} from '@/lib/exam-progress-storage';
import { resolveExamTier, computeTierExamScore } from '@/lib/exam-tier-utils';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  X,
  Printer,
  Save,
  PlayCircle,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

interface ExamSessionContainerProps {
  exam: OnlineExam;
}

export function ExamSessionContainer({ exam }: ExamSessionContainerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<StudentAnswers>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [pendingNavUrl, setPendingNavUrl] = useState<string | null>(null);
  const [result, setResult] = useState<OnlineExamResult | null>(null);
  const [startTime, setStartTime] = useState<number>(() => Date.now());
  const [remainingSeconds, setRemainingSeconds] = useState<number>(exam.durationMinutes * 60);
  const [initialSeconds, setInitialSeconds] = useState<number>(exam.durationMinutes * 60);
  const [resumedBannerVisible, setResumedBannerVisible] = useState<boolean>(false);

  const totalQuestions = exam.questions.length;
  const currentQuestion = exam.questions[currentIndex] || exam.questions[0];

  // 1. Client Hydration: Daha önce kaydedilmiş bir ilerleme varsa yükle
  useEffect(() => {
    const saved = getSavedExamProgress(exam.slug);
    if (saved && Object.keys(saved.answers || {}).length > 0) {
      setAnswers(saved.answers);
      if (saved.flaggedQuestionIds && saved.flaggedQuestionIds.length > 0) {
        setFlaggedIds(new Set(saved.flaggedQuestionIds));
      }
      if (saved.currentIndex >= 0 && saved.currentIndex < exam.questions.length) {
        setCurrentIndex(saved.currentIndex);
      }
      if (saved.remainingSeconds > 0) {
        setRemainingSeconds(saved.remainingSeconds);
        setInitialSeconds(saved.remainingSeconds);
      }
      setResumedBannerVisible(true);
    }
  }, [exam.slug, exam.questions.length]);

  // 2. Kalan süreyi takip eden ref
  const remainingSecondsRef = useRef(remainingSeconds);
  useEffect(() => {
    remainingSecondsRef.current = remainingSeconds;
  }, [remainingSeconds]);

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const flaggedIdsRef = useRef(flaggedIds);
  useEffect(() => {
    flaggedIdsRef.current = flaggedIds;
  }, [flaggedIds]);

  // 3. İlerlemeyi LocalStorage'a kaydetme fonksiyonu
  const persistProgress = useCallback(() => {
    if (result) return;
    const currentAnswers = answersRef.current;
    const answeredCount = Object.keys(currentAnswers).length;
    saveExamProgress({
      examId: exam.id,
      examSlug: exam.slug,
      examTitle: exam.title,
      tier: exam.tier || 'lgs',
      courseKey: exam.courseKey,
      courseName: exam.courseName || 'Genel Deneme',
      answers: currentAnswers,
      flaggedQuestionIds: Array.from(flaggedIdsRef.current),
      currentIndex: currentIndexRef.current,
      totalQuestions: exam.questions.length,
      answeredCount,
      durationMinutes: exam.durationMinutes,
      elapsedSeconds: Math.max(1, Math.round((Date.now() - startTime) / 1000)),
      remainingSeconds: remainingSecondsRef.current,
      savedAt: new Date().toISOString(),
    });
  }, [exam, result, startTime]);

  // Şık her değiştiğinde arka planda sessizce kaydet
  useEffect(() => {
    if (!result && Object.keys(answers).length > 0) {
      persistProgress();
    }
  }, [answers, currentIndex, persistProgress, result]);

  // 4. Tarayıcıyı kapatma veya yenilemeye karşı güvenlik uyarısı (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!result && Object.keys(answersRef.current).length > 0) {
        persistProgress();
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [persistProgress, result]);

  // 5. Sayfa İçi Link Tıklamalarını Yakalama (Sormadan çıkılmasını engelle!)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Sınav bittiyse veya sonuç gösteriliyorsa engelleme
      if (result) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Sayfa içi hash veya yeni sekme (yazdır) linklerini engelleme
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      if (anchor.target === '_blank') return;
      if (href === window.location.pathname) return;

      // Sınav esnasındayken linke tıklandı -> Navigasyonu durdur ve onay modalını aç!
      e.preventDefault();
      e.stopPropagation();
      persistProgress();
      setPendingNavUrl(href);
      setIsExitModalOpen(true);
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [result, persistProgress]);

  // Şık Seçimi
  const handleSelectOption = useCallback(
    (option: ExamQuestionOptionKey) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: option,
      }));
    },
    [currentQuestion?.id]
  );

  // Şıkkı Temizleme
  const handleClearOption = useCallback(() => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  }, [currentQuestion]);

  // Bayrak Ekle/Kaldır
  const handleToggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  }, [currentQuestion]);

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

    // Kademeye göre puan, net ve değerlendirme motoru (Lise yazılı, YKS, LGS)
    const examTier = resolveExamTier(exam);
    const scoreEvaluation = computeTierExamScore({
      tier: examTier,
      totalQuestions,
      correctCount,
      incorrectCount,
      emptyCount,
      courseKey: exam.courseKey,
    });

    const netScore = scoreEvaluation.netScore;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const timeSpentSeconds = Math.min(
      exam.durationMinutes * 60,
      Math.max(1, Math.round((Date.now() - startTime) / 1000))
    );

    return {
      examId: exam.id,
      examTitle: exam.title,
      tier: examTier,
      courseKey: exam.courseKey,
      totalQuestions,
      correctCount,
      incorrectCount,
      emptyCount,
      netScore,
      scorePercentage,
      calculatedScore: scoreEvaluation.calculatedScore,
      scoreLabel: scoreEvaluation.scoreLabel,
      scoreUnit: scoreEvaluation.scoreUnit,
      timeSpentSeconds,
      questionDetails,
      completedAt: new Date().toISOString(),
    };
  }, [answers, exam, startTime, totalQuestions]);

  const handleSubmitConfirmed = () => {
    const finalResult = calculateResult();
    setResult(finalResult);
    setIsSubmitModalOpen(false);
    setIsExitModalOpen(false);
    // Sınav tamamlandığında yarıda kalan kayıt listesinden temizle
    removeSavedExamProgress(exam.slug);
  };

  const handleTimeUp = () => {
    const finalResult = calculateResult();
    setResult(finalResult);
    setIsSubmitModalOpen(false);
    setIsExitModalOpen(false);
    removeSavedExamProgress(exam.slug);
  };

  const handleRestart = () => {
    setAnswers({});
    setFlaggedIds(new Set());
    setCurrentIndex(0);
    setResult(null);
    setStartTime(Date.now());
    setRemainingSeconds(exam.durationMinutes * 60);
    setInitialSeconds(exam.durationMinutes * 60);
    removeSavedExamProgress(exam.slug);
  };

  // Ayrılma Modalında "Kaydet ve Çık" aksiyonu
  const handleSaveAndExit = () => {
    persistProgress();
    setIsExitModalOpen(false);
    const destination = pendingNavUrl || '/deneme-coz';
    router.push(destination);
  };

  const answeredCount = Object.keys(answers).length;
  const emptyCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Sınav Üst Barı */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                persistProgress();
                setPendingNavUrl('/deneme-coz');
                setIsExitModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Deneme Listesi</span>
            </button>

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
                  initialRemainingSeconds={initialSeconds}
                  onTimeUp={handleTimeUp}
                  onTick={(sec) => setRemainingSeconds(sec)}
                />

                <button
                  type="button"
                  onClick={() => {
                    persistProgress();
                    setPendingNavUrl('/deneme-coz');
                    setIsExitModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
                  title="Sınavı yarıda bırak ve ilerlemeyi kaydet"
                >
                  <Save className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">Kaydet &amp; Çık</span>
                </button>

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

      {/* Devam Edilen Sınav Bilgilendirme Rozeti */}
      {resumedBannerVisible && !result && (
        <div className="bg-emerald-50 border-b border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 px-4 py-2.5">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Kaldığın Yerden Devam Ediyorsun:</strong> Daha önce işaretlediğin{' '}
                <strong>{answeredCount} soru</strong> ve kalan süreniz korundu.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setResumedBannerVisible(false)}
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 text-xs font-bold shrink-0 cursor-pointer"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

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
                  isFlagged={flaggedIds.has(currentQuestion?.id || '')}
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
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
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

      {/* Sınavdan Ayrılma / Yarıda Bırakma Güvenlik Modalı (Exit Guard) */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setIsExitModalOpen(false);
                setPendingNavUrl(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HelpCircle className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-white">
              Sınavdan Ayrılmak İstiyor Musun?
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Sınavın henüz bitmedi! Şu ana kadar <strong>{answeredCount} / {totalQuestions}</strong> soru çözdün.{' '}
              Bir işin çıktıysa sınavını <strong>kaydedip istediğin zaman kaldığın yerden devam edebilirsin</strong>.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsExitModalOpen(false);
                  setPendingNavUrl(null);
                }}
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
              >
                Sınava Devam Et
              </button>

              <button
                type="button"
                onClick={handleSaveAndExit}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Kaydet ve Çık</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitConfirmed}
                className="w-full sm:w-auto rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50 px-3.5 py-2.5 text-xs font-bold transition cursor-pointer"
              >
                Bitir &amp; Puanla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
