import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type CartEntity = Tables<'carts'>;
export type CartInsertEntity = TablesInsert<'carts'>;
export type CartUpdateEntity = TablesUpdate<'carts'>;
