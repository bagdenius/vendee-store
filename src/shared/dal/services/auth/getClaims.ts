import 'server-only';

import { AuthError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getClaims() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error) return { error };
  if (!data) return { error: new AuthError('No claims were returned') };
  return { data: objectToCamel(data.claims) };
}
