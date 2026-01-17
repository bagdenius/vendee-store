import { redirect } from 'next/navigation';
import React from 'react';

import { getUser } from '@/shared/dal/services/auth/getUser';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignupForm } from '@/features/auth/components/SignupForm';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();
  if (user) redirect('/');
  return children;
}
