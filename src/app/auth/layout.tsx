import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='absolute right-5 top-5 z-1'>
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
