import Link from 'next/link';

import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

export default function StoreEventCard({ event }) {
  return (
    <Link href='#'>
      <div className='flex relative overflow-hidden items-center justify-center bg-muted/50 aspect-video rounded-xl hover:ring-3 hover:ring-muted/50 transition-all'>
        <RandomImageFadeCarousel />
        <h2 className='absolute scroll-m-20 border-b-3 pb-1 text-3xl font-semibold tracking-tight first:mt-0 hover:scale-x-115  hover:scale-y-105 transition-transform'>
          {event.text}
        </h2>
      </div>
    </Link>
  );
}
