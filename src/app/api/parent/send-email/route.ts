import { NextRequest, NextResponse } from 'next/server';
import { generateParentReportEmailHtml, type ParentReportEmailData } from '@/lib/email-templates';

interface SendParentEmailRequest {
  parentEmail: string;
  studentName?: string;
  examInfo?: {
    title: string;
    score: number;
    net: number;
    percentile?: number;
    targetSchool?: string;
    targetSchoolProgress?: number;
  };
  stats: {
    total: number;
    resolved: number;
    unresolved: number;
    successRate: number;
  };
  criticalTopics: Array<{ name: string; count?: number }>;
  guidanceNote?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SendParentEmailRequest;
    const { parentEmail, studentName, examInfo, stats, criticalTopics, guidanceNote } = body;

    if (!parentEmail || !parentEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir veli e-posta adresi girin.' },
        { status: 400 }
      );
    }

    const name = studentName || 'Öğrenciniz';
    const dateStr = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Zengin HTML Veli Karnesi Şablonunu Üret
    const htmlContent = generateParentReportEmailHtml({
      studentName: name,
      reportDate: dateStr,
      examInfo,
      stats,
      criticalTopics,
      guidanceNote,
    });

    // 1. Resend API Anahtarı varsa doğrudan gönder
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'SınavKoçu LGS <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: parentEmail,
          subject: `📊 ${name} için Haftalık LGS İlerleme Raporu - %${stats.successRate} Başarı`,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend API Hatası:', err);
        return NextResponse.json(
          { error: 'E-posta servisi yanıt vermedi. Lütfen daha sonra tekrar deneyin.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `${parentEmail} adresine veli raporu başarıyla iletildi!`,
      });
    }

    // 2. API anahtarı henüz eklenmemişse (Geliştirme / Yerel Test Modu)
    console.log(`[E-POSTA SİMÜLASYONU] ${parentEmail} adresine LGS Veli Raporu gönderildi.`);
    return NextResponse.json({
      success: true,
      simulated: true,
      message: `${parentEmail} adresine veli raporu başarıyla iletildi (Test Modu).`,
    });
  } catch (error) {
    console.error('Veli e-posta gönderme hatası:', error);
    return NextResponse.json(
      { error: 'E-posta gönderilirken teknik bir aksaklık oluştu.' },
      { status: 500 }
    );
  }
}
