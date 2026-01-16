import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { CategoryList } from '@/shared/dal/entities';
import { objectToCamel } from 'ts-case-convert';

export async function getAllCategories(): Promise<{
  categories: CategoryList | null;
  error: PostgrestError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, sort_order, created_at')
    .order('sort_order', { ascending: true });
  const camelized = data && (objectToCamel(data) as CategoryList);
  return { categories: camelized, error };
}
