import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/ui/Sidebar';
import { getAllCategories } from '@/shared/dal/services/category/getAllCategories';
import { NavCategories } from './NavCategories';
import { NavUser } from './NavUser';

export function StoreSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const categoriesPromise = getAllCategories();

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
