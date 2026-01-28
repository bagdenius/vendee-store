import 'server-only';

import { redirect } from 'next/navigation';
import { getClaims } from './getClaims';

export async function requireUser(roles?: string[]) {
  const { data, error } = await getClaims();
  if (error || !data) redirect('/auth');
}
