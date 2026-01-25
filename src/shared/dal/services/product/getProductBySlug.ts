import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { ProductResult } from '../../entities';

export async function getProductBySlug(slug: string): Promise<ProductResult> {
  const supabase = await createSupabaseServerClient();
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
