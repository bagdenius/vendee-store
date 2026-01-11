'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getProducts() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, title, slug, description, price, currency, is_active, created_at'
    );
  if (error) {
    console.error(`An error occured while fetching products: ${error.message}`);
    return { error };
  }
  return { data };
}

export async function getProductImages(productId: string) {
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
  console.log(images);

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
