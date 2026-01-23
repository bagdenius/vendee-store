import {
  AuthError,
  Provider,
  Session as SupabaseSession,
  User as SupabaseUser,
  WeakPassword as SupabaseWeakPassword,
} from '@supabase/supabase-js';
import { ObjectToCamel } from 'ts-case-convert';
import { Result } from '../result';

export type User = ObjectToCamel<SupabaseUser>;
export type UserList = User[];
export type Session = ObjectToCamel<SupabaseSession>;
export type WeakPassword = ObjectToCamel<SupabaseWeakPassword>;

export type LoginWithPasswordToken = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};
export type SignupToken = { user: User | null; session: Session | null };
export type OAuthToken = { provider: Provider; url: string | null };

export type UserResult = Result<User, AuthError>;
export type LoginWithPasswordResult = Result<LoginWithPasswordToken, AuthError>;
export type SignupResult = Result<SignupToken, AuthError>;
export type OAuthResult = Result<OAuthToken, AuthError>;
