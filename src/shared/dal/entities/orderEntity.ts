import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type OrderEntity = Tables<'orders'>;
export type OrderInsertEntity = TablesInsert<'orders'>;
export type OrderUpdateEntity = TablesUpdate<'orders'>;
