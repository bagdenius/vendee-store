import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/shared/components/ui/Sidebar';
import { getCategories } from '@/shared/dal/services/category/getCategories';
import { Suspense } from 'react';
import NavAuth from './NavAuth';
import { NavCategories } from './NavCategories';
import { NavUserSkeleton } from './NavUser';

export async function StoreSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: categories, error } = await getCategories();

  return (
    <Sidebar
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
      {...props}
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {!error && <NavCategories categories={categories} />}
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavAuth />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
