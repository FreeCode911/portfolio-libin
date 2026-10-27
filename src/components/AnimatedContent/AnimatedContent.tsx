'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

export interface AnimatedContentProps {
  children?: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: number[];
  initialOpacity?: number;
  animateOpacity?: number;
  scale?: number;
  threshold?: number;
  delay?: number;
  blur?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 1,
  ease = [0.16, 1, 0.3, 1],
  initialOpacity = 0,
  animateOpacity = 1,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  blur = 6,
  className = ''
}: AnimatedContentProps) {
  const offset = reverse ? -distance : distance;
  const axis = direction === 'horizontal' ? 'x' : 'y';

  const variants: Variants = {
    hidden: { [axis]: offset, opacity: initialOpacity, scale, filter: `blur(${blur}px)` },
    visible: { [axis]: 0, opacity: animateOpacity, scale: 1, filter: 'blur(0px)' }
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: ease as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}
