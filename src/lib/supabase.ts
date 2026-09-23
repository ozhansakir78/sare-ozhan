import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const rawSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('example.com') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-anon-key') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
);

if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.warn(
    'Bilgi: NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil. Uygulama hibrit yerel depolama modunda çalışacaktır.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
