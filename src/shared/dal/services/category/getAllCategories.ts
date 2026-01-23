import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { CategoryListResult } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getAllCategories(): Promise<CategoryListResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, sort_order, created_at')
    .order('sort_order', { ascending: true });
  if (error) return { error };
  return { data: objectToCamel(data) };
}
