import { SignUpWithPasswordCredentials, User } from '@supabase/supabase-js';

import { Database } from '@/shared/types/database.types';

export type { User };
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type UserProfile = User & Profile;
export type UserProfileInsert = SignUpWithPasswordCredentials & {
  options: { data: ProfileInsert };
};
