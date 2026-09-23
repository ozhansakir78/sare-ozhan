import { NextResponse, type NextRequest } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Google OAuth ve Supabase E-posta Doğrulama Callback Yönlendiricisi
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code && isSupabaseConfigured) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('OAuth Callback oturum takas hatası:', error);
      return NextResponse.redirect(
        new URL(`/giris?error=${encodeURIComponent('Giriş doğrulaması başarısız oldu.')}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
