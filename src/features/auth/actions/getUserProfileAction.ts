'use server';

import type { AuthError, PostgrestError } from '@supabase/supabase-js';

import { getProfileAction } from './getProfileAction';
import { getUserAction } from './getUserAction';

import type { UserProfile } from '../models';

export async function getUserProfileAction(): Promise<{
  userProfile: UserProfile | null;
  error: AuthError | PostgrestError | null;
}> {
  const { user, error: userError } = await getUserAction();
  if (!user) return { userProfile: null, error: userError };
  const { profile, error: profileError } = await getProfileAction(user.id);
  if (!profile) return { userProfile: null, error: profileError };
  const userProfile = { ...profile, ...user };
  return { userProfile, error: null };
}
