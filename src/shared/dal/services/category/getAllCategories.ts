'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { CategoryEntity } from '@/shared/dal/entities';

export async function getAllCategories(): Promise<{
  data: CategoryEntity[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  return { data, error };
}
