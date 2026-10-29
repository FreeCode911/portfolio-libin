import { motion } from 'motion/react'
import PixelSnow from '../PixelSnow/PixelSnow'

/* 404 page — self-contained fallback.
   This site has no router (navigation is anchor-based: #top, #projects,
   #skills, #about, #connect), so NotFound is not rendered by App.tsx. It is
   ready to import if react-router (or similar) is added later — see the TODO
   in App.tsx. For static hosts (Netlify / Vercel / GitHub Pages) there is also
   public/404.html. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 text-center">
      {/* subtle decoration — same house snow, kept light */}
      <div className="absolute inset-0 pointer-events-none">
        <PixelSnow
          color="#e5d4ed"
          variant="snowflake"
          density={0.2}
          speed={0.5}
          wind={0.15}
          sway={0.35}
          flakeSize={0.8}
          depth={0.5}
          glow={0.5}
          twinkle={0.2}
          fade={0.2}
          intro={false}
        />
      </div>

      <div className="relative z-10 max-w-[44ch]">
        <span className="inline-block mb-2 font-display font-extrabold tracking-tight text-ink">
          404
        </span>
        <h2 className="mt-2 font-mono text-xs uppercase tracking-[0.6em] text-dim">
          Page not found
        </h2>
        <p className="mt-6 text-[#c7bbe2] leading-relaxed">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="mt-10">
          <motion.a
            href="#top"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-veil/70 px-6 py-2.5 font-semibold text-ink shadow-lg shadow-black/40 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            Back to home
          </motion.a>
        </div>
      </div>
    </section>
  )
}
