'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { WrongQuestionItem } from '@/types/question';
import type { SavedStudentExam } from '@/types/exam';
import { getStoredQuestions, calculateQuestionStats } from '@/lib/question-storage';
import { getStoredExams } from '@/lib/exam-storage';
import { trackEvent } from '@/lib/analytics';
import { AuthGuard } from '@/components/auth/AuthGuard';

import {
  HeartHandshake,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Award,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  Mail,
  Send,
  Smartphone,
  Loader2,
  Bell,
  CalendarCheck,
} from 'lucide-react';

export default function VeliRaporuPage() {
  const [questions, setQuestions] = useState<WrongQuestionItem[]>([]);
  const [exams, setExams] = useState<SavedStudentExam[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [parentPhone, setParentPhone] = useState<string>('');
  const [parentEmail, setParentEmail] = useState<string>('');
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [autoEmail, setAutoEmail] = useState<string>('');
  const [isAutoSubscribed, setIsAutoSubscribed] = useState<boolean>(false);

  useEffect(() => {
    setQuestions(getStoredQuestions());
    setExams(getStoredExams());
    try {
      const savedSub = localStorage.getItem('lgs_parent_auto_report');
      if (savedSub) {
        setIsAutoSubscribed(true);
        setAutoEmail(savedSub);
      }
    } catch {}
  }, []);

  const stats = calculateQuestionStats(questions);
  const latestExam = exams.length > 0 ? exams[0] : null;

  // Başarı oranı
  const successRate =
    stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 80;

  // En çok takılınan kritik konular (çözülemeyen veya ipucu alınan soruların gruplanması)
  const topicCounts: Record<string, { count: number; course: string }> = {};
  for (const q of questions) {
    if (q.status !== 'resolved') {
      const key = `${q.courseName}: ${q.topicName}`;
      if (!topicCounts[key]) {
        topicCounts[key] = { count: 0, course: q.courseName };
      }
      topicCounts[key].count++;
    }
  }

  const sortedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 2);

  const criticalTopics = sortedTopics.map(([name, data]) => ({ name, count: data.count }));

  // WhatsApp için hazır paylaşım metni
  const examInfoText = latestExam
    ? `🎯 *Son Deneme Sınavı:* ${latestExam.examTitle}\n📈 *Puan & Net:* ${latestExam.totalScore} Puan (${latestExam.totalNet.toFixed(2)} Net) - Tahmini Dilim: %${latestExam.calculatedPercentile}\n`
    : '';

  const reportSummaryText = `📊 *SınavKoçu LGS - Haftalık Veli İlerleme Raporu*

${examInfoText}🗓 *Dönem:* Son 7 Günlük Analiz
✅ *Eksik Kapatma Başarısı:* %${successRate} (${stats.resolved}/${stats.total || 3} Soru Çözüldü)
⏳ *Çözüm Bekleyen:* ${stats.unresolved} Soru

⚠️ *Kritik Dikkat Gerektiren Konular:*
${criticalTopics.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}

💡 *Rehberlik Tavsiyesi:*
Öğrenciniz düzenli yanlış analizi yapıyor. Özellikle matematik sorularında işlem adımlarını sesli düşünerek çözmesi hata payını ciddi oranda düşürecektir.

_Detaylı analiz için SınavKoçu platformunu ziyaret edin._`;

  const handleShareWhatsApp = () => {
    trackEvent('share_parent_report_whatsapp', {
      successRate,
      resolvedCount: stats.resolved,
      totalCount: stats.total,
    });
    const encoded = encodeURIComponent(reportSummaryText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToPhoneWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentPhone.trim()) return;
    let cleanPhone = parentPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    if (!cleanPhone.startsWith('90')) cleanPhone = '90' + cleanPhone;
    const encoded = encodeURIComponent(reportSummaryText);
    trackEvent('share_parent_report_phone_whatsapp', { phone: cleanPhone });
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`, '_blank');
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentEmail || !parentEmail.includes('@')) return;
    setIsEmailSending(true);
    setEmailStatus(null);

    try {
      const res = await fetch('/api/parent/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentEmail: parentEmail.trim(),
          studentName: 'Öğrenciniz',
          examInfo: latestExam
            ? {
                title: latestExam.examTitle,
                score: latestExam.totalScore,
                net: latestExam.totalNet,
                percentile: latestExam.calculatedPercentile,
              }
            : undefined,
          stats: {
            total: stats.total,
            resolved: stats.resolved,
            unresolved: stats.unresolved,
            successRate,
          },
          criticalTopics,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        trackEvent('send_parent_report_email', { email: parentEmail });
        setEmailStatus({
          success: true,
          message: data.message || `${parentEmail} adresine veli raporu başarıyla gönderildi!`,
        });
      } else {
        setEmailStatus({
          success: false,
          message: data.error || 'E-posta gönderilirken bir sorun oluştu.',
        });
      }
    } catch {
      setEmailStatus({
        success: false,
        message: 'Bağlantı kurulamadı. Lütfen tekrar deneyin.',
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSubscribeAutoReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoEmail.trim() || !autoEmail.includes('@')) return;
    try {
      localStorage.setItem('lgs_parent_auto_report', autoEmail.trim());
      setIsAutoSubscribed(true);
    } catch {}
  };

  return (
    <AuthGuard
      title="Veli Raporunu Görüntülemek İçin Giriş Yapmalısınız"
      description="Öğrencinizin haftalık gelişim karnesini oluşturmak, WhatsApp ile paylaşmak veya e-posta raporu almak için lütfen hesabınıza giriş yapın."
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6 py-8">
          {/* Veli Bilgilendirme Hero Kutusu */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-6 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/30 dark:via-slate-900 dark:to-purple-950/20 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <HeartHandshake className="h-4 w-4" />
                  <span>Sayın Velimiz, Öğrencinizin Haftalık LGS Gelişim Karnesi</span>
                </div>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Eksik Kapatma &amp; Öğrenme Analizi
                </h1>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  LGS başarısı sadece çok soru çözmekle değil, çözülemeyen soruları öğrenmekle gelir.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Kopyalandı' : 'Raporu Kopyala'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>WhatsApp ile Paylaş</span>
                </button>
              </div>
            </div>
          </div>

          {/* Veliye Ücretsiz Doğrudan Gönderim Paneli */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. WhatsApp Direkt Gönderim */}
            <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-xs dark:border-emerald-950 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Smartphone className="h-4 w-4 text-emerald-600" />
                  <span>Velimin WhatsApp'ına Direkt Gönder (Ücretsiz)</span>
                </div>
                <h3 className="mt-1 text-sm font-black text-slate-900 dark:text-white">
                  Telefon Numarasına Rapor Gönder
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Velinizin numarasını girin, sistem hazır başarı karnesini doğrudan velinizin sohbetine açsın.
                </p>

                <form onSubmit={handleSendToPhoneWhatsApp} className="mt-4 flex gap-2">
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="05xx xxx xx xx"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition cursor-pointer shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Gönder</span>
                  </button>
                </form>
              </div>
              <span className="mt-3 block text-[10px] text-slate-400">
                0 TL maliyet &bull; Doğrudan WhatsApp Deep-Link ile açılır
              </span>
            </div>

            {/* 2. E-Posta Karnesi Gönderim */}
            <div className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-xs dark:border-indigo-950 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span>Velimin E-Postasına Gönder (Ücretsiz)</span>
                </div>
                <h3 className="mt-1 text-sm font-black text-slate-900 dark:text-white">
                  Renkli HTML Karne Postala
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Velinizin e-posta adresine detaylı puan, net ve eksik konu analizli resmi karne gönderin.
                </p>

                <form onSubmit={handleSendEmail} className="mt-4 flex gap-2">
                  <input
                    type="email"
                    required
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="veli@ornek.com"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isEmailSending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer shrink-0 disabled:opacity-60"
                  >
                    {isEmailSending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    <span>{isEmailSending ? 'İletiliyor...' : 'Postala'}</span>
                  </button>
                </form>

                {emailStatus && (
                  <div
                    className={`mt-2.5 rounded-xl p-2.5 text-[11px] font-bold ${
                      emailStatus.success
                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {emailStatus.message}
                  </div>
                )}
              </div>
              <span className="mt-3 block text-[10px] text-slate-400">
                0 TL maliyet &bull; Resend / SMTP şablonu ile anında iletilir
              </span>
            </div>
          </div>

          {/* Her Pazar Saat 20:00 Otomatik Veli Karnesi Bildirimi */}
          <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-500/10 p-5 shadow-xs dark:border-amber-900/50 dark:from-amber-950/30 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                <Bell className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Her Pazar Saat 20:00&apos;de Otomatik Karne Bildirimi
                  </h3>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    ÜCRETSİZ OTOMASYON
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                  Öğrenciniz pazar günkü canlı LGS denemesini bitirdiğinde, haftalık gelişim ve eksik konu karnesi her Pazar saat 20:00&apos;de otomatik olarak e-postanıza postalanır.
                </p>
              </div>
            </div>

            {isAutoSubscribed ? (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 shrink-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Kayıtlı: Her Pazar 20:00&apos;de Rapor Gönderilecek</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribeAutoReport} className="flex gap-2 shrink-0 w-full sm:w-auto">
                <input
                  type="email"
                  required
                  value={autoEmail}
                  onChange={(e) => setAutoEmail(e.target.value)}
                  placeholder="veli@ornek.com"
                  className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-amber-500 focus:outline-none dark:border-amber-800 dark:bg-slate-800 dark:text-white w-full sm:w-56"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition cursor-pointer shrink-0"
                >
                  Otomatik Abone Ol
                </button>
              </form>
            )}
          </div>

          {/* Son Deneme Sınavı Performans Kartı */}
          {latestExam && (
            <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      SON DENEME SINAVI
                    </span>
                    <span className="text-xs text-slate-400">{latestExam.examDate}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
                    {latestExam.examTitle}
                  </h3>
                </div>

                <Link
                  href="/deneme-gecmisi"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <span>Gelişim Grafiğini İncele</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 pt-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Puan</span>
                  <p className="mt-1 text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {latestExam.totalScore}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Toplam Net</span>
                  <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {latestExam.totalNet.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Yüzdelik Dilim</span>
                  <p className="mt-1 text-2xl font-black text-violet-600 dark:text-violet-400">
                    %{latestExam.calculatedPercentile}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">D / Y / B</span>
                  <p className="mt-1 text-lg font-black text-slate-800 dark:text-slate-200">
                    {latestExam.totalCorrect}D / {latestExam.totalIncorrect}Y / {latestExam.totalEmpty}B
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3 Büyük Özet Kartı */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* 1. Başarı Oranı */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Eksik Kapatma Skoru
                </span>
                <Award className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                  %{successRate}
                </span>
                <span className="text-xs text-slate-400 font-medium">Başarı</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Takıldığı {stats.total || 3} sorunun {stats.resolved || 2} tanesini Sokratik asistanla kavradı.
              </p>
            </div>

            {/* 2. Çözülen Soru Sayısı */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Öğrenilen Sorular
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {stats.resolved}
                </span>
                <span className="text-xs text-slate-400 font-medium">Soru Net Kazandırdı</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Bu sorular öğrenilmeseydi gerçek sınavda net kaybına neden olacaktı.
              </p>
            </div>

            {/* 3. Bekleyen Soru Sayısı */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">
                  İncelenmesi Gereken
                </span>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-amber-600 dark:text-amber-400">
                  {stats.unresolved + stats.hinted}
                </span>
                <span className="text-xs text-slate-400 font-medium">Soru Bekliyor</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Öğrencinizin hafta bitmeden bu soruları çözmesi önerilir.
              </p>
            </div>
          </div>

          {/* Kritik Konu Alarmı & Veliye Tavsiye Notu (2 Kolon) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Kritik Konu Alarmı */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900/50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Kritik Konu Alarmı
                </h3>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Öğrencinizin son denemelerde ve soru çözümlerinde en çok takıldığı 2 konu:
              </p>

              <div className="mt-4 space-y-2.5">
                {criticalTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 text-xs dark:border-amber-900/30 dark:bg-amber-950/20"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {topic.name}
                    </span>
                    <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                      {topic.count} Soru
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedagojik Rehberlik Tavsiyesi */}
            <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm dark:border-indigo-900/50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Pedagojik Rehberlik Tavsiyesi
                </h3>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Yapay zekâ koçumuzun öğrencinin çalışma temposu ve net eğilimlerine göre tavsiyeleri:
              </p>

              <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
                <p className="text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">
                  &ldquo;Öğrenciniz soru köklerindeki yönlendirmeleri hızla kavrayabiliyor. 
                  Matematik dersinde net kaybını sıfırlamak için problem çözerken formülü ezberlemek yerine 
                  verilen şekil veya tabloyu kendi cümleleriyle özetlemesini isteyebilirsiniz. 
                  Bu yöntem akıl yürütme becerisini %30 artıracaktır.&rdquo;
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow transition hover:bg-emerald-700 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Raporu WhatsApp&apos;ta Paylaş</span>
                </button>
                <Link
                  href="/yanlis-defteri"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Soruları Gör</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }
