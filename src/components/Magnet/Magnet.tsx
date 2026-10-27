'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useState, type ReactNode } from 'react';

export interface MagnetProps {
  children?: ReactNode;
  magnetStrength?: number;
  padding?: number;
  disabled?: boolean;
  activeClass?: string;
  className?: string;
  innerClass?: string;
}

export default function Magnet({
  children,
  magnetStrength = 2,
  padding = 60,
  disabled = false,
  activeClass = '',
  className = '',
  innerClass = ''
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 45, stiffness: 260, mass: 0.6 });
  const springY = useSpring(y, { damping: 45, stiffness: 260, mass: 0.6 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const inside =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding &&
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;
    setActive(inside);
    if (inside) {
      x.set((event.clientX - cx) * magnetStrength);
      y.set((event.clientY - cy) * magnetStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onLeave = () => {
    setActive(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={wrapperRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className}`}
      style={{ position: 'relative' }}
    >
      <motion.div
        className={`${innerClass} ${active ? activeClass : ''}`}
        style={{ x: springX, y: springY, display: 'inline-block', willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
