'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getEnvironmentVariables } from '../utils/getEnvironmentVariables';

type SupabaseSchema = Record<string, never>;

let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

  const { supabaseUrl, supabasePublishableKey } = getEnvironmentVariables();
  client = createBrowserClient<SupabaseSchema>(
    supabaseUrl,
    supabasePublishableKey
  );
  return client;
}
