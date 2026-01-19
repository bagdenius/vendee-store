import { Suspense } from 'react';

import ProductListByCategory, {
  ProductListByCategorySkeleton,
} from '@/features/store/components/ProductListByCategory';
import StoreEventsList from '@/features/store/components/StoreEventsList';
import { getAllCategories } from '@/shared/dal/services/category/getAllCategories';
import { getAllProducts } from '@/shared/dal/services/product/getAllProducts';

export default async function StoreHomePage() {
  const { categories: categories } = await getAllCategories();
  const productListPromise = getAllProducts();

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <StoreEventsList />
      {categories &&
        categories.map((category) => (
          <Suspense
            key={category.id}
            fallback={<ProductListByCategorySkeleton />}
          >
            <ProductListByCategory
              category={category}
              productListPromise={productListPromise}
            />
          </Suspense>
        ))}
    </div>
  );
}
