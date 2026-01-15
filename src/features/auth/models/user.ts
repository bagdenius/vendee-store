import type { ObjectToCamel } from 'ts-case-convert';

import type {
  BaseUserEntity,
  ProfileEntity,
  ProfileInsertEntity,
  ProfileUpdateEntity,
  UserProfileEntity,
  UserProfileInsertEntity,
} from '@/shared/dal/entities';

export type Profile = ObjectToCamel<ProfileEntity>;
export type ProfileInsert = ObjectToCamel<ProfileInsertEntity>;
export type ProfileUpdate = ObjectToCamel<ProfileUpdateEntity>;

export type BaseUser = ObjectToCamel<BaseUserEntity>;
export type UserProfile = ObjectToCamel<UserProfileEntity>;
export type UserProfileInsert = ObjectToCamel<UserProfileInsertEntity>;
