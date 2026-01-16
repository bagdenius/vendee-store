import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';
import type { CategoryList } from './category';
import { ProductImageList } from './productImage';

export type BaseProduct = ObjectToCamel<Tables<'products'>>;
export type ProductInsert = ObjectToCamel<TablesInsert<'products'>>;
export type ProductUpdate = ObjectToCamel<TablesUpdate<'products'>>;

export type Product = BaseProduct & {
  images: ProductImageList;
  categories: CategoryList;
};

export type ProductList = Product[];
