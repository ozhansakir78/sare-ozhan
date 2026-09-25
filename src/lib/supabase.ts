import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const DEFAULT_SUPABASE_URL = 'https://llvwrzdjcpvnzoqfxjeg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_zFul6a9an8RBGbIOhqpENg_yXLF-2sM';

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
);

if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.warn(
    'Bilgi: NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil. Uygulama hibrit yerel depolama modunda çalışacaktır.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
