'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE } from '@/lib/motion';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({ children, delay = 0, y = 16, className, once = true }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-64px' }}
      transition={{ duration: DURATION.editorial, delay, ease: EASE.standard }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
