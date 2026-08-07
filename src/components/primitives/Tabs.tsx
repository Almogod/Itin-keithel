'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultId?: string;
  className?: string;
}

export function Tabs({ tabs, defaultId, className }: TabsProps) {
  const first = defaultId ?? tabs[0]?.id ?? '';
  const [active, setActive] = useState(first);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" className="flex gap-8 border-b border-ink-100">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn(
                'relative pb-3 text-[0.9375rem] font-medium transition-colors',
                on ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              {t.label}
              <span
                className={cn(
                  'absolute left-0 -bottom-px h-[2px] bg-vermilion transition-all duration-[200ms]',
                  on ? 'w-full opacity-100' : 'w-0 opacity-0',
                )}
              />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
