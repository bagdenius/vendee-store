import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/shared/components/ui/Sidebar';
import { getCategories } from '@/shared/dal/services/category/getCategories';
import { NavCategories } from './NavCategories';
import { NavUser } from './NavUser';

export function StoreSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const categoriesPromise = getCategories();

  return (
    <Sidebar
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
      {...props}
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavCategories categoriesPromise={categoriesPromise} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
