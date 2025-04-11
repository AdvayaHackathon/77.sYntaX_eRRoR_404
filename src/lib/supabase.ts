
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Get environment variables or use fallback empty values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if no URL is provided to prevent runtime errors
export const supabase = supabaseUrl 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : {
      from: () => ({
        select: () => ({ data: null, error: new Error('Supabase not configured') }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
        eq: () => ({ data: null, error: new Error('Supabase not configured') }),
        order: () => ({ data: null, error: new Error('Supabase not configured') }),
        single: () => ({ data: null, error: new Error('Supabase not configured') }),
        or: () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
      // Add minimal mock implementations for other methods you might use
    } as unknown as ReturnType<typeof createClient<Database>>;

// Log whether Supabase is properly configured
console.log(`Supabase client ${supabaseUrl ? 'initialized' : 'NOT initialized - using mock client'}`);
