import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type CartItem = ObjectToCamel<Tables<'cart_items'>>;
export type CartItemInsert = ObjectToCamel<TablesInsert<'cart_items'>>;
export type CartItemUpdate = ObjectToCamel<TablesUpdate<'cart_items'>>;

export type CartItemList = CartItem[];
