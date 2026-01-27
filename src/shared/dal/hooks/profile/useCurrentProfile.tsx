import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseBrowserClient } from '@/shared/lib/supabase/browser';
import { Profile } from '../../entities';

export function useCurrentProfile() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [data, setData] = useState<Profile | undefined>(undefined);
  const [error, setError] = useState<PostgrestError | AuthError | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentProfile = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) return setError(userError);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.user.id)
        .single();
      if (profileError) return setError(profileError);
      setData(objectToCamel(profile));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return { data, error, isLoading, refetch: getCurrentProfile };
}
