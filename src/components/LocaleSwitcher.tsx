'use client';

import { Button } from '@/components/ui/button';

export const LocaleSwitcher = () => {
  return (
    <Button className="p-2 focus-visible:ring-offset-0" variant="ghost" size="icon" aria-label="lang-switcher">
      EN
    </Button>
  );
};
