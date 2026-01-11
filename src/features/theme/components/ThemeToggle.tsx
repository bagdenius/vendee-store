'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/components/ui/Button';
import { toast } from 'sonner';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => {
        if (theme === 'dark') {
          toast.warning('Light theme is not completed yet!', {
            description: 'But we will fix it soon :)',
            action: { label: 'Got it!', onClick: () => {} },
          });
          setTheme('light');
        } else setTheme('dark');
      }}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
