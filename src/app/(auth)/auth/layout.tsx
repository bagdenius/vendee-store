import { redirect } from 'next/navigation';
import React from 'react';

import { getUser } from '@/shared/dal/services/auth/getUser';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, error } = await getUser();
  if (error) console.log(error);
  if (user) redirect('/');
  return children;
}
