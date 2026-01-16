import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type ProductCategory = ObjectToCamel<Tables<'product_categories'>>;
export type ProductCategoryInsert = ObjectToCamel<
  TablesInsert<'product_categories'>
>;
export type ProductCategoryUpdate = ObjectToCamel<
  TablesUpdate<'product_categories'>
>;

export type ProductCategoryList = ProductCategory[];
