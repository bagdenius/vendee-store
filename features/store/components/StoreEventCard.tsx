'use client';

import Link from 'next/link';
import { MouseEvent } from 'react';
import { toast } from 'sonner';

import RandomImageFadeCarousel from '../../../shared/components/ui/RandomImageFadeCarousel';

export default function StoreEventCard({
  event,
}: {
  event: { id: string; text: string };
}) {
  function handleClick(
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    toast.warning('News/events are not implemented yet', {
      description: 'But we work on it :)',
      action: {
        label: 'Got it!',
        onClick: () => {},
      },
    });
  }

  return (
    <Link href='#' onClick={handleClick}>
      <div className='flex relative overflow-hidden items-center justify-center bg-muted/50 aspect-square rounded-xl hover:ring-3 hover:ring-muted/50 transition-all'>
        <RandomImageFadeCarousel />
        <h2 className='inline-block max-w-fit w-2/3 border-b-4 pb-1 text-3xl text-center font-semibold tracking-tight z-1 hover:scale-x-115 hover:scale-y-105 transition-transform '>
          {event.text}
        </h2>
      </div>
    </Link>
  );
}
