import { ObjectToCamel } from 'ts-case-convert';

import { Tables, TablesInsert, TablesUpdate } from '../database.types';

export type Profile = ObjectToCamel<Tables<'profiles'>>;
export type ProfileInsert = ObjectToCamel<TablesInsert<'profiles'>>;
export type ProfileUpdate = ObjectToCamel<TablesUpdate<'profiles'>>;

export type ProfileList = Profile[];
