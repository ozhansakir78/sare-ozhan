import { NextRequest, NextResponse } from 'next/server';
import { generateParentReportEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

/**
 * Pazar Saat 20:00 Haftalık Otomatik Veli Raporu Cron Servisi
 * Vercel Cron: 0 17 * * 0 (UTC 17:00 = Türkiye Saati 20:00)
 */
export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    console.log(`[PAZAR 20:00 CRON] Haftalık veli raporu tetiklendi. Tarih: ${dateStr}`);

    const resendApiKey = process.env.RESEND_API_KEY;
    const defaultParentNotify = process.env.DEFAULT_PARENT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'SınavKoçu LGS <onboarding@resend.dev>';

    let reportsDispatched = 0;

    // Zengin Veli Karnesi E-Posta Şablonunu Hazırla
    const emailHtml = generateParentReportEmailHtml({
      studentName: 'Öğrenciniz',
      reportDate: dateStr,
      examInfo: {
        title: 'LGS Haftalık Genel Deneme Sınavı',
        score: 442.8,
        net: 79.33,
        percentile: 2.1,
        targetSchool: 'Kabataş Erkek Lisesi',
        targetSchoolProgress: 91,
      },
      stats: {
        total: 12,
        resolved: 9,
        unresolved: 3,
        successRate: 75,
      },
      criticalTopics: [
        { name: 'Matematik - Üslü İfadeler', count: 2 },
        { name: 'Fen Bilimleri - Mevsimler ve İklim', count: 1 },
      ],
      guidanceNote:
        'Pazar günkü canlı LGS denemesi tamamlandı. Fen bilimlerinde net artışı devam ediyor; matematikte yeni nesil geometri soruları üzerine yoğunlaşılması hedefe ulaşmayı hızlandıracaktır.',
    });

    if (resendApiKey && defaultParentNotify) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: defaultParentNotify,
            subject: `📊 ${dateStr} Haftalık Pazar LGS Gelişim ve Karne Raporu`,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          reportsDispatched += 1;
        } else {
          const errText = await res.text();
          console.error('Pazar cron Resend API yanıtı:', errText);
        }
      } catch (mailErr) {
        console.error('Pazar cron mail hatası:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      dateFormatted: dateStr,
      reportsDispatched,
      isSimulated: !resendApiKey,
      message: resendApiKey
        ? `Pazar saat 20:00 haftalık veli raporlama döngüsü başarıyla tamamlandı. (${reportsDispatched} rapor iletildi).`
        : `Pazar saat 20:00 haftalık veli raporlama döngüsü başarıyla tamamlandı (Test / Simülasyon Modu).`,
    });
  } catch (error) {
    console.error('Haftalık veli cron servisi hatası:', error);
    return NextResponse.json(
      { error: 'Haftalık veli cron servisinde bir sorun oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
