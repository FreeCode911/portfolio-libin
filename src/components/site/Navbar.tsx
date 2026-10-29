import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { profile } from '../../data'
import { GitHubIcon } from './icons'
import ShinyText from '../ShinyText/ShinyText'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#connect' },
]

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // Scroll spy: the section under ~1/3 viewport height becomes "active".
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return undefined

    const pick = () => {
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) current = section.id
      }
      setActive(current)
    }

    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-primary via-[#a9a3d8] to-[#5941a9]"
        style={{ scaleX: progress }}
      />
      <nav className="container-x mt-3 flex items-center justify-between gap-3 md:mt-4">
        {/* identity chip */}
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-full border border-line bg-veil/70 py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/40 backdrop-blur-xl transition-colors hover:border-primary/40"
        >
          <img
            src={profile.avatar}
            alt={`${profile.name} avatar`}
            width={28}
            height={28}
            className="size-7 rounded-full border border-line object-cover"
          />
          <ShinyText
            text={profile.name}
            speed={3.6}
            color="#e5d4ed"
            shineColor="#a9a3d8"
            className="font-mono text-sm font-bold tracking-tight"
          />
        </a>

        {/* centered link dock with scroll-spy pill */}
        <div className="hidden items-center gap-0.5 rounded-full border border-line bg-veil/70 p-1 shadow-lg shadow-black/40 backdrop-blur-xl sm:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? 'text-ink' : 'text-dim hover:text-ink'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07] shadow-[0_0_16px_-2px] shadow-primary/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* action chip */}
        {/* action chip */}
        <motion.div
          whileHover={{ y: -2, scale: 1.05, boxShadow: '0 8px 22px -8px rgba(109, 114, 195, 0.5)' }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          className="inline-block"
          style={{ boxShadow: '0 0 0 0 rgba(109, 114, 195, 0)' }}
        >
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line bg-veil/70 px-4 py-2 text-sm font-medium text-ink shadow-lg shadow-black/40 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </nav>
    </header>
  )
}
