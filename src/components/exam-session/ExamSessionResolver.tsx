'use client';

import React, { useState, useEffect } from 'react';
import type { OnlineExam } from '@/types/online-exam';
import { getOnlineExamBySlug } from '@/lib/online-exams-data';
import { getWeeklySundayInfo } from '@/lib/weekly-live-exam';
import { ExamSessionContainer } from '@/components/exam-session/ExamSessionContainer';
import { LiveExamWaitingRoom } from '@/components/exam-session/LiveExamWaitingRoom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface ExamSessionResolverProps {
  initialExam?: OnlineExam;
  slug: string;
}

export function ExamSessionResolver({ initialExam, slug }: ExamSessionResolverProps) {
  const [exam, setExam] = useState<OnlineExam | undefined>(initialExam);
  const [isLoaded, setIsLoaded] = useState(Boolean(initialExam));

  useEffect(() => {
    if (!exam) {
      const found = getOnlineExamBySlug(slug);
      setExam(found);
      setIsLoaded(true);
    }
  }, [exam, slug]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-pulse text-xs font-bold text-slate-400">
          Deneme Sınavı Yükleniyor...
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <BookOpen className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-xl font-black text-slate-900 dark:text-white">
          Deneme Sınavı Bulunamadı
        </h2>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          Aradığınız deneme sınavı yayından kaldırılmış veya bağlantı hatalı olabilir.
        </p>
        <Link
          href="/deneme-coz"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Tüm Denemelere Dön</span>
        </Link>
      </div>
    );
  }

  // Pazar Canlı Sınavı Güvenlik Kilidi Kontrolü
  if (slug === 'lgs-canli-pazar-denemesi') {
    const sundayInfo = getWeeklySundayInfo();
    if (!sundayInfo.isLiveNow) {
      return <LiveExamWaitingRoom exam={exam} />;
    }
  }

  return (
    <AuthGuard
      title="Deneme Sınavını Çözmek İçin Giriş Yapmalısınız"
      description="Süre tutarak bu denemeyi çözmek, anında karne almak ve sorularınızı kaydetmek için lütfen hesabınıza giriş yapın."
    >
      <ExamSessionContainer exam={exam} />
    </AuthGuard>
  );
}
