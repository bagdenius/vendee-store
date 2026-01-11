import { Suspense } from 'react';

import ProductList from '@/features/store/components/ProductList';
import StoreEventsList from '@/features/store/components/StoreEventsList';
import StoreHero from '@/features/store/components/StoreHero';
import { Spinner } from '@/shared/components/ui/Spinner';

export default function StoreHomePage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <StoreHero />
      <StoreEventsList />
      <Suspense fallback={<Spinner className='self-center mt-10 size-20' />}>
        <ProductList category='Apple' />
      </Suspense>
    </div>
  );
}
