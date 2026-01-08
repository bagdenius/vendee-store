'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getEnvironmentVariables } from '@/shared/lib/utils/getEnvironmentVariables';
import { Database } from '@/shared/types/database.types';

let client: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const { supabaseUrl, supabasePublishableKey } = getEnvironmentVariables();
  client = createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
  return client;
}
