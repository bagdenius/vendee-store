import { StoreHeader } from '@/features/store/components/StoreHeader';
import { StoreSidebar } from '@/features/store/components/StoreSidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/Sidebar';
import { getCurrentProfile } from '@/shared/dal/services/profile/getCurrentProfile';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profilePromise = getCurrentProfile();

  return (
    <div className='[--header-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex flex-col' defaultOpen={false}>
        <StoreHeader />
        <div className='flex flex-1'>
          <StoreSidebar profilePromise={profilePromise} />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
