import React from 'react';
import type { Metadata } from 'next';
import { getOnlineExams } from '@/lib/online-exams-data';
import { DenemeCozTierContainer } from '@/components/exam-session/DenemeCozTierContainer';

export const metadata: Metadata = {
  title: 'Online Deneme Sınavları & MEB Ortak Yazılı Provaları — LGS & 9. Sınıf',
  description:
    'LGS ve 9. Sınıf (Lise 1) MEB güncel müfredatına tam uyumlu online denemeleri ve ortak yazılı provalarını süre tutarak çözün. Anında net, yazılı notu ve Sokratik AI desteği.',
  alternates: {
    canonical: '/deneme-coz',
  },
};

export default function DenemeCozPage() {
  const exams = getOnlineExams();

  return <DenemeCozTierContainer exams={exams} />;
}

