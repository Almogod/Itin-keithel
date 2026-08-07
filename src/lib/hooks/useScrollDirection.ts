'use client';

import { useEffect, useState } from 'react';

export function useScrollDirection(threshold = 8): { scrolled: boolean; direction: 'up' | 'down' } {
  const [scrolled, setScrolled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) > threshold) {
          setDirection(delta > 0 ? 'down' : 'up');
          last = y;
        }
        setScrolled(y > 24);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrolled, direction };
}
