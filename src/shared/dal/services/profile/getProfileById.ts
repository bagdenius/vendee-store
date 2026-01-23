import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { ProfileResult } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getProfileById(id: string): Promise<ProfileResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return { error };
  return { data: objectToCamel(data) };
}
