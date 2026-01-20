import 'server-only';

import { cache } from 'react';

import { getCurrentProfile } from '../profile/getCurrentProfile';

export const requireUser = cache(async (roles?: string[]) => {
  const { profile, error } = await getCurrentProfile();
  // or redirect to login page
  if (error || !profile) throw new Error('Unauthorized');
  if (!roles?.includes(profile.role)) throw new Error('Forbidden');
});

// export const requireUser = cache(
//   async (roles?: string[]): Promise<Result<null, Error>> => {
//     const { profile, error } = await getCurrentProfile();
//     if (error || !profile) return err(new Error('Unauthorized'));
//     if (!roles?.includes(profile.role)) return err(new Error('Forbidden'));
//     return ok(null);
//   },
// );
