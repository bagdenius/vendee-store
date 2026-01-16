import { ObjectToCamel } from 'ts-case-convert';

import type { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type Cart = ObjectToCamel<Tables<'carts'>>;
export type CartInsert = ObjectToCamel<TablesInsert<'carts'>>;
export type CartUpdate = ObjectToCamel<TablesUpdate<'carts'>>;

export type CartList = Cart[];
