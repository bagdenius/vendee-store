import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/ScrollArea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';

export default function AuthPage() {
  return (
    <div className='grid lg:grid-cols-2 h-svh'>
      <main className='relative'>
        <Tabs defaultValue='login' className='absolute w-full h-full gap-0'>
          <header className='flex items-center justify-between p-2 sm:p-4 border-b flex-wrap sm:flex-nowrap gap-x-100 gap-y-4 sm:gap-0'>
            <div className='flex flex-1 gap-2 items-center justify-between sm:order-last sm:flex-0'>
              <Link href='/' className='relative w-50 aspect-5/1'>
                <Image
                  fill
                  className='object-contain'
                  src='/logo.png'
                  alt='vendee logo'
                  draggable={false}
                  sizes='200px'
                />
              </Link>
              <div className='lg:fixed top-5 right-5'>
                <ThemeToggle />
              </div>
            </div>
            <TabsList className='flex-1 min-w-50 sm:max-w-fit'>
              <TabsTrigger value='login'>Login</TabsTrigger>
              <TabsTrigger value='signup'>Sign up</TabsTrigger>
            </TabsList>
          </header>
          <ScrollArea className='overflow-hidden no-scrollbar'>
            <div className='w-full max-w-sm mx-auto px-2 sm:px-4 pt-10 pb-20'>
              <TabsContent value='login'>
                <LoginForm />
              </TabsContent>
              <TabsContent value='signup'>
                <SignupForm />
              </TabsContent>
            </div>
            <ScrollBar />
          </ScrollArea>
        </Tabs>
      </main>
      <aside className='bg-muted relative hidden overflow-hidden lg:block -z-1'>
        <RandomImageFadeCarousel />
      </aside>
    </div>
  );
}
