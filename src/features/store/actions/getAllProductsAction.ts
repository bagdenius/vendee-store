'use server';

import { objectToCamel } from 'ts-case-convert';

import { getAllProducts } from '@/shared/dal/services/product/getAllProducts';

import type { Product } from '../models/product';

// todo: add zod validation?
// todo: filter, sorting
export async function getAllProductsAction(): Promise<{
  products: Product[];
}> {
  const { data, error } = await getAllProducts();
  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  if (!data) throw new Error('No products were fetched');
  // camelize and transform image paths to public urls
  const productImagesBucketUrl =
    process.env.NEXT_PUBLIC_SUPABASE_PRODUCT_IMAGES_BUCKET_URL;
  const products = data.map((product) => {
    const camelizedProduct = objectToCamel(product);
    return {
      ...camelizedProduct,
      images: camelizedProduct.images.map((image) => ({
        ...image,
        url: `${productImagesBucketUrl}/${image.path}`,
      })),
    };
  });
  return { products };
}
