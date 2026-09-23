import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOnlineExamBySlug, getOnlineExams } from '@/lib/online-exams-data';
import { PrintExamView } from '@/components/exam-session/PrintExamView';

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
      title: 'MEB Sınav Kitapçığı Yazdır | SınavKoçu.ai',
    };
  }

  return {
    title: `${exam.title} — MEB Kitapçığı & Optik Form Yazdır | SınavKoçu.ai`,
    description: `${exam.title} için resmi MEB sınav kitapçığı mizanpajında yazdırılabilir PDF ve optik cevap formu.`,
  };
}

export default async function PrintExamPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getOnlineExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  return <PrintExamView exam={exam} />;
}
