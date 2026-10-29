'use client'

/* --------------------------------------------------------------------------
   Shared RAF scheduler — the whole page runs off ONE animation frame instead
   of one per component (was: CursorFX lerp + two Footer reveal loops = 3
   independent rAFs, each with its own scroll/resize listeners and intervals).

   • High tier: steps every frame (~60fps)
   • Low tier:  steps every other frame (~30fps)
   • Pauses entirely when the tab is hidden (document.hidden)
   • Auto-starts/stops as components register/unregister steps
-------------------------------------------------------------------------- */

export type LoopStep = (dt: number, now: number) => void

const STEP_MS: { low: number; high: number } = { low: 33, high: 16 }

let tier: 'low' | 'high' = 'high'
let rafId = 0
let lastNow = 0
let paused = false
let lowAccum = 0
const steps = new Map<symbol, LoopStep>()
let running = false

export function detectTier(): 'low' | 'high' {
  if (typeof window === 'undefined') return 'high'
  const dm = (navigator as any).deviceMemory      // RAM in GB
  const hc = navigator.hardwareConcurrency        // CPU cores
  const coarse = window.matchMedia('(pointer: coarse)').matches   // touch device
  const small = window.innerWidth < 768 || window.innerHeight < 600
  const conn = (navigator as any).connection
  const saveData = conn?.saveData
  const eff = conn?.effectiveType
  if (
    (dm !== undefined && dm <= 4) ||
    (hc !== undefined && hc <= 4) ||
    coarse || small || saveData ||
    eff === 'slow-2g' || eff === '2g' || eff === '3g'
  ) {
    tier = 'low'
  }
  return tier
}

export function getTier(): 'low' | 'high' { return tier }

export function registerStep(step: LoopStep): symbol {
  const key = Symbol()
  steps.set(key, step)
  if (!running) {
    running = true
    lastNow = performance.now()
    rafId = requestAnimationFrame(tick)
  }
  return key
}

export function unregisterStep(key: symbol) {
  steps.delete(key)
  if (steps.size === 0) {
    running = false
    cancelAnimationFrame(rafId)
  }
}

export function pause() { paused = true }
export function resume() { paused = false; lastNow = 0 }

function tick(now: number) {
  rafId = 0
  if (!paused) {
    const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 1 / 60
    lastNow = now
    lowAccum += dt * 1000
    if (tier === 'high' || lowAccum >= STEP_MS.low) {
      lowAccum = 0
      for (const step of steps.values()) step(dt, now)
    }
  }
  rafId = requestAnimationFrame(tick)
}

export const loop = { registerStep, unregisterStep, pause, resume, detectTier, getTier }

// Detect device tier on module load so PixelSnow and other tier-aware
// components can throttle on low-end / touch devices.
detectTier()
