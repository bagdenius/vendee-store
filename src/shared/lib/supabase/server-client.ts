import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getEnvironmentVariables } from '@/shared/lib/utils/getEnvironmentVariables';
import { Database } from '@/shared/types/database.types';

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabasePublishableKey } = getEnvironmentVariables();
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
}
