import { User as SupabaseUser } from '@supabase/supabase-js';

import { ObjectToCamel } from 'ts-case-convert';

export type User = ObjectToCamel<SupabaseUser>;

export type UserList = User[];
