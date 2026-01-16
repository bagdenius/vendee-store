'use server';

import type { AuthError, PostgrestError } from '@supabase/supabase-js';

import { getProfileAction } from './getProfileAction';
import { getUserAction } from './getUserAction';

import type { Profile } from '../models';

export async function getCurrentUserProfileAction(): Promise<{
  profile: Profile | null;
  error: AuthError | PostgrestError | null;
}> {
  const { user, error: userError } = await getUserAction();
  if (!user) return { profile: null, error: userError };
  const { profile, error: profileError } = await getProfileAction(user.id);
  if (!profile) return { profile: null, error: profileError };
  return { profile, error: null };
}
