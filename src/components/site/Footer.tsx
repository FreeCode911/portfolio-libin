import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { profile } from '../../data'
import { GitHubIcon, YouTubeIcon, DiscordIcon, GlobeIcon, ArrowIcon } from './icons'
import TrueFocus from '../TrueFocus/TrueFocus'
import AnimatedContent from '../AnimatedContent/AnimatedContent'

const YEAR = new Date().getFullYear()

const connect = [
  {
    label: 'GitHub',
    handle: '@Freecode911',
    href: profile.links.github,
    icon: <GitHubIcon className="h-5 w-5" />,
  },
  {
    label: 'YouTube',
    handle: '@LegendYt4k',
    href: profile.links.youtube,
    icon: <YouTubeIcon className="h-5 w-5" />,
  },
  {
    label: 'Discord bot',
    handle: 'PteroServerBot',
    href: profile.links.discordBot,
    icon: <DiscordIcon className="h-5 w-5" />,
  },
  {
    label: 'ShiftAPI',
    handle: 'RapidAPI · 15+ models',
    href: profile.links.rapidapi,
    icon: <GlobeIcon className="h-5 w-5" />,
  },
]

const CURSOR_CSS = '@keyframes tblink { 50% { opacity: 0 } }'

type TerminalLine =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; key: string; value: string }

const TERMINAL_LINES: TerminalLine[] = [
  { kind: 'cmd', text: 'gh api /users/Freecode911' },
  { kind: 'out', key: 'name', value: 'Libin V M' },
  { kind: 'out', key: 'company', value: 'LykCloud Pvt Ltd' },
  { kind: 'out', key: 'shipping', value: 'ShiftAPI · PteroServerBot' },
  { kind: 'out', key: 'status', value: 'open — replies < 24h' },
]

function lineText(entry: TerminalLine): string {
  return entry.kind === 'cmd' ? entry.text : `${entry.key.padEnd(10)}${entry.value}`
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] rounded-[1px] bg-[#4ec7ff]"
      style={{ animation: 'tblink 1.05s steps(1) infinite' }}
    />
  )
}

/** Fake console that types the owner's profile when it scrolls into view. */
function TerminalCard() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [state, setState] = useState({ line: 0, chars: 0 })

  // Geometry-polling visibility check. IntersectionObserver callbacks never fire
  // in this environment (verified directly), so we read rects on rAF instead —
  // once is enough, then the loop cancels itself.
  useEffect(() => {
    if (seen) return undefined
    let raf = 0
    const check = () => {
      const root = rootRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        setSeen(true)
        return
      }
      raf = requestAnimationFrame(check)
    }
    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [seen])

  useEffect(() => {
    if (!seen || state.line >= TERMINAL_LINES.length) return undefined
    const current = TERMINAL_LINES[state.line]
    const typing = state.chars < lineText(current).length
    const id = window.setTimeout(
      () => setState((s) => (typing ? { line: s.line, chars: s.chars + 1 } : { line: s.line + 1, chars: 0 })),
      typing ? 22 : 340
    )
    return () => window.clearTimeout(id)
  }, [seen, state])

  const finished = state.line >= TERMINAL_LINES.length

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-line bg-black/40 shadow-[0_30px_80px_-40px] shadow-primary/30"
    >
      <style>{CURSOR_CSS}</style>
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-mono text-[11px] text-dim">libin@lykcloud — ~/portfolio</span>
        <span className="ml-auto hidden font-mono text-[10px] text-dim/70 sm:block">zsh</span>
      </div>

      <div className="min-h-[10.5rem] space-y-1.5 px-5 py-4 font-mono text-[12.5px] leading-relaxed md:text-[13px]">
        {TERMINAL_LINES.map((entry, i) => {
          if (i > state.line) return null
          const isCurrent = i === state.line && !finished
          const chars = isCurrent ? state.chars : lineText(entry).length

          if (entry.kind === 'cmd') {
            return (
              <p key={`t-${i}`} className="text-ink">
                <span className="text-primary">$&nbsp;</span>
                {entry.text.slice(0, chars)}
                {isCurrent ? <Cursor /> : null}
              </p>
            )
          }

          const keyLabel = entry.key.padEnd(10)
          const keyChars = Math.min(chars, keyLabel.length)
          const valueChars = Math.max(0, chars - keyLabel.length)
          return (
            <p key={`t-${i}`} className="whitespace-pre">
              <span className="text-dim">{keyLabel.slice(0, keyChars)}</span>
              <span className="text-ink">{entry.value.slice(0, valueChars)}</span>
              {isCurrent ? <Cursor /> : null}
            </p>
          )
        })}

        {finished ? (
          <p className="text-ink">
            <span className="text-primary">$&nbsp;</span>
            <Cursor />
          </p>
        ) : null}
      </div>
    </div>
  )
}

function ChannelCard({ children, label, handle, href }: { children: ReactNode; label: string; handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-[0_14px_40px_-18px_rgba(124,108,255,0.45)]"
    >
      <span className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/5 text-dim transition-colors group-hover:border-primary/30 group-hover:text-ink">
          {children}
        </span>
        <ArrowIcon className="h-4 w-4 -translate-x-1 text-dim opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
      </span>
      <span className="font-semibold text-ink">{label}</span>
      <span className="font-mono text-xs text-dim">{handle}</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer id="connect" className="scroll-mt-24 border-t border-line">
      <div className="container-x py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr,minmax(320px,24rem)] md:gap-14">
          <AnimatedContent distance={30} duration={0.75} blur={5}>
            <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary uppercase">connect</p>
            <h2 className="section-title mt-4 flex text-ink">
              <TrueFocus
                sentence="Crack the code with me"
                blurAmount={3.5}
                borderColor="#9d8bff"
                glowColor="rgba(124, 108, 255, 0.5)"
                animationDuration={0.45}
                pauseBetween={0.7}
              />
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm text-dim md:text-base">
              Code, videos, bots and builds — pick a channel below, or just watch the console type me out.
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-xs text-dim">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              open for builds &amp; collabs — replies &lt; 24h
            </span>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.75} delay={0.12} blur={5}>
            <TerminalCard />
          </AnimatedContent>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {connect.map((item, i) => (
            <AnimatedContent key={item.label} distance={30} duration={0.7} delay={i * 0.08} blur={4} className="h-full">
              <ChannelCard label={item.label} handle={item.handle} href={item.href}>
                {item.icon}
              </ChannelCard>
            </AnimatedContent>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-center md:flex-row md:text-left">
          <p className="font-mono text-xs text-dim">
            © {YEAR} {profile.name} · LykCloud Pvt Ltd
          </p>
          <p className="font-mono text-xs text-dim">
            built with <span className="text-ink">React</span> +{' '}
            <a
              href="https://reactbits.dev"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
            >
              React Bits
            </a>
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2, boxShadow: '0 8px 22px -8px rgba(124, 108, 255, 0.5)' }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-xs text-dim transition-colors hover:border-primary/40 hover:text-ink"
            style={{ boxShadow: '0 0 0 0 rgba(124, 108, 255, 0)' }}
          >
            <ArrowIcon className="h-3.5 w-3.5 -rotate-45" />
            back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
