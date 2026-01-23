import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';
import { Result } from '../result';
import { PostgrestError } from '@supabase/supabase-js';

export type Category = ObjectToCamel<Tables<'categories'>>;
export type CategoryInsert = ObjectToCamel<TablesInsert<'categories'>>;
export type CategoryUpdate = ObjectToCamel<TablesUpdate<'categories'>>;

export type CategoryList = Category[];

export type CategoryListResult = Result<CategoryList, PostgrestError>;
