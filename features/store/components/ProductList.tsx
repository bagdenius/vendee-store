import Link from 'next/link';

import { getAllProductsWithImageUrls } from '../services/product';
import ProductCard from './ProductCard';

export default async function ProductListByCategory({
  category,
}: {
  category: { id: string; name: string; slug: string };
}) {
  // todo: cut to category
  const { products, error } = await getAllProductsWithImageUrls();

  return (
    <div className='flex flex-col p-4 gap-3'>
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

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
