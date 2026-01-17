'use server';

import type {
  Provider,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';

import { loginWithProvider } from '@/shared/dal/services/auth/loginWithProvider';
import { redirect } from 'next/navigation';

export async function loginWithProviderAction(provider: Provider) {
  const credentials: SignInWithOAuthCredentials = {
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  };
  const { data, error } = await loginWithProvider(credentials);
  if (data.url) redirect(data.url);
  return { data, error };
}
