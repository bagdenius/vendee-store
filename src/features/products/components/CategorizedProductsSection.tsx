import { Suspense } from 'react';

import { getAllCategories } from '@/shared/dal/services/category/getAllCategories';
import { getAllProducts } from '@/shared/dal/services/product/getAllProducts';
import ProductListByCategory, {
  ProductListByCategorySkeleton,
} from './ProductListByCategory';

export default async function CategorizedProductsSection() {
  const { data: categories, error: categoriesError } = await getAllCategories();
  const { data: products, error: productsError } = await getAllProducts();

  return (
    !categoriesError &&
    !productsError &&
    categories.map((category) => (
      <Suspense key={category.id} fallback={<ProductListByCategorySkeleton />}>
        <ProductListByCategory category={category} products={products} />
      </Suspense>
    ))
  );
}
