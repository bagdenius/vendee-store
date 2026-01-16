import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

export default function StoreEventCard({
  event,
}: {
  event: { id: string; text: string };
}) {
  return (
    <div className='flex bg-muted/50 relative items-center justify-center overflow-hidden rounded-xl aspect-video lg:aspect-square'>
      {/* <RandomImageFadeCarousel /> */}
      <h2 className='absolute m-16 text-center text-3xl border-b-3 pb-2 z-1'>
        {event.text}
      </h2>
    </div>
  );
}
