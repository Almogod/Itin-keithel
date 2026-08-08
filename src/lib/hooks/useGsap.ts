'use client';

import { useEffect, useRef } from 'react';
import type { DependencyList, RefObject } from 'react';
import gsap from 'gsap';

export type GsapCallback = (ctx: {
  self: gsap.Context;
  scope: HTMLElement;
  gsap: typeof gsap;
}) => void | (() => void);

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  callback: GsapCallback,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scope = scopeRef.current;
    if (!scope) return;

    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = callback({ self: ctx, scope, gsap });
    }, scope);

    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
