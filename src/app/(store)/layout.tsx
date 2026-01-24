import { StoreHeader } from '@/features/store/components/StoreHeader';
import { StoreSidebar } from '@/features/store/components/StoreSidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/Sidebar';
import { getCurrentProfile } from '@/shared/dal/services/profile/getCurrentProfile';

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileResultPromise = getCurrentProfile();

  return (
    <div className='[--header-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex flex-col' defaultOpen={true}>
        <StoreHeader />
        <div className='flex flex-1'>
          <StoreSidebar profileResultPromise={profileResultPromise} />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
