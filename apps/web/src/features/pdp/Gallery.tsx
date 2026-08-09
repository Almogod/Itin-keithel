'use client';

import { useState } from 'react';
import type { Media } from '@ik/types';
import { cn } from '@ik/utils';

export function Gallery({ media }: { media: Media[] }) {
  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];
  if (!current) return null;
  return (
    <div className="flex gap-4">
      {/* Thumbnail rail */}
      <ul className="hidden md:flex flex-col gap-3 w-20 shrink-0">
        {media.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'block w-20 h-24 overflow-hidden rounded-md bg-frame',
                'transition-all duration-[200ms]',
                i === active ? 'ring-2 ring-vermilion ring-offset-2 ring-offset-canvas' : 'opacity-70 hover:opacity-100',
              )}
              aria-label={'Show image ' + (i + 1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.alt} className="w-full h-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      {/* Main frame */}
      <div className="relative flex-1 aspect-[4/5] bg-frame rounded-lg overflow-hidden">
        {media.map((m, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.id}
            src={m.src}
            alt={m.alt}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-[320ms]',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>
    </div>
  );
}
