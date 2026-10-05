import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOnlineExamBySlug, getOnlineExams } from '@/lib/online-exams-data';
import { ExamSessionResolver } from '@/components/exam-session/ExamSessionResolver';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const exams = getOnlineExams();
  return exams.map((exam) => ({
    slug: exam.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exam = getOnlineExamBySlug(slug);

  if (!exam) {
    return {
      title: 'Online Deneme Sınavı | SınavKoçu.ai',
    };
  }

  const tierLabel =
    exam.tier === 'yks'
      ? 'ÖSYM YKS (TYT/AYT)'
      : exam.tier === 'lise3'
      ? 'MEB 11. Sınıf Yazılı'
      : exam.tier === 'lise2'
      ? 'MEB 10. Sınıf Yazılı'
      : exam.tier === 'lise1'
      ? 'MEB 9. Sınıf Yazılı'
      : 'LGS';

  return {
    title: `${exam.title} — Online Çöz | SınavKoçu.ai`,
    description: `${exam.title}: ${exam.questionCount} soru, ${exam.durationMinutes} dakika. Güncel ${tierLabel} müfredatına tam uyumlu denemeyi süre tutarak çözün.`,
  };
}

export default async function DenemeDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getOnlineExamBySlug(slug);

  return <ExamSessionResolver initialExam={exam} slug={slug} />;
}
