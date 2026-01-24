import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/auth') &&
    request.cookies.get('sb-llwedkywjjlauduymnhr-auth-token.0')
  )
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/auth'],
};
