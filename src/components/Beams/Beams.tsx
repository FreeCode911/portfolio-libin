'use client';

import { useMemo } from 'react';

export interface BeamsProps {
  beamCount?: number;
  className?: string;
}

const COLORS = ['#7c6cff', '#4ec7ff', '#ff7ce5', '#a5b4ff'];
const WIDTHS = [2, 3, 5, 2, 4, 2, 3];

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const CSS = `
@keyframes beams-fall {
  0% { transform: translateY(-120%); opacity: 0; }
  9% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(540%); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .beams-head { animation: none !important; opacity: 0.3 !important; top: 40% !important; }
}
`;

// Deterministic pseudo-random per index so every reload lays out identically.
const jitter = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Light-shaft background (React Bits "Beams"): glowing heads travel down soft columns. */
export default function Beams({ beamCount = 7, className = '' }: BeamsProps) {
  const beams = useMemo(
    () =>
      Array.from({ length: Math.max(1, beamCount) }, (_, i) => {
        const spread = (i + 0.5) / Math.max(1, beamCount);
        return {
          left: spread * 100 + jitter(i + 1) * 7 - 3.5,
          width: WIDTHS[i % WIDTHS.length],
          duration: 8.5 + jitter(i + 2) * 6,
          delay: -(jitter(i + 3) * 12),
          color: COLORS[i % COLORS.length],
          columnBlur: 5 + (i % 3) * 3,
          headBlur: 0.3 + (i % 2) * 0.4
        };
      }),
    [beamCount]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ contentVisibility: 'visible' }}
    >
      <style>{CSS}</style>
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(58% 46% at 18% 8%, rgba(124, 108, 255, 0.16), transparent 62%), radial-gradient(48% 42% at 86% 12%, rgba(78, 199, 255, 0.13), transparent 62%), radial-gradient(44% 38% at 50% 108%, rgba(255, 124, 229, 0.10), transparent 66%)'
        }}
      />
      {beams.map((beam, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-40%',
            height: '180%',
            left: `${beam.left}%`,
            width: beam.width,
            marginLeft: -beam.width / 2
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, transparent 4%, ${beam.color}12 20%, ${beam.color}2b 52%, transparent 88%)`,
              filter: `blur(${beam.columnBlur}px)`
            }}
          />
          <div
            className="beams-head"
            style={{
              position: 'absolute',
              left: '50%',
              top: '-24%',
              width: beam.width,
              height: '24%',
              marginLeft: -beam.width / 2,
              background: `linear-gradient(to bottom, transparent, ${beam.color} 42%, ${beam.color} 58%, transparent)`,
              boxShadow: `0 0 ${4 + beam.width * 3}px 2px ${beam.color}80`,
              filter: `blur(${beam.headBlur}px)`,
              animation: `beams-fall ${beam.duration}s linear ${beam.delay}s infinite`
            }}
          />
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          mixBlendMode: 'overlay',
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: '160px 160px'
        }}
      />
    </div>
  );
}
