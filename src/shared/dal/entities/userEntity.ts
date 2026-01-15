import { SignUpWithPasswordCredentials, User } from '@supabase/supabase-js';

import { Tables, TablesInsert, TablesUpdate } from './database.types';

export type ProfileEntity = Tables<'profiles'>;
export type ProfileInsertEntity = TablesInsert<'profiles'>;
export type ProfileUpdateEntity = TablesUpdate<'profiles'>;

export type BaseUserEntity = User;
export type UserProfileEntity = BaseUserEntity & ProfileEntity;
export type UserProfileInsertEntity = SignUpWithPasswordCredentials & {
  options: { data: ProfileInsertEntity };
};
