'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { ProductEntity } from '@/shared/dal/entities';

// todo: filter, sorting
export async function getAllProducts(): Promise<{
  data: ProductEntity[] | null;
  error: PostgrestError | null;
}> {
  // fetch products, images and categories
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, title, slug, description, price, currency, is_active, created_at,
          images:product_images(id, path, sort_order, product_id),
          categories(id, name, slug, sort_order, created_at)`
    )
    .order('sort_order', {
      referencedTable: 'product_images',
      ascending: true,
    });
  return { data, error };
}
