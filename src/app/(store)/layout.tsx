import { StoreHeader } from '@/features/store/components/StoreHeader';
import { StoreSidebar } from '@/features/store/components/StoreSidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/Sidebar';

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='[--header-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex flex-col' defaultOpen={true}>
        <StoreHeader />
        <div className='flex flex-1'>
          <StoreSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
