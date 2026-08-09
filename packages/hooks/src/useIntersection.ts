'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseIntersectionOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {},
): { ref: RefObject<T | null>; entry: IntersectionObserverEntry | null; inView: boolean } {
  const { once = false, root = null, rootMargin = '0px', threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [inView, setInView] = useState(false);
  const frozen = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first) return;
        setEntry(first);
        setInView(first.isIntersecting);
        if (first.isIntersecting && once) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, once]);

  return { ref, entry, inView };
}
