'use client';

import { Card } from '@/shared/components/ui/Card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';
import { Product } from '@/shared/dal/entities';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ProductImagesCarouselProps = {
  product: Product;
};

export default function ProductImagesCarousel({
  product,
}: ProductImagesCarouselProps) {
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
    <Card>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id} className='relative aspect-square'>
              <Image
                fill
                src={image.url}
                alt={`${product.title} image ${image.sortOrder}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-1' variant='default' size='icon-lg' />
        <CarouselNext className='right-1' variant='default' size='icon-lg' />
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
    </Card>
  );
}
