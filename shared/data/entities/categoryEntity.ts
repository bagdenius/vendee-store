import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type CategoryEntity = Tables<'categories'>;
export type CategoryInsertEntity = TablesInsert<'categories'>;
export type CategoryUpdateEntity = TablesUpdate<'categories'>;
