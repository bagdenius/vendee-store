import { Suspense } from 'react';

import { NavUser, NavUserSkeleton } from '@/shared/components/ui/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from '@/shared/components/ui/Sidebar';
import { getAllCategories } from '@/shared/dal/services/category/getAllCategories';
import { NavCategories } from './NavCategories';

export async function StoreSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const { data: categories, error } = await getAllCategories();

  if (error) return;

  return (
    <Sidebar
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
      collapsible='icon'
      {...props}
    >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <AxeIcon className='!size-5' />
                <span className='text-base font-semibold'>Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>vendee</span>
                  <span className='truncate text-xs'>store</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        {/* <NavMain items={dataMock.navMain} /> */}
        {/* <NavProjects projects={dataMock.projects} /> */}
        {/* <NavSecondary items={dataMock.navSecondary} className='mt-auto' /> */}
        <NavCategories categories={categories} />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
