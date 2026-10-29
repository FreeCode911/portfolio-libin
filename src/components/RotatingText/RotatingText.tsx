'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

gsap.registerPlugin(useGSAP);

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'edges' | 'random';
  loop?: boolean;
  auto?: boolean;
  onNext?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export default function RotatingText({
  texts,
  rotationInterval = 2.4,
  staggerDuration = 0.012,
  staggerFrom = 'first',
  loop = true,
  auto = true,
  onNext,
  className = '',
  style
}: RotatingTextProps) {
  const safeTexts = useRef(texts.length ? texts : ['']);
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!auto) return undefined;
    const id = window.setInterval(
      () => {
        setIndex(current => {
          const next = current + 1;
          if (next < safeTexts.current.length) return next;
          if (loop) return 0;
          window.clearInterval(id);
          return current;
        });
        onNext?.(index);
      },
      Math.max(0.6, rotationInterval) * 1000
    );
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, rotationInterval, loop, safeTexts.current.length]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const chars = root.querySelectorAll<HTMLElement>('.rt-char');
      if (chars.length) {
        // gsap's stagger "from" uses start/end for the first/last element.
        const from = staggerFrom === 'first' ? 'start' : staggerFrom === 'last' ? 'end' : staggerFrom;
        gsap.fromTo(
          chars,
          { yPercent: 115, opacity: 0, rotateX: -78, scale: 0.72, filter: 'blur(7px)' },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.58,
            ease: 'back.out(1.65)',
            stagger: { each: Math.max(staggerDuration, 0.02), from },
            transformOrigin: '50% 100%'
          }
        );
      }
    },
    { scope: rootRef, dependencies: [index] }
  );

  const current = safeTexts.current[index] ?? '';

  return (
    <span ref={rootRef} className={`inline-flex overflow-hidden py-[0.1em] [perspective:420px] ${className}`} style={style}>
      {current.split('').map((char, i) => (
        <span key={`${index}-${i}`} className="rt-char inline-block will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
