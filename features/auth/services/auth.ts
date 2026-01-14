'use server';

import { Provider, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import { loginSchema, LoginSchema } from '../types/LoginSchema';
import { signupSchema, SignupSchema } from '../types/SignupSchema';
import { createProfileFromProviderUser } from './user';

export async function login(formData: LoginSchema) {
  // server validation
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  // sign in
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(result.data);
  // error handle
  if (error) {
    console.error(`An error occured while signing in: ${error}`);
    if (error.code === 'invalid_credentials')
      return { error: new Error('Invalid email or/and password') };
    return { error };
  }
  // redirect (in future should change to client transition redirect)
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: SignupSchema) {
  // server validation
  const result = signupSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  // build object to insert
  const user: SignUpWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.email,
        full_name: formData.fullName,
        email: formData.email,
        role: 'user',
        avatar: '',
      },
    },
  };
  // sign up
  const supabase = await createSupabaseServerClient();
  const { data: signupData, error: signupError } = await supabase.auth.signUp(
    user
  );
  console.log('DATA:', signupData, 'ERROR: ', signupError);
  // error handle
  if (signupError) {
    console.error(`An error occured while signing up: ${signupError}`);
    return { error: signupError };
  }
  // create user profile
  const { profile, error: profileError } = await createProfileFromProviderUser(
    signupData.user!
  );
  if (profileError) {
    console.error(`Profile creation failed while signing up: ${profileError}`);
    return { error: profileError };
  }
  // redirect (in future should change to client transition redirect)
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signout() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(`An error occured while signing out: ${error}`);
    return { error };
  }
  redirect('/');
}

export async function signInWithProvider(provider: Provider) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) {
    console.error(`OAuth provider sign in error: ${error.message}`);
    return { error };
  }
  redirect(data.url);
}
