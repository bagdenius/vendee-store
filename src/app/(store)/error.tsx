'use client';
import { Bug, Home, Pencil, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/Button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/Empty';
import { ScrollArea } from '@/shared/components/ui/ScrollArea';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <Empty className='justify-start'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Bug />
        </EmptyMedia>
        <EmptyTitle>Something went wrong :(</EmptyTitle>
        <EmptyDescription>
          {error.name}
          <br />
          {error.message}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className='flex gap-2'>
          <Button variant='default' onClick={reset}>
            <RefreshCcw />
            Refresh
          </Button>
          <Button variant='secondary' onClick={() => router.push('/')}>
            <Home />
            Homepage
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='link'
            className='w-35'
            onClick={() => {
              setIsContactFormOpen(false);
              setIsStackOpen((isOpen) => !isOpen);
            }}
          >
            {isStackOpen ? 'Hide' : 'Show'} trace stack
          </Button>

          <Button
            variant='outline'
            onClick={() => {
              setIsStackOpen(false);
              setIsContactFormOpen((isOpen) => !isOpen);
            }}
          >
            <Pencil />
            Report
          </Button>
        </div>
        {isStackOpen &&
          (error.stack ? (
            <div>
              <ScrollArea className='rounded-md border '>
                <div className='max-w-sm max-h-100 p-4 text-start wrap-break-word'>
                  {error.stack}
                </div>
              </ScrollArea>
            </div>
          ) : (
            'There is no stack trace for this error...'
          ))}
        {isContactFormOpen && <form>form</form>}
      </EmptyContent>
    </Empty>
  );
}
