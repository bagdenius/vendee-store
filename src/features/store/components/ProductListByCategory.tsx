import Link from 'next/link';

import { getAllProductsAction } from '../actions/getAllProductsAction';
import ProductCard from './ProductCard';
import { Product } from '../models/product';
import { Skeleton } from '@/shared/components/ui/Skeleton';

// todo: change grid to carousel
export default async function ProductListByCategory({
  category,
}: {
  category: { id: string; name: string; slug: string };
}) {
  // todo: filter category in server action
  const { products }: { products: Product[] } = await getAllProductsAction();
  const filtered = products?.filter((p) =>
    p.categories.some(
      (c: { id: string; name: string; slug: string }) => c.id === category.id
    )
  );

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

      {/* <div className='grid max-w-full grid-flow-col auto-cols-max gap-4'> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {filtered?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function ProductListByCategorySkeleton() {
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
