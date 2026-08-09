'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE } from '@ik/utils';

export interface StaggerListProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  as?: 'div' | 'ul' | 'ol';
}

export function StaggerList({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.06,
  as = 'div',
}: StaggerListProps) {
  const MotionEl = motion[as as 'div'];
  return (
    <MotionEl
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      variants={{ hidden: {}, visible: { transition: { delayChildren, staggerChildren } } }}
      className={className}
    >
      {children}
    </MotionEl>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.standard } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
