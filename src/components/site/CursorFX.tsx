import { useEffect } from 'react'
import { registerStep, unregisterStep } from '../perf/LoopManager'

/* Award-site staple: custom cursor — a lavender dot that leads, plus a
   trailing ring that lerps behind it and swells over interactive elements.
   Raw DOM nodes managed by hand so React never re-renders them. Every node
   carries [data-cursor-fx] and cleanup removes them, so the StrictMode
   double-mount can only ever leave exactly one pair behind.

   The lerp is driven by the shared LoopManager rAF (one frame for the whole
   page) instead of a per-component rAF; low-tier devices step at ~30fps. */
export default function CursorFX() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    document.querySelectorAll('[data-cursor-fx]').forEach(node => node.remove())

    const dot = document.createElement('div')
    const ring = document.createElement('div')
    const base = {
      position: 'fixed',
      left: '0',
      top: '0',
      pointerEvents: 'none',
      zIndex: '200',
      borderRadius: '9999px',
      opacity: '0',
    } as const
    Object.assign(dot.style, base, {
      width: '6px',
      height: '6px',
      backgroundColor: '#e5d4ed',
      boxShadow: '0 0 10px rgba(229, 212, 237, 0.8)',
      transition: 'opacity .35s ease',
    })
    Object.assign(ring.style, base, {
      width: '34px',
      height: '34px',
      border: '1.5px solid rgba(229, 212, 237, 0.5)',
      transition: 'opacity .35s ease, width .28s ease, height .28s ease, border-color .28s ease',
    })
    dot.setAttribute('data-cursor-fx', '1')
    ring.setAttribute('data-cursor-fx', '1')
    document.body.append(dot, ring)

    let mouseX = -40
    let mouseY = -40
    let rx = -40
    let ry = -40
    let seen = false

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      if (!seen) {
        seen = true
        rx = mouseX
        ry = mouseY
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onOver = (event: MouseEvent) => {
      const hot = (event.target as Element | null)?.closest?.('a, button, input, [data-cursor-hot]')
      ring.style.width = hot ? '54px' : '34px'
      ring.style.height = hot ? '54px' : '34px'
      ring.style.borderColor = hot ? 'rgba(169, 163, 216, 0.9)' : 'rgba(229, 212, 237, 0.5)'
      dot.style.opacity = hot ? '0.45' : '1'
    }

    const onOut = () => {
      seen = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    // shared ticker step — lerp ring toward mouse; runs on the page's single rAF
    const step = (_dt: number) => {
      rx += (mouseX - rx) * 0.14
      ry += (mouseY - ry) * 0.14
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`
      const half = parseFloat(ring.style.width) / 2
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0)`
    }
    const key = registerStep(step)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onOut)

    return () => {
      unregisterStep(key)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onOut)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}
