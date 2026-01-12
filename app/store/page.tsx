import { Suspense } from 'react';

import ProductListByCategory from '../../features/store/components/ProductList';
import StoreEventsList from '../../features/store/components/StoreEventsList';
import { Spinner } from '../../shared/components/ui/Spinner';

const mockCategory = {
  id: 'b0dd6684-9c33-4649-aa69-fbb7dbbc8a31',
  name: 'Apple',
  slug: 'apple',
};

export default function StoreHomePage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <StoreEventsList />
      <Suspense fallback={<Spinner className='self-center mt-10 size-20' />}>
        <ProductListByCategory category={mockCategory} />
      </Suspense>
    </div>
  );
}
