'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import { loginSchema, LoginSchema } from '../types/LoginSchema';
import { Provider } from '@supabase/supabase-js';

// export async function protectRoute() {
//   const user = await getUser();
//   if (!user) {
//     // redirect('/login');
//     throw new Error('Unauthorized');
//   }
// }

export async function login(data: LoginSchema) {
  const supabase = await createSupabaseServerClient();

  const result = loginSchema.safeParse(data);
  let validationErrors: { [key: string]: string } = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      validationErrors = {
        ...validationErrors,
        [issue.path[0]]: issue.message,
      };
    });
    return { validationErrors };
  }

  const { error } = await supabase.auth.signInWithPassword(result.data);
  if (error) return { error: 'Invalid email or password' };

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: `${firstName + ' ' + lastName}`,
        email: formData.get('email') as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signout() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    redirect('/error');
  }

  redirect('/');
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) {
    console.error(`Google sign in error: ${error.message}`);
    return { error };
  }
  redirect(data.url);
}

export async function signInWithGitHub() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        prompt: 'consent',
      },
    },
  });
  if (error) {
    console.error(`GitHub sign in error: ${error.message}`);
    return { error };
  }
  redirect(data.url);
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
    console.error(`GitHub sign in error: ${error.message}`);
    return { error };
  }
  redirect(data.url);
}
