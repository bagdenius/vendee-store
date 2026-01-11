import Link from 'next/link';

import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

export default function StoreHero() {
  return (
    <Link href='#'>
      <div className='flex relative items-center justify-center h-[25lvh] overflow-hidden bg-muted/50 rounded-xl hover:outline-3 hover:outline-muted/50'>
        <RandomImageFadeCarousel />
        <h1 className='absolute scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
          You will get what you want here
        </h1>
      </div>
    </Link>
  );
}
