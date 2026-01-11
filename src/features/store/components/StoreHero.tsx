import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

export default function StoreHero() {
  return (
    <div className='flex relative items-center justify-center h-[40lvh] overflow-hidden bg-muted/50 rounded-xl'>
      <RandomImageFadeCarousel />
      <span className='absolute'>hero</span>
    </div>
  );
}
