'use client';

import { Apple, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/HoverCard';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/Sidebar';
import { CategoryList } from '@/shared/dal/entities';

type NavCategoriesProps = {
  categories: CategoryList;
};

export function NavCategories({ categories }: NavCategoriesProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Shop by category</SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((category) => (
          <SidebarMenuItem key={category.id}>
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <SidebarMenuButton tooltip={category.name} asChild>
                  <Link href={`/category/${category.slug}`}>
                    {/* todo: implement category icons */}
                    <Apple />
                    <span>{category.name}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </Link>
                </SidebarMenuButton>
              </HoverCardTrigger>
              <HoverCardContent
                className='flex flex-col'
                side='left'
                sideOffset={4}
              >
                <div>{category.name} subcategories</div>
              </HoverCardContent>
            </HoverCard>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
