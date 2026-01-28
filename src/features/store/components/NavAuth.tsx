import Link from 'next/link';
import { UserIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/Button';
import { SidebarMenu, SidebarMenuItem } from '@/shared/components/ui/Sidebar';
import { getProfile } from '@/shared/dal/services/profile/getCurrentProfile';
import { NavUser } from './NavUser';

export default async function NavAuth() {
  const { data: profile, error } = await getProfile();

  if (error)
    return (
      <SidebarMenu className='min-h-12'>
        <SidebarMenuItem className='text-center'>
          <Button variant='link' asChild>
            <Link href='/auth'>
              <UserIcon />
              <span>Log in to your account</span>
            </Link>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return <NavUser profile={profile} />;
}
