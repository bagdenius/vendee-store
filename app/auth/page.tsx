import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';

import logo from '@/public/logo.png';

export default function AuthPage() {
  return (
    <>
      <div className='absolute right-5 top-5 z-1'>
        <ThemeToggle />
      </div>
      <div className='grid min-h-svh lg:grid-cols-2'>
        <div className='flex max-h-svh flex-col gap-4 p-6 md:p-10 overflow-y-auto no-scrollbar'>
          <div className='flex justify-center gap-2 md:justify-end'>
            <Link href='/' className='flex items-center gap-2 font-medium'>
              <Image
                src={logo}
                alt='vendee logo'
                height={40}
                draggable={false}
              />
            </Link>
          </div>
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
          <RandomImageFadeCarousel />
        </div>
      </div>
    </>
  );
}
