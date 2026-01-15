'use server';

import type { AuthError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { getUser } from '@/shared/data/services/user/getUser';

import type { BaseUser } from '../models';
import { cache } from 'react';

export const getUserAction = cache(async function (): Promise<{
  user: BaseUser | null;
  error: AuthError | null;
}> {
  const { data, error } = await getUser();
  const user = data && objectToCamel(data);
  return { user, error };
});
