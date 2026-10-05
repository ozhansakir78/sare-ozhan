import React from 'react';
import type { Metadata } from 'next';
import { getOnlineExams } from '@/lib/online-exams-data';
import { DenemeCozTierContainer } from '@/components/exam-session/DenemeCozTierContainer';

export const metadata: Metadata = {
  title: 'Online Deneme Sınavları & MEB Ortak Yazılı Provaları — LGS, Lise (9, 10, 11) & YKS',
  description:
    '8. Sınıf LGS, MEB Ortak Yazılı Sınavları (9, 10, 11. Sınıf) ve ÖSYM YKS (TYT/AYT) müfredatına tam uyumlu online denemeleri süre tutarak çözün. Anında net, yazılı notu, sıralama ve Sokratik AI desteği.',
  alternates: {
    canonical: '/deneme-coz',
  },
};

export default function DenemeCozPage() {
  const exams = getOnlineExams();

  return <DenemeCozTierContainer exams={exams} />;
}

