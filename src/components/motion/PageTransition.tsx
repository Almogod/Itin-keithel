'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE } from '@/lib/motion';

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.base, ease: EASE.standard }}
    >
      {children}
    </motion.div>
  );
}
