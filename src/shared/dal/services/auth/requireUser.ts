import 'server-only';

import { getCurrentProfile } from '../profile/getCurrentProfile';

export async function requireUser(roles?: string[]) {
  const { profile, error } = await getCurrentProfile();
  // or redirect to login page
  if (!profile || error) throw new Error('Unauthorized');
  if (!roles?.includes(profile.role)) throw new Error('Forbidden');
}
