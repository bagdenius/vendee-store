// 'use server';

// import { getAllProducts } from '@/shared/dal/services/product/getAllProducts';

// import { ProductList } from '@/shared/dal/entities';

// export async function getAllProductsAction(): Promise<{
//   products: ProductList | null;
// }> {
//   const { data: products, error } = await getAllProducts();
//   if (error) throw new Error(`Failed to fetch products: ${error.message}`);
//   return { products };
// }
