'use client';

import {
  AxeIcon,
  BookOpen,
  Bot,
  Command,
  Frame,
  Info,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  User,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { UserProfile } from '../../auth/types/User';
import { Button } from '../../../shared/components/ui/Button';
import { NavMain } from '../../../shared/components/ui/NavMain';
import { NavProjects } from '../../../shared/components/ui/NavProjects';
import { NavSecondary } from '../../../shared/components/ui/NavSecondary';
import { NavUser } from '../../../shared/components/ui/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../shared/components/ui/Sidebar';

const dataMock = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
    {
      title: 'Payment and Delivery',
      url: '#',
      icon: Info,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

type StoreSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: UserProfile | null;
};

export function StoreSidebar({ ...props }: StoreSidebarProps) {
  const user = props.user;

  return (
    <Sidebar
      collapsible='icon'
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
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
        <NavMain items={dataMock.navMain} />
        <NavProjects projects={dataMock.projects} />
        <NavSecondary items={dataMock.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem className='text-center'>
              <Button variant='link' asChild>
                <Link href='/auth'>
                  <User />
                  <span>Log in to your account</span>
                </Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
