import { Suspense } from 'react';

import { getAllCategoriesAction } from '@/features/store/actions/getAllCategoriesAction';
import ProductListByCategory, {
  ProductListByCategorySkeleton,
} from '@/features/store/components/ProductListByCategory';
import StoreEventsList from '@/features/store/components/StoreEventsList';

export default async function StoreHomePage() {
  const { categories } = await getAllCategoriesAction();

  return (
    <div className='flex flex-1 flex-col gap-4 p-6'>
      <StoreEventsList />
      {categories &&
        categories.map((category) => (
          <Suspense
            key={category.id}
            fallback={<ProductListByCategorySkeleton />}
          >
            <ProductListByCategory category={category} />
          </Suspense>
        ))}
    </div>
  );
}
