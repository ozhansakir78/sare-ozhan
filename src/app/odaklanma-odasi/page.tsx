import React from 'react';
import type { Metadata } from 'next';
import { PomodoroTimer } from '@/components/focus/PomodoroTimer';
import { AmbientSoundPlayer } from '@/components/focus/AmbientSoundPlayer';
import { FocusMotivationalQuotes } from '@/components/focus/FocusMotivationalQuotes';
import { Timer, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const metadata: Metadata = {
  title: 'LGS Çalışma & Odaklanma Odası (Pomodoro Sayacı) | SınavKoçu.ai',
  description: '2027 LGS sınavına hazırlanan öğrenciler için 25 dk odaklanma, 5 dk mola pomodoro tekniği, telifsiz yağmur ve beyaz gürültü sesleri ve stratejik ipuçları.',
};

export default function FocusRoomPage() {
  return (
    <AuthGuard
      title="Odaklanma Odasına Giriş Yapmalısınız"
      description="Pomodoro sayacı, ortam sesleri ve odaklanma araçlarını kullanabilmek için lütfen ücretsiz üye olun veya giriş yapın."
    >
      <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Başlık Alanı */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mb-3">
            <Timer className="h-3.5 w-3.5 text-indigo-600" />
            <span>Verimli Ders Çalışma Alanı</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            LGS Çalışma &amp; Odaklanma Odası
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Pomodoro tekniği ile zihnini dinç tut. 25 dakika kesintisiz soru çöz veya konu tekrarı yap,
            5 dakika mola vererek yorgunluğu önle!
          </p>
        </div>

        {/* Ana Izgara */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Sol Kolon: Pomodoro Sayacı (2 Kolon Genişliğinde) */}
          <div className="lg:col-span-2">
            <PomodoroTimer />
          </div>

          {/* Sağ Kolon: Ortam Sesleri & Motivasyon & Hızlı Linkler */}
          <div className="space-y-6">
            {/* Ortam Sesi Kontrolü */}
            <AmbientSoundPlayer />

            {/* LGS Taktik & Motivasyon */}
            <FocusMotivationalQuotes />

            {/* Hızlı Yönlendirmeler */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                📚 Bu Odada Ne Yapabilirsin?
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Yanlış defterindeki çözemediğin soruları incele.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Sitedeki 21 denemeden birini süreli olarak çöz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Matematik formül kartlarını tekrar et.</span>
                </li>
              </ul>

              <div className="rounded-xl bg-indigo-50/70 p-3 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-[11px] text-indigo-900 dark:text-indigo-200 mt-4">
                💡 <strong>Kesintisiz Odaklanma:</strong> Süreyi veya yağmur sesini başlattıktan sonra deneme çözmeye geçsen bile, ses ve sayaç sağ altta <strong>mini çubuk</strong> olarak arka planda çalmaya devam eder!
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <Link
                  href="/deneme-coz"
                  className="inline-flex items-center justify-between rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    Deneme Çözmeye Başla
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/yanlis-defteri"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    Yanlış Defteri
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
