import { User } from '@supabase/supabase-js';
import { Database } from '@/shared/types/database.types';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server-client';
import { redirect } from 'next/navigation';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserProfile = User & Profile;

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  // console.log('USER: ', user);

  if (userError) console.log(userError);
  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) console.log(profileError);
  if (!profile) redirect('/error');
  console.log(profile);

  return { ...user, ...profile } as UserProfile;
}
