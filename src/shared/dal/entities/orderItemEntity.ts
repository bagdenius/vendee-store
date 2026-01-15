import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type OrderItemEntity = Tables<'order_items'>;
export type OrderItemInsertEntity = TablesInsert<'order_items'>;
export type OrderItemUpdateEntity = TablesUpdate<'order_items'>;
