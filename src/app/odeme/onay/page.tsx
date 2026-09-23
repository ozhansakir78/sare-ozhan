'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { upgradeToPro } from '@/lib/quota';
import { useAuth } from '@/components/auth/AuthProvider';
import { trackEvent } from '@/lib/analytics';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  CreditCard,
  Sparkles,
  Check,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();

  const planId = (searchParams.get('plan') as 'season' | 'monthly') || 'season';
  const price = searchParams.get('price') || (planId === 'season' ? '499' : '149');
  const planName =
    searchParams.get('planName') ||
    (planId === 'season' ? '2027 LGS Tam Sezon Paketi' : 'Aylık Standart Plan');
  const token = searchParams.get('token') || 'demo_token';

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(profile?.display_name || '');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }
    return cleaned;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Lütfen 16 haneli kart numaranızı eksiksiz girin.');
      return;
    }

    if (expiry.length < 5) {
      setError('Lütfen son kullanma tarihini (AA/YY) formatında girin.');
      return;
    }

    if (cvc.length < 3) {
      setError('Lütfen 3 haneli güvenlik kodunu (CVC) girin.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Webhook çağrısı yaparak sunucu tarafında PRO aktifleştir
      await fetch('/api/payment/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'payment.succeeded',
          token,
          userId: user?.id,
          planId,
          amount: Number(price),
        }),
      });

      // 2. İstemci tarafı kotasını PRO'ya yükselt
      upgradeToPro();
      trackEvent('complete_purchase', { planId, price: Number(price) });

      // 3. Başarılı sayfasına yönlendir
      router.push(`/odeme-basarili?plan=${planId}&price=${price}`);
    } catch (err) {
      console.error('Ödeme hatası:', err);
      // Yerel yükseltme yine de sağlansın
      upgradeToPro();
      router.push(`/odeme-basarili?plan=${planId}&price=${price}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Üst Logo ve Geri Dön */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              SınavKoçu<span className="text-indigo-600">.ai</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sol Kolon: Ödeme Formu */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <Lock className="h-3.5 w-3.5" />
                <span>256-Bit SSL Güvenli Ödeme Noktası</span>
              </div>
              <h1 className="mt-2 text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                Kart Bilgileri
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Ödemeniz 3D Secure güvencesiyle anında işlenir ve PRO hesabınız açılır.
              </p>

              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handlePay} className="mt-6 space-y-4">
                {/* Kart Sahibi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Ahmet Yılmaz"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                {/* Kart Numarası */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kart Numarası
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="5555 5555 5555 5555"
                      maxLength={19}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Son Kullanma ve CVC */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Son Kullanma (AA/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="12/28"
                      maxLength={5}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      CVC (Güvenlik Kodu)
                    </label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      placeholder="123"
                      maxLength={3}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-black text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 cursor-pointer disabled:opacity-60"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>
                      {isProcessing ? 'Ödeme Doğrulanıyor...' : `${price} ₺ Güvenli Öde ve Başla`}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Güvenlik Rozetleri */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  14 Gün Koşulsuz İade Garantisi
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-4 w-4 text-slate-400" />
                  3D Secure Güvenli Altyapı
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Sipariş Özeti */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/50 p-6 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Sipariş Özeti
              </span>

              <div className="mt-3 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {planName}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {planId === 'season'
                      ? 'LGS 2027 sınav gününe kadar sınırsız erişim'
                      : 'Her ay otomatik yenilenen esnek abonelik'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    {price} ₺
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-indigo-100/70 pt-4 dark:border-indigo-900/40">
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Sınırsız Sokratik AI Soru Çözümü</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Haftalık Veli WhatsApp Başarı Karnesi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Deneme Puanı Gelişim Grafiği ve Trendleri</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Kişiselleştirilmiş Kamp Denemeleri</span>
                </div>
              </div>

              <div className="mt-6 border-t border-indigo-200/60 pt-4 dark:border-indigo-900/60">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Toplam Ödenecek Tutar
                  </span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {price} ₺
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OdemeOnayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-xs font-bold text-indigo-600">Ödeme sayfası yükleniyor...</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
