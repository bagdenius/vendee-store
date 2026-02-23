import 'server-only';

import { objectToCamel } from 'ts-case-convert';

import type { CategoryListResult } from '@/shared/dal/entities';
import { createSupabasePublicClient } from '@/shared/lib/supabase/public';
import { cacheLife, cacheTag } from 'next/cache';

export async function getCategories(): Promise<CategoryListResult> {
  'use cache';
  // cacheLife('days');
  cacheTag('categories');

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id, sort_order, created_at')
    .order('sort_order', { ascending: true });
  if (error) return { error };
  return { data: objectToCamel(data) };
}
