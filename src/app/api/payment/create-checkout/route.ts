import { NextRequest, NextResponse } from 'next/server';
import { PRICING_PLANS } from '@/lib/payment';

interface CheckoutRequestBody {
  planId: 'season' | 'monthly';
  email?: string;
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutRequestBody;
    const { planId } = body;

    const plan = PRICING_PLANS[planId];
    if (!plan) {
      return NextResponse.json({ error: 'Geçersiz paket seçimi.' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const checkoutToken = `chk_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
    const checkoutUrl = `${origin}/odeme/onay?token=${checkoutToken}&plan=${plan.id}&price=${plan.price}&planName=${encodeURIComponent(plan.name)}`;

    return NextResponse.json({
      success: true,
      checkoutUrl,
      token: checkoutToken,
      plan,
    });
  } catch (error) {
    console.error('Ödeme oturumu hatası:', error);
    return NextResponse.json(
      { error: 'Ödeme oturumu başlatılırken bir sorun oluştu.' },
      { status: 500 }
    );
  }
}
