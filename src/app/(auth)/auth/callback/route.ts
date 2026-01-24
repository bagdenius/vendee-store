import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const provider = url.searchParams.get('provider');
  const nextParam = url.searchParams.get('next');
  const next =
    nextParam && nextParam.startsWith('/')
      ? nextParam
      : `/#auth=success&provider=${provider}`;
  if (!code) return NextResponse.redirect(new URL('/auth', url.origin));
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error)
    return NextResponse.redirect(
      new URL(`/auth?error=oauth_failed`, url.origin),
    );
  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocal = process.env.NODE_ENV === 'development';
  const redirectBase = isLocal
    ? url.origin
    : forwardedHost
      ? `https://${forwardedHost}`
      : url.origin;
  return NextResponse.redirect(`${redirectBase}${next}`);
}
