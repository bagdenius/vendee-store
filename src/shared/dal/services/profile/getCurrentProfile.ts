import 'server-only';

import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { getProfileById } from './getProfileById';
import { getUser } from '../auth/getUser';

import type { Profile } from '@/shared/dal/entities';

export async function getCurrentProfile(): Promise<{
  profile: Profile | null;
  error: AuthError | PostgrestError | null;
}> {
  const { user, error: userError } = await getUser();
  if (!user) return { profile: null, error: userError };
  const { profile, error: profileError } = await getProfileById(user.id);
  return { profile, error: profileError };
}
