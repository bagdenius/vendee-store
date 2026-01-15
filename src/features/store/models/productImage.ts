import { ObjectToCamel } from 'ts-case-convert';

import { ProductImageEntity } from '@/shared/dal/entities/productImageEntity';

export type ProductImage = ObjectToCamel<ProductImageEntity> & { url: string };
