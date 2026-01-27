import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { ProfileResult } from '@/shared/dal/entities';
import { createSupabasePublicClient } from '@/shared/lib/supabase/public';

export async function getProfileById(id: string): Promise<ProfileResult> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return { error };
  return { data: objectToCamel(data) };
}
