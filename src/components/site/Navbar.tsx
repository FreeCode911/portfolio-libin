import { profile } from '../../data'
import { GitHubIcon } from './icons'
import Magnet from '../Magnet/Magnet'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#connect' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="container-x mt-3 flex items-center justify-between rounded-2xl border border-line bg-veil/70 py-2 backdrop-blur-xl md:mt-4">
        <a href="#top" className="flex items-center gap-2 pl-2 font-mono text-sm font-semibold tracking-tight text-ink md:pl-3">
          <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_12px_2px] shadow-primary/60" />
          {profile.handle}
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-dim transition-colors hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnet padding={34} magnetStrength={1.6}>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </Magnet>
      </nav>
    </header>
  )
}
