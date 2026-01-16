import 'server-only';

import type { AuthError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { User } from '@/shared/dal/entities';
import { cache } from 'react';

export const getUser = cache(
  async (): Promise<{
    user: User | null;
    error: AuthError | null;
  }> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    const camelized = data.user && (objectToCamel(data.user) as User);
    return { user: camelized, error };
  }
);
