import { ObjectToCamel } from 'ts-case-convert';

import { ProductImageEntity } from '@/shared/data/entities/productImageEntity';

export type ProductImage = ObjectToCamel<ProductImageEntity> & { url: string };
