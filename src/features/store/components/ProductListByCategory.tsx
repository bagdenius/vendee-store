'use client';

import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/shared/components/ui/Carousel';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Category, ProductList } from '@/shared/dal/entities';

type ProductListByCategoryProps = {
  category: Category;
  productListPromise: Promise<{
    products: ProductList | null;
    error: PostgrestError | null;
  }>;
};

export default function ProductListByCategory({
  category,
  productListPromise,
}: ProductListByCategoryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { products, error } = use(productListPromise);

  if (error) toast.error('Failed to get products');

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
          <span>{category.name} </span>
          <span className='opacity-0 -translate-x-5 transition-transform duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0'>
            &nbsp;&rarr;
          </span>
        </Link>
      </h3>
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {filtered?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
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
                className='sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5'
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

export function ProductListByCategorySkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-3'>
      <Skeleton className='w-25 h-8' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='w-full h-140 mb-2' />
        ))}
      </div>
    </div>
  );
}
