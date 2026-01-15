import { ObjectToCamel } from 'ts-case-convert';

import { CategoryEntity } from '@/shared/dal/entities/categoryEntity';

export type Category = ObjectToCamel<CategoryEntity>;
