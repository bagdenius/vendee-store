'use server';

import type {
  Provider,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { loginWithProvider } from '@/shared/data/services/auth/loginWithProvider';

export async function loginWithProviderAction(provider: Provider) {
  // build credentials
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
  // login
  const { data, error } = await loginWithProvider(credentials);
  // error handling
  if (error)
    throw new Error(`Failed to sign in with OAuth provider: ${error.message}`);
  if (!data.url)
    throw new Error('OAuth provider did not return a redirect URL');
  // revalidate/redirect
  revalidatePath('/', 'layout');
  redirect(data.url);
}
