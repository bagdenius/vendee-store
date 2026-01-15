import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type ProductImageEntity = Tables<'product_images'>;
export type ProductImageInsertEntity = TablesInsert<'product_images'>;
export type ProductImageUpdateEntity = TablesUpdate<'product_images'>;
