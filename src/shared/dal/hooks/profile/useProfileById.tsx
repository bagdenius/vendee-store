import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseBrowserClient } from '@/shared/lib/supabase/client';
import { Profile } from '../../entities';

type useProfileProps = {
  id: string;
};

export function useProfileById({ id }: useProfileProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [data, setData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (!id) return;

    setError(null);
    setIsLoading(true);

    async function getProfileById(id: string) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (error) setError(error);
        else setData(objectToCamel(data));
      } finally {
        setIsLoading(false);
      }
    }
    getProfileById(id);
  }, [id, supabase]);

  return { data, error, isLoading };
}
