import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type ProductJoinCategoryEntity = Tables<'product_categories'>;
export type ProductJoinCategoryInsertEntity =
  TablesInsert<'product_categories'>;
export type ProductJoinCategoryUpdateEntity =
  TablesUpdate<'product_categories'>;
