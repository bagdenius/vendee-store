import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type ProductImage = ObjectToCamel<Tables<'product_images'>>;
export type ProductImageInsert = ObjectToCamel<TablesInsert<'product_images'>>;
export type ProductImageUpdate = ObjectToCamel<TablesUpdate<'product_images'>>;

export type ProductImageList = ProductImage[];
