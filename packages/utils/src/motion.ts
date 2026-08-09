import type { Transition, Variants } from 'framer-motion';

export const EASE = {
  standard: [0.2, 0, 0, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export const DURATION = {
  instant: 0.12,
  quick: 0.2,
  base: 0.32,
  editorial: 0.6,
  scroll: 0.8,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.standard },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.standard } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.06): Transition => ({
  delayChildren,
  staggerChildren,
});
