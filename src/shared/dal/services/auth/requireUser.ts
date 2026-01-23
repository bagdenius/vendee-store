import 'server-only';

import { redirect } from 'next/navigation';

import { getCurrentProfile } from '../profile/getCurrentProfile';

export async function requireUser(roles?: string[]) {
  const { data: profile, error } = await getCurrentProfile();
  // if (error || !profile) throw new Error('Unauthorized');
  // if (!roles?.includes(profile.role)) throw new Error('Forbidden');
  if (error || !profile) redirect('/auth');
  if (roles?.length && !roles?.includes(profile.role))
    throw new Error('Forbidden');
  // redirect('/forbidden');
}
