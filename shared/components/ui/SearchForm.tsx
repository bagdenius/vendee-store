import { Search } from 'lucide-react';
import { FormEvent } from 'react';

import { Label } from './Label';
import { SidebarInput } from './Sidebar';
import { toast } from 'sonner';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.warning('Searching is not implemented yet', {
      description: 'But we work on it :)',
      action: {
        label: 'Got it!',
        onClick: () => {},
      },
    });
  }

  return (
    <form {...props} onSubmit={onSubmit}>
      <div className='relative'>
        <Label htmlFor='search' className='sr-only'>
          Search
        </Label>
        <SidebarInput
          id='search'
          placeholder='Type to search...'
          className='h-8 pl-7'
        />
        <Search className='pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none' />
      </div>
    </form>
  );
}
