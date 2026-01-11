import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

export default function StoreEventCard({ event }) {
  return (
    <div className='flex relative overflow-hidden items-center justify-center bg-muted/50 aspect-video rounded-xl'>
      <RandomImageFadeCarousel />
      <span className='absolute'>event {event.id}</span>
    </div>
  );
}
