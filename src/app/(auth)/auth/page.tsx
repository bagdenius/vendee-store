import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';

export default async function AuthPage() {
  return (
    <>
      <div className='absolute right-5 top-5 z-1'>
        <ThemeToggle />
      </div>
      <div className='grid min-h-svh lg:grid-cols-2'>
        <div className='flex relative max-h-svh flex-col gap-4 p-6 md:p-10 overflow-y-auto no-scrollbar'>
          <Link
            href='/'
            className='absolute self-center w-50 aspect-5/1 md:right-20 lg:right-10'
          >
            <Image
              fill
              className='object-contain'
              src='/logo.png'
              alt='vendee logo'
              draggable={false}
              sizes='200px'
            />
          </Link>
          <div className='flex flex-1 items-center justify-center'>
            <div className='w-full max-w-xs'>
              <Tabs defaultValue='login'>
                <TabsList className='mx-auto md:absolute md:top-5 md:left-5'>
                  <TabsTrigger value='login'>Login</TabsTrigger>
                  <TabsTrigger value='signup'>Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                  <LoginForm />
                </TabsContent>
                <TabsContent value='signup'>
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className='bg-muted relative hidden overflow-hidden lg:block'>
          {/* <RandomImageFadeCarousel /> */}
        </div>
      </div>
    </>
  );
}
