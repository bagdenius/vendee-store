import ProductList from '@/features/store/components/ProductList';
import StoreEventsList from '@/features/store/components/StoreEventsList';
import StoreHero from '@/features/store/components/StoreHero';
import { Spinner } from '@/shared/components/ui/Spinner';
import { Suspense } from 'react';

export default function StoreHomePage() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <StoreHero />
      <StoreEventsList />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
