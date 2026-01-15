import type { CategoryEntity } from './categoryEntity';
import type { Tables, TablesInsert, TablesUpdate } from './database.types';
import type { ProductImageEntity } from './productImageEntity';

export type BaseProductEntity = Tables<'products'>;
export type ProductInsertEntity = TablesInsert<'products'>;
export type ProductUpdateEntity = TablesUpdate<'products'>;

export type ProductEntity = BaseProductEntity & {
  images: ProductImageEntity[];
  categories: CategoryEntity[];
};
