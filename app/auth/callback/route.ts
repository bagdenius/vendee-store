import { NextResponse } from 'next/server';

import { createProfileFromUserAction } from '@/features/auth/actions/createProfileFromUserAction';
import { getProfileAction } from '@/features/auth/actions/getProfileAction';
import { getUserAction } from '@/features/auth/actions/getUserAction';
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
    if (!error) {
      // create user profile if doesn't exist
      const { user } = await getUserAction();
      if (!user) return NextResponse.redirect(`${origin}/auth`);
      const { profile } = await getProfileAction(user.id);
      if (!profile) createProfileFromUserAction(user);
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
  return NextResponse.redirect(`${origin}/auth`);
}
