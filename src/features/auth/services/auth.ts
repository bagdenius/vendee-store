'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server-client';
import { loginSchema, LoginSchema } from '../types/LoginSchema';

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
  console.log('signout');

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
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }

  redirect(data.url);
}
