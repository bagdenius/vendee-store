'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/shared/components/ui/Carousel';
import { Category, ProductList } from '@/shared/dal/entities';
import ProductCard from './ProductCard';

type ProductListByCategoryProps = {
  category: Category;
  products: ProductList;
};

export default function ProductListByCategory({
  category,
  products,
}: ProductListByCategoryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const filtered = products?.filter((p) =>
    p.categories.some(
      (c: { id: string; name: string; slug: string }) => c.id === category.id,
    ),
  );

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
    <div className='flex flex-1 flex-col gap-3'>
      <h3 className='text-2xl font-semibold tracking-tight'>
        <Link
          href={`category/${category.slug}`}
          className='inline-flex group hover:underline'
        >
          <span>{category.name}</span>
          <span className='opacity-0 -translate-x-5 transition-transform duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0'>
            &nbsp;&rarr;
          </span>
        </Link>
      </h3>
      <div>
        <Carousel
          setApi={setApi}
          opts={{ slidesToScroll: 'auto' }}
          className='mb-3'
        >
          <CarouselContent className='p-0.5'>
            {filtered?.map((product) => (
              <CarouselItem
                key={product.id}
                className='sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5'
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
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
