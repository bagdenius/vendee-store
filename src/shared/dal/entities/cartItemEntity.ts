import type { Tables, TablesInsert, TablesUpdate } from './database.types';

export type CartItemEntity = Tables<'cart_items'>;
export type CartItemInsertEntity = TablesInsert<'cart_items'>;
export type CartItemUpdateEntity = TablesUpdate<'cart_items'>;
