import React from 'react';
import type { Metadata } from 'next';
import { HomeTierContainer } from '@/components/home/HomeTierContainer';

export const metadata: Metadata = {
  title: 'SınavKoçu.ai — LGS & Lise 1 Sınav ve Koçluk Platformu',
  description:
    'LGS puan ve yüzdelik dilim hesaplama, 9. Sınıf MEB ortak yazılı notu ve takdir/teşekkür hesaplayıcı, online deneme sınavları ve Sokratik yapay zekâ koçu.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeTierContainer />;
}
