'use client';

import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';
import PromoCard from './PromoCard';

const mockPromos = [
  {
    id: '6e60c137-5010-465f-a484-37e41de274e7',
    text: 'The GOAT device and some long text that i write here to test text wrapping on this component',
  },
  {
    id: '12fc2e41-ecf6-432a-be58-8e36a795dd8d',
    text: 'Just use AI and call it a day',
  },
  {
    id: '6387f43b-15bf-4800-8d9a-e1ca55919bd2',
    text: 'My name is Uvuvwevwevwe Onyetenyevwe Ugwemubwem Osas',
  },
  {
    id: '88285d96-bcfc-4041-9158-0d1bf07a8d43',
    text: "Don't be scared of that SALE",
  },
  {
    id: 'a79fb937-ba00-49e9-85a0-8b57c9f784d9',
    text: 'This technology is minblowing',
  },
  { id: 'ab4e2efe-1b98-49b5-bb24-2ad1a2bb9603', text: 'Upcoming releases' },
  {
    id: '07c0bd54-3a47-439e-a6b6-a3528ca62e95',
    text: 'We have something for you',
  },
  {
    id: '07c0bd54-3a47-439e-a6b6-a3528ca62e91',
    text: 'Hey hey hey',
  },
  {
    id: '07c0bd54-3a47-439e-a6b6-a3528ca62e92',
    text: "I don't know what i'm doing",
  },
];

export default function PromoSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    function updateCarousel() {
      setCount(api!.scrollSnapList().length);
      setCurrent(api!.selectedScrollSnap() + 1);
    }
    const handleSelect = () => updateCarousel();
    const handleReInit = () => updateCarousel();
    updateCarousel();
    api.on('select', handleSelect);
    api.on('reInit', handleReInit);
    return () => {
      api.off('select', handleSelect);
      api.off('reInit', handleReInit);
    };
  }, [api]);

  function handleScrollToButtonClick(to: number) {
    if (!api) return;
    api.scrollTo(to);
  }

  return (
    <div>
      <Carousel
        setApi={setApi}
        opts={{ slidesToScroll: 'auto', loop: true }}
        className='mb-3'
      >
        <CarouselContent className='p-0.5'>
          {mockPromos.map((event) => (
            <CarouselItem
              key={event.id}
              className='w-full md:basis-1/2 xl:basis-1/3'
            >
              <PromoCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant='default' className='hidden left-1' />
        <CarouselNext variant='default' className='hidden right-1' />
      </Carousel>
      <div className='flex gap-1.5 justify-center items-center cursor-pointer'>
        {[...Array(count)].map((_, i) => (
          <div
            key={i + 1}
            className={`w-20 h-2 rounded-xs origin-center transition-all ease-in-out duration-500 ${i + 1 === current ? 'bg-primary scale-y-115' : 'bg-muted scale-y-100'}`}
            onClick={() => handleScrollToButtonClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
