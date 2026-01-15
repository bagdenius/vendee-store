'use server';

import { objectToSnake } from 'ts-case-convert';

import { createProfile } from '@/shared/data/services/user/createProfileFromUser';

import type { BaseUser, ProfileInsert } from '../models';

export async function createProfileFromUserAction(user: BaseUser) {
  // create profile object to insert
  const profile: ProfileInsert = {
    id: user.id,
    username:
      user.userMetadata.userName ??
      user.userMetadata.preferredUsername ??
      user.email,
    email: user.email!,
    fullName: user.userMetadata.fullName ?? user.userMetadata.name ?? null,
    avatar: user.userMetadata?.avatarUrl ?? user.userMetadata?.picture ?? null,
    role: 'user',
  };
  // snakelize and shit
  const profileEntity = objectToSnake(profile);
  // insert profile
  const error = await createProfile(profileEntity);
  if (error) throw new Error(`Failed to create profile: ${error.message}`);
}
