import { Suspense } from 'react';

import CategorizedProductsSection, {
  CategorizedProductsSectionSkeleton,
} from '@/features/products/components/CategorizedProductsSection';
import PromoSection from '@/features/promo/components/PromoSection';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function StoreHomePage() {
  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <PromoSection />
      {/* <Suspense fallback={<CategorizedProductsSectionSkeleton />}> */}
      <CategorizedProductsSection />
      {/* </Suspense> */}
    </div>
  );
}
