import React from 'react';

import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const session = (await supabase.auth.getSession()).data.session;
  if (session) redirect('/');

  return (
    <>
      <div className='absolute right-5 top-5 z-1'>
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
