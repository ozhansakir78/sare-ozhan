import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { calculateProExpirationDate } from '@/lib/payment';

interface PaymentWebhookBody {
  event: 'payment.succeeded' | 'payment.failed';
  token: string;
  userId?: string;
  planId: 'season' | 'monthly';
  amount: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentWebhookBody;
    const { event, userId, planId } = body;

    if (event !== 'payment.succeeded') {
      return NextResponse.json({ message: 'İşlem atlandı' }, { status: 200 });
    }

    // PRO bitiş tarihini hesapla
    const proExpiresAt = calculateProExpirationDate(planId);

    // Eğer Supabase bağlıysa ve userId varsa kullanıcı profilini PRO yap
    if (isSupabaseConfigured && userId) {
      await supabase
        .from('user_profiles')
        .update({
          is_pro: true,
          pro_expires_at: proExpiresAt,
          daily_quota_used: 0,
        })
        .eq('id', userId);
    }

    return NextResponse.json({
      success: true,
      message: 'PRO abonelik başarıyla aktifleştirildi.',
      proExpiresAt,
    });
  } catch (error) {
    console.error('Webhook işleme hatası:', error);
    return NextResponse.json({ error: 'Webhook hatası' }, { status: 500 });
  }
}
