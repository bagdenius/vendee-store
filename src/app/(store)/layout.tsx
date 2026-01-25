import { StoreHeader } from '@/features/store/components/StoreHeader';
import { StoreSidebar } from '@/features/store/components/StoreSidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/Sidebar';
import { Heart } from 'lucide-react';
import Link from 'next/link';

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
          <SidebarInset>
            {children}
            <div className='flex justify-center items-center py-16 text-xs text-muted-foreground'>
              made with&nbsp;
              <Heart size={14} />
              &nbsp;by&nbsp;
              <Link href='https://t.me/bagdenius'>@bagdenius</Link>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
