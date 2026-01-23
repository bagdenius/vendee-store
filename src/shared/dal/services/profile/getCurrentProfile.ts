import 'server-only';

import { cache } from 'react';

import type { ProfileResult } from '@/shared/dal/entities';
import { getUser } from '../auth/getUser';
import { getProfileById } from './getProfileById';

export const getCurrentProfile = cache(async (): Promise<ProfileResult> => {
  const { data: user, error: userError } = await getUser();
  if (userError) return { error: userError };
  const { data: profile, error: profileError } = await getProfileById(user.id);
  if (profileError) return { error: profileError };
  return { data: profile };
});
