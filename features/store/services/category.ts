import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function getAllCategories() {
  const supabase = await createSupabaseServerClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error(
      `An error occured while fetching categories: ${error.message}`
    );
    return { error };
  }
  return { categories };
}
