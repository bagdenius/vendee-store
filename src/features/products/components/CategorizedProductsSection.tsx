import { Skeleton } from '@/shared/components/ui/Skeleton';
import { getAllCategories } from '@/shared/dal/services/category/getAllCategories';
import { getAllProducts } from '@/shared/dal/services/product/getAllProducts';
import ProductListByCategory from './ProductListByCategory';

export default async function CategorizedProductsSection() {
  const { data: categories, error: categoriesError } = await getAllCategories();
  const { data: products, error: productsError } = await getAllProducts();

  if (categoriesError || productsError) return null;

  return (
    <section id='categorized-products-section'>
      {categories.map((category) => (
        <ProductListByCategory
          key={category.id}
          category={category}
          products={products}
        />
      ))}
    </section>
  );
}

export function CategorizedProductsSectionSkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-3'>
      <Skeleton className='w-25 h-8' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='w-full h-135 mb-2' />
        ))}
      </div>
    </div>
  );
}
