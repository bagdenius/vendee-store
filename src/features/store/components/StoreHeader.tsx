'use client';

import { TextAlignJustify } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/Breadcrumb';
import { Button } from '@/shared/components/ui/Button';
import { SearchForm } from '@/shared/components/ui/SearchForm';
import { Separator } from '@/shared/components/ui/Separator';
import { useSidebar } from '@/shared/components/ui/Sidebar';

export function StoreHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbMap: Record<string, string> = {
    product: 'Product',
  };

  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
        <Button variant='ghost' size='lg' onClick={toggleSidebar}>
          <TextAlignJustify />
          CATALOG
        </Button>
        <Separator orientation='vertical' className='mr-2' />
        <Breadcrumb className='hidden sm:block'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href='/'
                  className='-mt-1 text-3xl tracking-tighter scale-y-90'
                >
                  vendee
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((segment, i) => {
              const isLast = i === segments.length - 1;
              const href = '/' + segments.slice(0, i + 1).join('/');
              const label =
                breadcrumbMap[segment] ||
                segment
                  .split('-')
                  .map((word) => word.at(0)?.toUpperCase() + word.slice(1))
                  .join(' ');

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ThemeToggle />
      </div>
    </header>
  );
}
