import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';
import Link from 'next/link';

export default function PromoCard({
  event,
}: {
  event: { id: string; text: string };
}) {
  return (
    <Link
      href='#'
      className='flex bg-muted/50 relative items-center justify-center overflow-hidden rounded-xl aspect-video lg:aspect-square hover:ring-2 hover:ring-ring/50 transition-shadow'
    >
      <RandomImageFadeCarousel />
      <h2 className='absolute m-16 text-center text-3xl border-b-3 pb-2 z-1'>
        {event.text}
      </h2>
    </Link>
  );
}
