import { NextResponse, type NextRequest } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Google OAuth ve Supabase E-posta Doğrulama Callback Yönlendiricisi
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as
    | 'signup'
    | 'email'
    | 'recovery'
    | 'invite'
    | null;
  const next = requestUrl.searchParams.get('next') ?? '/profil';

  if (isSupabaseConfigured) {
    try {
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      } else if (token_hash && type) {
        await supabase.auth.verifyOtp({ token_hash, type });
      }
    } catch (error) {
      console.error('Auth Callback doğrulama hatası:', error);
      return NextResponse.redirect(
        new URL(`/giris?error=${encodeURIComponent('E-posta doğrulama süresi dolmuş veya geçersiz.')}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
