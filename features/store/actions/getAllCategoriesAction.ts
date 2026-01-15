import { objectToCamel } from 'ts-case-convert';

import { getAllCategories } from '@/shared/data/services/category/getAllCategories';

import type { Category } from '../models/category';

// todo: add zod validation?
// todo: filter, sorting
export async function getAllCategoriesAction(): Promise<{
  categories: Category[];
}> {
  const { data, error } = await getAllCategories();
  // error handling
  if (error) throw new Error(`Failed fetching categories: ${error.message}`);
  if (!data) throw new Error('No categories were fetched');
  // camelize and shit
  const categories = data.map((category) => objectToCamel(category));
  return { categories };
}
