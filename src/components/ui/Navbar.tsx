'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getQuotaStatus } from '@/lib/quota';
import type { QuotaStatus } from '@/types/subscription';
import { ProUpgradeModal } from '@/components/subscription/ProUpgradeModal';
import { DailyStreakStrip } from '@/components/gamification/DailyStreakStrip';
import { HorizontalLeaderboardBar } from '@/components/leaderboard/HorizontalLeaderboardBar';
import { useAuth } from '@/components/auth/AuthProvider';
import { useGradeTier } from '@/lib/grade-tier';
import { GradeTierSwitcher } from '@/components/ui/GradeTierSwitcher';
import {
  GraduationCap,
  Sparkles,
  Zap,
  LogIn,
  LogOut,
  Menu,
  X,
  Calculator,
  BookOpen,
  TrendingUp,
  FileCheck2,
  HeartHandshake,
  Layers,
  Timer,
  Trophy,
  ChevronDown,
  ChevronRight,
  User,
  School,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { profile, user, signOut } = useAuth();
  const { isLise1 } = useGradeTier();
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  const updateQuota = () => {
    setQuota(getQuotaStatus());
  };

  useEffect(() => {
    updateQuota();
    window.addEventListener('quota_updated', updateQuota);

    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('quota_updated', updateQuota);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sayfa değiştiğinde menüleri otomatik kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsMenuOpen(false);
  }, [pathname]);

  interface NavLinkItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    highlight?: boolean;
  }

  // Ana Çekirdek Menü Linkleri (Masaüstünde daima görünenler)
  const primaryNavLinks: NavLinkItem[] = [
    {
      href: '/deneme-coz',
      label: isLise1 ? 'Ortak Yazılı & TYT' : 'Deneme Çöz',
      icon: FileCheck2,
      highlight: true,
      iconColor: isLise1 ? 'text-emerald-300' : 'text-indigo-300',
    },
    {
      href: '/',
      label: isLise1 ? 'Not Hesapla' : 'Hesapla',
      icon: Calculator,
      iconColor: 'text-cyan-400',
    },
    {
      href: '/yanlis-defteri',
      label: 'Yanlış Defteri',
      icon: BookOpen,
      iconColor: 'text-rose-400',
    },
    {
      href: isLise1 ? '/lise1-konulari' : '/lgs-konulari',
      label: 'Konular',
      icon: Layers,
      iconColor: 'text-sky-400',
    },
  ];

  // Ekstra Koçluk & Analiz Araçları (Açılır menüde toplananlar)
  const secondaryNavLinks: NavLinkItem[] = [
    { href: '/liderlik-tablosu', label: 'Liderlik Sıralaması', icon: Trophy, iconColor: 'text-amber-400' },
    { href: '/odaklanma-odasi', label: 'Odaklanma Odası (Pomodoro)', icon: Timer, iconColor: 'text-violet-400' },
    { href: '/deneme-gecmisi', label: 'Deneme Geçmişim & Gelişim', icon: TrendingUp, iconColor: 'text-emerald-400' },
    { href: '/veli-raporu', label: 'Haftalık Veli Raporu', icon: HeartHandshake, iconColor: 'text-pink-400' },
  ];

  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md text-slate-100 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6">
          {/* Logo & Marka & Kademe Seçici */}
          <div className="flex items-center gap-2.5 shrink-0 mr-2">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md transition ${
                  isLise1
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-emerald-500/25'
                    : 'bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-indigo-500/25'
                }`}
              >
                {isLise1 ? <School className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
              </div>
              <span className="text-base font-black tracking-tight text-white">
                SınavKoçu<span className={isLise1 ? 'text-emerald-400' : 'text-indigo-400'}>.ai</span>
              </span>
            </Link>

            {/* Şık ve Kompakt Kademe Açılır Menüsü */}
            <div className="hidden sm:flex items-center">
              <GradeTierSwitcher variant="dropdown" />
            </div>
          </div>

          {/* Masaüstü Menü Linkleri (Çekirdek Linkler + Şık 'Araçlar ▾' Açılır Menüsü) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? link.highlight
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-800 text-white border border-indigo-500/40 shadow-xs'
                      : link.highlight
                      ? 'bg-indigo-600/90 text-white hover:bg-indigo-600 shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${link.highlight && isActive ? 'text-white' : link.iconColor}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Araçlar Açılır Menüsü (Asla sağa taşmaz, derli toplu) */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                onClick={() => setIsToolsMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isToolsMenuOpen || secondaryNavLinks.some((l) => pathname?.startsWith(l.href))
                    ? 'bg-slate-800 text-white border border-indigo-500/40 shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                title="Diğer Sınav ve Koçluk Araçları"
              >
                <span>Araçlar</span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                    isToolsMenuOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isToolsMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-slate-700 bg-slate-900/98 p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Koçluk &amp; Gelişim
                  </div>
                  {secondaryNavLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsToolsMenuOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                          isActive
                            ? 'bg-indigo-600/30 text-white border border-indigo-500/30'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${item.iconColor}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Sağ Alan: AI Kota, Giriş / Profil & Mobil Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* AI Kota & PRO Rozeti */}
            {quota?.isPro ? (
              <span className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1.5 text-xs font-black text-white shadow-xs">
                <Sparkles className="h-3 w-3" />
                PRO
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsProModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-2.5 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:text-white cursor-pointer"
                title="Soru Kotasını Genişlet"
              >
                <Zap className="h-3 w-3 text-amber-400" />
                <span>AI {quota ? `${quota.remainingToday}/${quota.dailyLimit}` : '3/3'}</span>
              </button>
            )}

            {/* Masaüstü Profil / Giriş */}
            <div className="hidden sm:flex items-center" ref={userMenuRef}>
              {profile || user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500/50 px-2.5 py-1.5 text-xs text-slate-200 transition cursor-pointer group shadow-2xs"
                    title="Öğrenci Profil Menüsü"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-[10px] font-black text-white shadow-xs group-hover:scale-105 transition">
                      {(profile?.display_name || user?.email || 'Ö')[0].toUpperCase()}
                    </div>
                    <span className="font-bold max-w-[95px] truncate">
                      {profile?.display_name || user?.email?.split('@')[0]}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                        isUserMenuOpen ? 'rotate-180 text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  {/* Açılır Profil Kartı / Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-700 bg-slate-900/98 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                      {/* Üst Kullanıcı Bilgisi */}
                      <Link
                        href="/profil"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl bg-slate-800/80 p-2.5 hover:bg-slate-800 transition"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black text-white shadow-inner">
                          {(profile?.display_name || user?.email || 'Ö')[0].toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-black text-white truncate">
                            {profile?.display_name || user?.email?.split('@')[0]}
                          </div>
                          <div className="text-[10px] text-indigo-300 truncate">
                            {profile?.target_high_school || 'Hedef Lise Belirtilmedi'}
                          </div>
                          <div className="text-[10px] text-slate-400 font-semibold">
                            Profili Görüntüle &rarr;
                          </div>
                        </div>
                      </Link>

                      {/* Menü Seçenekleri */}
                      <div className="mt-2 space-y-0.5 border-t border-slate-800 pt-2 text-xs">
                        <Link
                          href="/profil"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
                        >
                          <User className="h-4 w-4 text-indigo-400" />
                          <span>Profilim &amp; Hedeflerim</span>
                        </Link>

                        <Link
                          href="/deneme-gecmisi"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
                        >
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                          <span>Deneme Geçmişim</span>
                        </Link>

                        <Link
                          href="/yanlis-defteri"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
                        >
                          <BookOpen className="h-4 w-4 text-rose-400" />
                          <span>Yanlış Defterim</span>
                        </Link>

                        <Link
                          href="/odaklanma-odasi"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
                        >
                          <Timer className="h-4 w-4 text-amber-400" />
                          <span>Odaklanma Odası</span>
                        </Link>

                        <div className="border-t border-slate-800 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-rose-400 hover:bg-rose-950/40 transition text-left cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/giris"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Giriş</span>
                  </Link>
                  <Link
                    href="/kayit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-500"
                  >
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>Kayıt Ol</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobil Hamburger Butonu */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menüyü Aç"
              className="lg:hidden rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobil Menü (lg altında açılır çekmece) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 px-4 py-4 backdrop-blur-md animate-in slide-in-from-top-2 duration-200 text-slate-200">
            {/* Mobil Kademe Seçici */}
            <div className="mb-3 pb-3 border-b border-slate-800 flex justify-center">
              <GradeTierSwitcher />
            </div>

            <div className="space-y-1">
              {allNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname?.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : link.highlight
                        ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/50'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${link.highlight && isActive ? 'text-white' : link.iconColor}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/admin/soru-yonetimi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-950/60 transition border border-amber-800/50"
              >
                <span>⚙️ Soru Fabrikası (Admin Paneli)</span>
              </Link>
            </div>

            {/* Mobil Profil / Giriş */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              {profile || user ? (
                <>
                  <Link
                    href="/profil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-slate-800 border border-slate-700 p-3 hover:bg-slate-750 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-xs">
                        {(profile?.display_name || user?.email || 'Ö')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {profile?.display_name || user?.email}
                        </div>
                        <div className="text-[10px] text-indigo-300">
                          Profilim ve Hedeflerimi Yönet &rarr;
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-rose-900/40 bg-rose-950/20 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/giris"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-500 transition"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Öğrenci / Veli Girişi Yap</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Öğrenciyi Ateşleyen Navbar Altı Yatay Şerit (Seri, Günlük Hedef, İlerleme Çubuğu ve Buton) */}
      <DailyStreakStrip />

      {/* 1 Günlük Serinin Altına Yatay LGS Liderlik Şeridi (İlk 5 + Öğrencinin Sırası ve İsmi) */}
      <HorizontalLeaderboardBar />

      {/* Pro Abonelik Satış Modalı */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        reason="manual"
        onSuccess={updateQuota}
      />
    </>
  );
}
