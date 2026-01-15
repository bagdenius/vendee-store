import { Suspense } from 'react';

import { getAllCategoriesAction } from '@/features/store/actions/getAllCategoriesAction';
import ProductListByCategory from '@/features/store/components/ProductListByCategory';
import StoreEventsList from '@/features/store/components/StoreEventsList';
import { Spinner } from '@/shared/components/ui/Spinner';

export default async function StoreHomePage() {
  const { categories } = await getAllCategoriesAction();

  return (
    <div className='flex flex-1 flex-col gap-4 p-6'>
      <StoreEventsList />
      {categories &&
        categories.map((category) => (
          <Suspense
            key={category.id}
            fallback={<Spinner className='self-center mt-10 size-20' />}
          >
            <ProductListByCategory category={category} />
          </Suspense>
        ))}
    </div>
  );
}
