'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export interface PixelCardProps {
  variant?: 'default' | 'top' | 'bottom';
  gap?: number;
  speed?: number;
  colors?: [string, string];
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

type Cell = { r: number; c: number; noise: number };

/** Pixel-dissolve hover card (React Bits "PixelCard"): cells resolve from an edge or the pointer. */
export default function PixelCard({
  variant = 'default',
  gap = 18,
  speed = 45,
  colors = ['#7c6cff', '#8de9ff'],
  className = '',
  style,
  children
}: PixelCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const pointerRef = useRef({ x: -1e5, y: -1e5, inside: false });
  const dimensionsRef = useRef({ cols: 0, rows: 0, cells: [] as Cell[] });
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return undefined;

    let raf = 0;
    let last = 0;

    const build = () => {
      const width = Math.max(1, wrap.offsetWidth);
      const height = Math.max(1, wrap.offsetHeight);
      const columns = Math.max(1, Math.round(width / gap));
      const rows = Math.max(1, Math.round(height / gap));
      const cells: Cell[] = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
          cells.push({ r, c, noise: Math.random() });
        }
      }
      dimensionsRef.current = { cols: columns, rows, cells };
      canvas.width = width;
      canvas.height = height;
      progressRef.current = 0;
    };

    const cellDepth = (cell: Cell) => {
      const { cols, rows } = dimensionsRef.current;
      if (variant === 'top') return (cell.r + cell.noise * 1.4) / Math.max(1, rows);
      if (variant === 'bottom') return (rows - 1 - cell.r + cell.noise * 1.4) / Math.max(1, rows);
      return Math.hypot(cell.c - cols / 2, cell.r - rows / 2) / Math.max(1, Math.hypot(cols / 2, rows / 2));
    };

    const draw = () => {
      const { cols, rows, cells } = dimensionsRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, wrap.offsetWidth * dpr);
      canvas.height = Math.max(1, wrap.offsetHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, wrap.offsetWidth, wrap.offsetHeight);
      const cellW = wrap.offsetWidth / cols;
      const cellH = wrap.offsetHeight / rows;
      const p = progressRef.current;
      for (const cell of cells) {
        const depth = cellDepth(cell);
        const distance = pointerRef.current.inside
          ? Math.hypot((cell.c + 0.5) * cellW - pointerRef.current.x, (cell.r + 0.5) * cellH - pointerRef.current.y) / Math.max(80, gap * 9)
          : Number.POSITIVE_INFINITY;
        const charged = 1 - depth - distance + (1 - p) * -0.6;
        const alpha = Math.min(1, Math.max(0, charged * 2.4 + cell.noise * 0.55 - 0.25));
        if (alpha <= 0.01) continue;
        const shade = Math.min(1, Math.max(0, 1 - depth));
        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle = shade > 0.55 ? colors[0] : colors[1];
        ctx.fillRect(cell.c * cellW + 1.5, cell.r * cellH + 1.5, Math.max(1, cellW - 3), Math.max(1, cellH - 3));
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const target = targetRef.current;
      const current = progressRef.current;
      const next = current + (target - current) * (1 - Math.exp(-dt / 0.16));
      if (Math.abs(next - current) > 0.0001) {
        progressRef.current = next;
        setStrength(Math.min(1, next));
      }
      draw();
    };

    const onEnter = (event: PointerEvent) => {
      pointerRef.current.inside = true;
      targetRef.current = 1;
      onMove(event);
    };
    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointerRef.current.inside = false;
      targetRef.current = 0;
    };

    const observer = new ResizeObserver(build);
    observer.observe(wrap);
    build();
    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [gap, speed, variant, colors]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: 'transparent', ...style }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        className="relative z-10 h-full w-full transition-opacity duration-300"
        style={{ opacity: 0.25 + strength * 0.75 }}
      >
        {children}
      </div>
    </div>
  );
}
