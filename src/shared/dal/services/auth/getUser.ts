import 'server-only';

import type { AuthError } from '@supabase/supabase-js';
import { cache } from 'react';
import { objectToCamel } from 'ts-case-convert';

import type { User } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';

export const getUser = cache(async (): Promise<Result<User, AuthError>> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return err(error);
  const camelized = objectToCamel(data.user);
  return ok(camelized);
});
