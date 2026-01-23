'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MouseEvent } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    event.preventDefault();
    if (theme === 'dark') {
      toast.warning('Light theme is not completed yet!', {
        description: "So don't be scared - we will fix it soon :)",
        action: { label: 'Got it!', onClick: () => {} },
      });
      setTheme('light');
    } else setTheme('dark');
  }

  return (
    <Button variant='outline' size='icon' onClick={handleThemeToggle}>
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
