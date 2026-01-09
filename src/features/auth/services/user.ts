import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import { ProfileInsert, User, UserProfile } from '../types/User';

export async function createProfileFromProviderUser(user: User) {
  const supabase = await createSupabaseServerClient();
  const profile: ProfileInsert = {
    id: user.id,
    username:
      user.user_metadata.user_name ??
      user.user_metadata.preferred_username ??
      user.email,
    email: user.email!,
    full_name: user.user_metadata.full_name ?? user.user_metadata.name ?? null,
    avatar:
      user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
    created_at: new Date().toISOString(),
    role: 'user',
  };
  const { error: insertError } = await supabase
    .from('profiles')
    .insert(profile);
  if (insertError) {
    console.error('Profile creation error:', insertError);
    throw insertError;
  }
  return profile;
}

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const user = (await supabase.auth.getUser()).data.user;
  return user;
}

export async function getProfile(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return profile;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const user = await getUser();
  // console.log('USER', user);
  if (!user) return null;
  const profile = await getProfile(user.id);
  // console.log('PROFILE', profile);
  return { ...user, ...profile } as UserProfile;
}
