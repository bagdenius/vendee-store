import 'server-only';

import type { ProfileResult } from '@/shared/dal/entities';
import { getClaims } from '../auth/getClaims';
import { getProfileById } from './getProfileById';

export const getProfile = async (): Promise<ProfileResult> => {
  const { data, error } = await getClaims();
  if (error) return { error };
  return await getProfileById(data.sub);
};
