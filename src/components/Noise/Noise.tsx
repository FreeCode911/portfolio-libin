'use client';

import { useEffect, useRef } from 'react';

export interface NoiseProps {
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  className?: string;
}

/** Animated film-grain overlay (React Bits "Noise"): SVG turbulence tiled onto a low-FPS canvas. */
export default function Noise({
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
  className = ''
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const tile = 250;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const image = new Image();
    let pattern: CanvasPattern | null = null;
    let frame = 0;
    let raf = 0;

    image.onload = () => {
      pattern = ctx.createPattern(image, 'repeat');
      URL.revokeObjectURL(url);
    };
    image.src = url;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth * (patternScaleX || 1));
      canvas.height = Math.ceil(window.innerHeight * (patternScaleY || 1));
      ctx.fillStyle = '#000';
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame += 1;
      if (frame % Math.max(1, patternRefreshInterval) !== 0 || !pattern) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = Math.min(1, Math.max(0, patternAlpha / 100));
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      image.remove();
    };
  }, [patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none fixed inset-0 h-full w-full ${className}`} />;
}
