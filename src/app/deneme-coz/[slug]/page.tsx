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
      title: 'LGS Online Deneme Sınavı | SınavKoçu LGS',
    };
  }

  return {
    title: `${exam.title} — Online Çöz | SınavKoçu LGS`,
    description: `${exam.title}: ${exam.questionCount} soru, ${exam.durationMinutes} dakika. Yeni nesil LGS denemesini süre tutarak çözün.`,
  };
}

export default async function DenemeDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getOnlineExamBySlug(slug);

  return <ExamSessionResolver initialExam={exam} slug={slug} />;
}
