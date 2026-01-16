import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type Order = ObjectToCamel<Tables<'orders'>>;
export type OrderInsert = ObjectToCamel<TablesInsert<'orders'>>;
export type OrderUpdate = ObjectToCamel<TablesUpdate<'orders'>>;

export type OrderList = Order[];
