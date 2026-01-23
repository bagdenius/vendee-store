import { ObjectToCamel } from 'ts-case-convert';

import { Tables, TablesInsert, TablesUpdate } from '../database.types';
import { Result } from '../result';
import { AuthError, PostgrestError } from '@supabase/supabase-js';

export type Profile = ObjectToCamel<Tables<'profiles'>>;
export type ProfileInsert = ObjectToCamel<TablesInsert<'profiles'>>;
export type ProfileUpdate = ObjectToCamel<TablesUpdate<'profiles'>>;

export type ProfileList = Profile[];

export type ProfileResult = Result<Profile, AuthError | PostgrestError>;
