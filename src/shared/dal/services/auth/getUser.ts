import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { UserResult } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export const getUser = async (): Promise<UserResult> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { error };
  return { data: objectToCamel(data.user) };
};
