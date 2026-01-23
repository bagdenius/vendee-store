import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';
import type { CategoryList } from './category';
import { ProductImageList } from './productImage';
import { Result } from '../result';
import { PostgrestError } from '@supabase/supabase-js';

export type BaseProduct = ObjectToCamel<Tables<'products'>>;
export type ProductInsert = ObjectToCamel<TablesInsert<'products'>>;
export type ProductUpdate = ObjectToCamel<TablesUpdate<'products'>>;

export type Product = BaseProduct & {
  images: ProductImageList;
  categories: CategoryList;
};

export type ProductList = Product[];

export type ProductListResult = Result<ProductList, PostgrestError>;
