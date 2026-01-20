import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import type { CategoryList } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';

export async function getAllCategories(): Promise<
  Result<CategoryList, PostgrestError>
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, sort_order, created_at')
    .order('sort_order', { ascending: true });
  if (error) return err(error);
  const camelized = objectToCamel(data);
  return ok(camelized);
}
