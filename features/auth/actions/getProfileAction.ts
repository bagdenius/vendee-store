'use server';

import type { PostgrestError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { getProfile } from '@/shared/data/services/auth/getProfile';

import type { Profile } from '../models';
import { cache } from 'react';

export const getProfileAction = cache(async function (userId: string): Promise<{
  profile: Profile | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await getProfile(userId);
  const profile = data && objectToCamel(data);
  return { profile, error };
});
