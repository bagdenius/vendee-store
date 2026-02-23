import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { ProductListResult } from '@/shared/dal/entities';
import { createSupabasePublicClient } from '@/shared/lib/supabase/public';
import { cacheLife, cacheTag } from 'next/cache';

export async function getProducts(): Promise<ProductListResult> {
  'use cache';
  // cacheLife('days');
  cacheTag('products');

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, title, slug, description, price, currency, is_active, created_at,
          images:product_images(id, path, url, sort_order, product_id),
          categories(id, name, slug, sort_order, created_at)`,
    )
    .order('sort_order', {
      referencedTable: 'product_images',
      ascending: true,
    });
  if (error) return { error };
  return { data: objectToCamel(data) };
}
