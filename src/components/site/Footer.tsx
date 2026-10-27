import { profile } from '../../data'
import { GitHubIcon, YouTubeIcon, DiscordIcon, GlobeIcon } from './icons'
import TrueFocus from '../TrueFocus/TrueFocus'
import AnimatedContent from '../AnimatedContent/AnimatedContent'

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

export default function Footer() {
  return (
    <footer id="connect" className="scroll-mt-24 border-t border-line">
      <div className="container-x py-16 md:py-20">
        <p className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-primary uppercase">connect</p>
        <h2 className="section-title mt-4 flex justify-center text-center text-ink">
          <TrueFocus
            sentence="Crack the code with me"
            blurAmount={3.5}
            borderColor="#9d8bff"
            glowColor="rgba(124, 108, 255, 0.5)"
            animationDuration={0.45}
            pauseBetween={0.7}
          />
        </h2>
        <p className="mx-auto mt-3 max-w-[55ch] text-center text-sm text-dim md:text-base">
          Code, videos, bots and builds — pick a channel.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {connect.map((item, i) => (
            <AnimatedContent key={item.label} distance={30} duration={0.7} delay={i * 0.08} blur={4} className="h-full">
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/5 text-dim transition-colors group-hover:text-ink">
                {item.icon}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-ink">{item.label}</span>
                <span className="block truncate font-mono text-xs text-dim">{item.handle}</span>
              </span>
              </a>
            </AnimatedContent>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-center md:flex-row md:text-left">
          <p className="font-mono text-xs text-dim">
            © {new Date().getFullYear()} {profile.name} · LykCloud Pvt Ltd
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
        </div>
      </div>
    </footer>
  )
}
