'use client';

import { useEffect, useRef } from 'react';

export interface LetterGlitchProps {
  glitchColors?: string[];
  /** Dim resting color of the grid glyphs. */
  baseColor?: string;
  /** Grid cell size in CSS pixels. */
  cellSize?: number;
  /** Flashes per second across the whole grid. */
  intensity?: number;
  /** Seconds for a lit glyph to cool back into the dim grid. */
  decay?: number;
  className?: string;
}

const DEFAULT_COLORS = ['#7c6cff', '#4ec7ff', '#ff7ce5', '#8de9ff', '#a5b4ff'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]</>#=+*%&@!?~^;:'.split('');

/**
 * Glitching character grid (React Bits "Letter Glitch"): a dim monospace
 * matrix where random glyphs flash in brand neon, cool down, and leave the
 * grid slowly corrupted behind them. 2D canvas — no WebGL contexts involved.
 */
export default function LetterGlitch({
  glitchColors = DEFAULT_COLORS,
  baseColor = 'rgba(154, 163, 184, 0.17)',
  cellSize = 26,
  intensity = 9,
  decay = 1.1,
  className = ''
}: LetterGlitchProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return undefined;

    type Cell = { char: string; bright: number; color: string; x: number; y: number };
    let cells: Cell[] = [];
    const lit = new Set<Cell>();
    let raf = 0;
    let last = performance.now();
    let pool = 0;

    const setupType = () => {
      ctx.font = `600 ${Math.round(cellSize * 0.56)}px 'JetBrains Mono', ui-monospace, 'Cascadia Mono', Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };

    const paintCell = (cell: Cell) => {
      ctx.globalAlpha = cell.bright > 0.02 ? Math.min(1, 0.2 + cell.bright * 0.8) : 1;
      ctx.fillStyle = cell.bright > 0.02 ? cell.color : baseColor;
      ctx.fillText(cell.char, cell.x + cellSize / 2, cell.y + cellSize / 2 + 1);
    };

    const eraseCell = (cell: Cell, w = cellSize, h = cellSize) => {
      ctx.clearRect(cell.x, cell.y, w, h);
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(cellSize, wrap.offsetWidth);
      const h = Math.max(cellSize, wrap.offsetHeight);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const next: Cell[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          next.push({
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            bright: 0,
            color: '',
            x: col * cellSize,
            y: row * cellSize
          });
        }
      }
      cells = next;
      ctx.clearRect(0, 0, w, h);
      setupType();
      for (const cell of next) paintCell(cell);
      lit.clear();
    };

    const flash = () => {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      if (!cell) return;
      eraseCell(cell);
      cell.char = CHARS[Math.floor(Math.random() * CHARS.length)];
      cell.color =
        Math.random() < 0.12
          ? 'rgba(244, 246, 251, 0.85)'
          : glitchColors[Math.floor(Math.random() * glitchColors.length)];
      cell.bright = 1;
      lit.add(cell);
      paintCell(cell);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      pool += dt * Math.max(0.5, intensity);
      while (pool >= 1) {
        pool -= 1;
        flash();
      }

      for (const cell of lit) {
        cell.bright -= dt / Math.max(0.2, decay);
        if (cell.bright <= 0) {
          cell.bright = 0;
          eraseCell(cell);
          paintCell(cell);
          lit.delete(cell);
        } else {
          eraseCell(cell);
          paintCell(cell);
        }
      }
    };

    const observer = new ResizeObserver(build);
    observer.observe(wrap);
    build();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [cellSize, baseColor, decay, intensity, glitchColors]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
