import { redirect } from 'next/navigation';
import React from 'react';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const session = (await supabase.auth.getSession()).data.session;
  if (session) redirect('/');
  return children;
}
