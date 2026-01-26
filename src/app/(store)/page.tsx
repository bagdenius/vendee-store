import CategorizedProductsSection from '@/features/products/components/CategorizedProductsSection';
import PromoSection from '@/features/promo/components/PromoSection';

export default async function StoreHomePage() {
  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <PromoSection />
      <CategorizedProductsSection />
    </div>
  );
}
