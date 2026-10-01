import React from 'react';
import type { Metadata } from 'next';
import { HomeTierContainer } from '@/components/home/HomeTierContainer';

export const metadata: Metadata = {
  title: 'SınavKoçu.ai — LGS, Lise (9-12) & YKS (TYT/AYT) Akıllı Sınav ve Koçluk Platformu',
  description:
    'LGS puan ve yüzdelik dilim hesaplama, 9-11. Sınıf MEB ortak yazılı provaları, alan seçimi, 120 soru TYT / AYT puan ve sıralama motoru, 145 online deneme sınavı ve Sokratik yapay zekâ koçu.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeTierContainer />;
}
