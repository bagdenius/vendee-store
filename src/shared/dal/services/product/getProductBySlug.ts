import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import { ProductResult } from '../../entities';
import { createSupabasePublicClient } from '@/shared/lib/supabase/public';
import { cacheLife, cacheTag } from 'next/cache';

export async function getProduct(slug: string): Promise<ProductResult> {
  'use cache';
  cacheLife('days');
  cacheTag(`product-${slug}`);

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, title, slug, description, price, currency, is_active, created_at,
          images:product_images(id, path, url, sort_order, product_id),
          categories(id, name, slug, sort_order, created_at)`,
    )
    .eq('slug', slug)
    .single();
  if (error) return { error };
  return { data: objectToCamel(data) };
}
