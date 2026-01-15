import type { ObjectToCamel } from 'ts-case-convert';

import { BaseProductEntity } from '@/shared/dal/entities/productEntity';

import type { Category } from './category';
import type { ProductImage } from './productImage';

export type BaseProduct = ObjectToCamel<BaseProductEntity>;

export type Product = BaseProduct & {
  images: ProductImage[];
  categories: Category[];
};
