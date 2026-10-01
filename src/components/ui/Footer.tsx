'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  FileCheck2,
  BookOpen,
  HeartHandshake,
  Calculator,
  Timer,
  Layers,
  Trophy,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-300 shadow-inner">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-slate-800">
          {/* Kolon 1: Marka */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                SınavKoçu<span className="text-indigo-400">.ai</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              LGS (8. Sınıf), Lise (9, 10, 11) ve YKS (TYT / AYT) sınavlarına hazırlanan öğrenciler için yapay zekâ destekli soru çözüm, net hesaplama ve 145 online deneme platformu.
            </p>
          </div>

          {/* Kolon 2: Online Sınavlar */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Online Sınavlar &amp; Kademeler
            </span>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/deneme-coz" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <FileCheck2 className="h-3.5 w-3.5 text-indigo-400" />
                  145 Online Deneme Sınavı
                </Link>
              </li>
              <li>
                <Link href="/lgs-konulari" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <Layers className="h-3.5 w-3.5 text-sky-400" />
                  8. Sınıf LGS Konuları
                </Link>
              </li>
              <li>
                <Link href="/lise1-konulari" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition">
                  <Layers className="h-3.5 w-3.5 text-emerald-400" />
                  9. Sınıf Maarif Modeli
                </Link>
              </li>
              <li>
                <Link href="/lise2-konulari" className="inline-flex items-center gap-1.5 hover:text-purple-400 transition">
                  <Layers className="h-3.5 w-3.5 text-purple-400" />
                  10. Sınıf &amp; Alan Seçimi
                </Link>
              </li>
              <li>
                <Link href="/lise3-konulari" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition">
                  <Layers className="h-3.5 w-3.5 text-blue-400" />
                  11. Sınıf &amp; Erken TYT
                </Link>
              </li>
              <li>
                <Link href="/meb-cikmis-sorular" className="inline-flex items-center gap-1.5 hover:text-amber-400 transition">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  MEB Çıkmış Sınav Soruları
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 3: Koçluk & Analiz */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Koçluk &amp; Araçlar
            </span>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/odaklanma-odasi" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <Timer className="h-3.5 w-3.5 text-violet-400" />
                  Odaklanma Odası (Pomodoro)
                </Link>
              </li>
              <li>
                <Link href="/yanlis-defteri" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <BookOpen className="h-3.5 w-3.5 text-rose-400" />
                  Kişisel Yanlış Defteri
                </Link>
              </li>
              <li>
                <Link href="/veli-raporu" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <HeartHandshake className="h-3.5 w-3.5 text-pink-400" />
                  Haftalık Veli Raporu
                </Link>
              </li>
              <li>
                <Link href="/#hesaplama" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <Calculator className="h-3.5 w-3.5 text-cyan-400" />
                  Puan &amp; Dilim Hesaplama
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 4: Yönetim */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Girişimci Yönetimi
            </span>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  href="/admin/soru-yonetimi"
                  className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  ⚙️ AI Soru Fabrikası (Admin)
                </Link>
              </li>
              <li className="text-[11px] text-slate-400">
                MEB PDF aktarıcısı &amp; 1 tıkla yeni deneme üretimi.
              </li>
              <li>
                <Link href="/giris" className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition">
                  Öğrenci / Veli Girişi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Özel İthaf & Telif */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row">
          <p>&copy; 2027 SınavKoçu.ai &bull; Tüm Hakları Saklıdır.</p>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-xs">
            <span>✨</span>
            <span>Tasarım Şakir Özhan tarafından Sare Özhan için sevgiyle yapılmıştır.</span>
            <span>❤️</span>
          </div>

          <p className="text-slate-500 text-[11px]">MEB müfredat ve sınav standartlarıyla uyumludur.</p>
        </div>
      </div>
    </footer>
  );
}
