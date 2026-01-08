import RandomImageFadeCarousel from '@/shared/components/ui/RandomImageFadeCarousel';

const events = [{ id: 1 }, { id: 2 }, { id: 3 }];

const products = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

export default function StoreHomePage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      {/* to StoreHero.tsx */}
      <div className='flex relative items-center justify-center h-[40lvh] overflow-hidden bg-muted/50 rounded-xl'>
        <RandomImageFadeCarousel />
        <span className='absolute'>hero</span>
      </div>

      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        {events.slice(0, 3).map((event, i) => (
          // to StoreEvent.tsx
          <div
            key={i}
            className='flex relative overflow-hidden items-center justify-center bg-muted/50 aspect-video rounded-xl'
          >
            <RandomImageFadeCarousel />
            <span className='absolute'>event {i + 1}</span>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-5 gap-4 p-4 min-h-screen bg-muted/50 rounded-xl md:min-h-min'>
        {products.map((product, i) => (
          // to ProductCard.tsx
          <div
            key={i}
            className='flex items-center justify-center h-96 bg-background rounded-xl'
          >
            product {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
