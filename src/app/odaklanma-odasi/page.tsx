import React from 'react';
import type { Metadata } from 'next';
import { FocusRoomContainer } from '@/components/focus/FocusRoomContainer';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const metadata: Metadata = {
  title: 'Çalışma & Odaklanma Odası (Pomodoro Sayacı) | SınavKoçu.ai',
  description: 'LGS, MEB Ortak Yazılı ve YKS sınavlarına hazırlanan öğrenciler için 25 dk odaklanma, 5 dk mola pomodoro tekniği, telifsiz yağmur ve beyaz gürültü sesleri ve stratejik koçluk ipuçları.',
};

export default function FocusRoomPage() {
  return (
    <AuthGuard
      title="Odaklanma Odasına Giriş Yapmalısınız"
      description="Pomodoro sayacı, ortam sesleri ve odaklanma araçlarını kullanabilmek için lütfen ücretsiz üye olun veya giriş yapın."
    >
      <FocusRoomContainer />
    </AuthGuard>
  );
}
