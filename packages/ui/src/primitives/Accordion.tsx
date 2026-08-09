'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@ik/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);
  return (
    <div className={cn('w-full', className)}>
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={cn(i === 0 && 'border-t border-ink-100', 'border-b border-ink-100')}>
            <button
              type="button"
              className={cn(
                'w-full flex items-center justify-between text-left py-5',
                'text-ink font-sans font-medium text-[1rem]',
                'transition-colors hover:text-vermilion',
              )}
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={20}
                strokeWidth={1.25}
                className={cn('transition-transform duration-[200ms]', isOpen && 'rotate-180')}
              />
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-ink-700 text-[0.9375rem] leading-[1.6]">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
