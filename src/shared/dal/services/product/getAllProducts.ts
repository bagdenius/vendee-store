import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { ProductList } from '@/shared/dal/entities';
import { err, ok, type Result } from '@/shared/types/result';
import { objectToCamel } from 'ts-case-convert';

export async function getAllProducts(): Promise<
  Result<ProductList, PostgrestError>
> {
  const supabase = await createSupabaseServerClient();
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
  if (error) return err(error);
  const camelized = objectToCamel(data) as ProductList;
  return ok(camelized);
}
