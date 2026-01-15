'use server';

import { signout } from '@/shared/dal/services/auth/signout';

export async function signoutAction() {
  const { error } = await signout();
  if (error) throw new Error(`Failed to sign out: ${error.message}`);
}
