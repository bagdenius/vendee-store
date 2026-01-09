import { NextResponse } from 'next/server';

import {
  createProfileFromGoogleUser,
  getProfile,
} from '@/features/auth/services/user';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';
  if (!next.startsWith('/')) {
    next = '/';
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

    // create user profile if doesn't exist
    const user = (await supabase.auth.getUser()).data.user;
    console.log('USER', user);
    if (!user) return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    const userProfile = await getProfile(user.id);
    if (!userProfile) createProfileFromGoogleUser(user);

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';
    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
}
