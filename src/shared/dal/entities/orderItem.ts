import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type OrderItem = ObjectToCamel<Tables<'order_items'>>;
export type OrderItemInsert = ObjectToCamel<TablesInsert<'order_items'>>;
export type OrderItemUpdate = ObjectToCamel<TablesUpdate<'order_items'>>;

export type OrderItemList = OrderItem[];
