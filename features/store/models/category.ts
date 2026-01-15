import { ObjectToCamel } from 'ts-case-convert';

import { CategoryEntity } from '@/shared/data/entities/categoryEntity';

export type Category = ObjectToCamel<CategoryEntity>;
