import 'server-only';

import { redirect } from 'next/navigation';

import { getUser } from './getUser';

export async function requireUser(roles?: string[]) {
  const { data: user, error } = await getUser();
  // if (error || !profile) throw new Error('Unauthorized');
  // if (!roles?.includes(profile.role)) throw new Error('Forbidden');
  if (error || !user) redirect('/auth');
  // if (roles?.length && !roles?.includes(profile.role))
  // throw new Error('Forbidden');
  // redirect('/forbidden');
}
