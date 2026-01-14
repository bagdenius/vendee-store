'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getAllProducts() {
  // fetch products, images and categories
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, title, slug, description, price, currency, is_active, created_at,
      product_images(id, path, sort_order), 
      categories:product_categories(category_id(id,name,slug))`
    )
    .order('sort_order', {
      referencedTable: 'product_images',
      ascending: true,
    });
  // error handle
  if (error) {
    console.error(`An error occured while fetching products: ${error.message}`);
    return { error };
  }
  // transform image paths to public urls and categories to array of plain objects
  const productImagesBucketUrl =
    process.env.NEXT_PUBLIC_SUPABASE_PRODUCT_IMAGES_BUCKET_URL;
  const products = data.map((product) => ({
    ...product,
    product_images: product.product_images.map((image) => ({
      ...image,
      url: `${productImagesBucketUrl}/${image.path}`,
    })),
    categories: product.categories.map((c) => c.category_id),
  }));
  return { products };
}

export async function getProductImageUrls(productId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: images, error } = await supabase
    .from('product_images')
    .select('id, path, sort_order')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching product images:', error.message);
    return { error };
  }
  const data =
    images?.map((img) => {
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(img.path);

      return {
        ...img,
        url: publicUrlData.publicUrl,
      };
    }) ?? [];
  return { data };
}
