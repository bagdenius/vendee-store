'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { signoutAction } from '@/features/auth/actions/signoutAction';
import { useCurrentProfile } from '@/shared/dal/hooks/profile/useCurrentProfile';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../shared/components/ui/Avatar';
import { Button } from '../../../shared/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../../../shared/components/ui/Sidebar';
import { Skeleton } from '../../../shared/components/ui/Skeleton';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: profile, isLoading, error, refetch } = useCurrentProfile();

  useEffect(() => {
    if (!profile) return;
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const auth = params.get('auth');
    const provider = params.get('provider');
    const action = params.get('action');

    if (auth === 'success') {
      toast.success(
        `You successfully ${action === 'signup' ? 'signed up' : 'signed in'} ${provider ? ` with ${provider.at(0)?.toUpperCase() + provider.slice(1)}` : ''}`,
        {
          description: `${profile?.fullName?.split(' ').at(0)}, Welcome and Happy shopping!`,
          action: { label: 'Got it!', onClick: () => {} },
        },
      );
      history.replaceState(null, '', window.location.pathname);
    }
  }, [profile]);

  async function handleLogout() {
    const { error } = await signoutAction();
    if (error) {
      toast.warning(error.message, {
        description: 'Try again :)',
        action: { label: 'Got it!', onClick: () => {} },
      });
      return;
    }
    refetch();
    toast.success('You successfully logged out', {
      description: "Hope you'll come back again :)",
      action: { label: 'Got it!', onClick: () => {} },
    });
  }

  if (isLoading) return <NavUserSkeleton />;

  if (error || !profile)
    return (
      <SidebarMenu className='min-h-12'>
        <SidebarMenuItem className='text-center'>
          <Button variant='link' asChild>
            <Link href='/auth'>
              <User />
              <span>Log in to your account</span>
            </Link>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={profile.avatar!} alt={profile.fullName!} />
                <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{profile.fullName}</span>
                <span className='truncate text-xs'>{profile.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={profile.avatar!} alt={profile.fullName!} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {profile.fullName}
                  </span>
                  <span className='truncate text-xs'>{profile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function NavUserSkeleton() {
  return (
    <div className='flex h-12 items-center mx-2 gap-2'>
      <Skeleton className='size-8 rounded-full' />
      <div className='grow space-y-1'>
        <Skeleton className='w-3/4 h-4' />
        <Skeleton className='h-3' />
      </div>
      <Skeleton className='w-4 h-5 rounded-full' />
    </div>
  );
}
