import {
  Provider,
  Session as SupabaseSession,
  User as SupabaseUser,
} from '@supabase/supabase-js';

import { ObjectToCamel } from 'ts-case-convert';

export type User = ObjectToCamel<SupabaseUser>;
export type UserList = User[];

export type Session = ObjectToCamel<SupabaseSession>;

export type OAuthResult = {
  provider: Provider;
  url: string;
};

export type SignupResult =
  | { user: User; session: null }
  | { session: Session; user: null };
