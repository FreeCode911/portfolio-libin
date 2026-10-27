'use client';

import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetween?: number;
  className?: string;
  onFocusComplete?: () => void;
}

/** Focus-frame text effect (React Bits "TrueFocus"): a glowing bracket chases each word. */
export default function TrueFocus({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#9d8bff',
  glowColor = 'rgba(157, 139, 255, 0.55)',
  animationDuration = 0.5,
  pauseBetween = 0.6,
  className = '',
  onFocusComplete
}: TrueFocusProps) {
  const words = useMemo(() => sentence.split(' ').filter(Boolean), [sentence]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manualMode) return undefined;
    let index = 0;
    const id = window.setInterval(() => {
      index = (index + 1) % words.length;
      setActiveIndex(index);
      if (index === words.length - 1) onFocusComplete?.();
    }, (animationDuration + pauseBetween) * 1000);
    return () => window.clearInterval(id);
  }, [manualMode, words.length, animationDuration, pauseBetween, onFocusComplete]);

  useEffect(() => {
    const measure = () => {
      const active = wordRefs.current[activeIndex];
      const container = containerRef.current;
      if (!active || !container) return;
      const a = active.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      setFocusRect({ x: a.left - c.left, y: a.top - c.top, width: a.width, height: a.height });
    };
    measure();
    const id = window.setTimeout(measure, 80);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, [activeIndex, sentence]);

  const corner = (style: React.CSSProperties) => (
    <span style={{ ...style, position: 'absolute', width: 9, height: 9, borderColor, borderStyle: 'solid' }} />
  );

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap justify-center items-center gap-x-[0.55ch] leading-tight ${className}`}
      style={{ borderRadius: '4px' }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => { wordRefs.current[i] = el; }}
          className="relative inline-block cursor-pointer select-none whitespace-nowrap"
          style={{
            filter: i === activeIndex ? `blur(0px)` : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`
          }}
          onMouseEnter={() => manualMode && setActiveIndex(i)}
        >
          {word}
        </span>
      ))}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute"
        animate={{ x: focusRect.x - 6, y: focusRect.y - 6, width: focusRect.width + 12, height: focusRect.height + 12 }}
        transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: `0 0 22px ${glowColor}`,
          border: `2px solid ${borderColor}`,
          borderRadius: 4
        }}
      >
        {corner({ top: -1, left: -1, borderWidth: '2px 0 0 2px', borderTopLeftRadius: 4 })}
        {corner({ top: -1, right: -1, borderWidth: '2px 2px 0 0', borderTopRightRadius: 4 })}
        {corner({ bottom: -1, left: -1, borderWidth: '0 0 2px 2px', borderBottomLeftRadius: 4 })}
        {corner({ bottom: -1, right: -1, borderWidth: '0 2px 2px 0', borderBottomRightRadius: 4 })}
      </motion.div>
    </div>
  );
}
