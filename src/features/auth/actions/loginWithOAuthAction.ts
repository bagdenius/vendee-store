'use server';

import type {
  Provider,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

import { loginWithOAuth } from '@/shared/dal/services/auth/loginWithOAuth';

export async function loginWithOAuthAction(oauthProvider: Provider) {
  const credentials: SignInWithOAuthCredentials = {
    provider: oauthProvider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?provider=${oauthProvider}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  };
  const { data, error } = await loginWithOAuth(credentials);
  if (error) return { error };
  if (data.url) redirect(data.url);
  return { provider: data.provider, url: data.url };
}
