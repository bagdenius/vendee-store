import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { CategoryListResult } from '@/shared/dal/entities';
import { createSupabaseClient } from '@/shared/lib/supabase/client';

export async function getAllCategories(): Promise<CategoryListResult> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, sort_order, created_at')
    .order('sort_order', { ascending: true });
  if (error) return { error };
  return { data: objectToCamel(data) };
}
