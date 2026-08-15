'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@ik/utils';

export interface HeroSlide {
  id: string;
  image: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayMs?: number;
}

export function HeroSlider({ slides, autoplayMs = 6000 }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = useRef(false);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (autoplayMs <= 0 || total < 2) return;
    timer.current = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % total);
    }, autoplayMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [autoplayMs, total]);

  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative w-full h-[88vh] min-h-[560px] overflow-hidden bg-mono-ink"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${total}`}
          aria-hidden={i !== index}
          className={cn(
            'absolute inset-0 transition-opacity duration-[700ms] ease-[cubic-bezier(0.2,0,0,1)]',
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image.src}
            alt={slide.image.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mono-ink/70 via-mono-ink/20 to-transparent" />
          <div className="relative h-full flex items-end pb-24 md:pb-32">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
              <div className="max-w-2xl text-mono-surface">
                {slide.eyebrow ? (
                  <p className="uppercase tracking-[0.3em] text-[0.7rem] font-medium mb-4 opacity-90">
                    {slide.eyebrow}
                  </p>
                ) : null}
                <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-[clamp(2.5rem,6vw,5.25rem)]">
                  {slide.title}
                </h1>
                {slide.subtitle ? (
                  <p className="mt-6 text-[1rem] md:text-[1.125rem] max-w-lg opacity-90">
                    {slide.subtitle}
                  </p>
                ) : null}
                <div className="mt-10">
                  <Link
                    href={slide.ctaHref}
                    className={cn(
                      'inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.8125rem] font-semibold',
                      'px-8 py-4 bg-mono-surface text-mono-ink',
                      'transition-colors duration-200',
                      'hover:bg-mono-ink hover:text-mono-surface hover:outline hover:outline-1 hover:outline-mono-surface',
                    )}
                  >
                    {slide.ctaLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className={cn(
              'absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10',
              'w-11 h-11 md:w-12 md:h-12 flex items-center justify-center',
              'text-mono-surface border border-mono-surface/40 bg-mono-ink/20 backdrop-blur-sm',
              'hover:bg-mono-surface hover:text-mono-ink transition-colors',
            )}
          >
            <span aria-hidden className="text-lg">←</span>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className={cn(
              'absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10',
              'w-11 h-11 md:w-12 md:h-12 flex items-center justify-center',
              'text-mono-surface border border-mono-surface/40 bg-mono-ink/20 backdrop-blur-sm',
              'hover:bg-mono-surface hover:text-mono-ink transition-colors',
            )}
          >
            <span aria-hidden className="text-lg">→</span>
          </button>

          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  'h-[2px] transition-all duration-300',
                  i === index ? 'w-10 bg-mono-surface' : 'w-6 bg-mono-surface/40 hover:bg-mono-surface/70',
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
