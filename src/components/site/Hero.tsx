import LetterGlitch from '../LetterGlitch/LetterGlitch'
import SplitText from '../SplitText/SplitText'
import RotatingText from '../RotatingText/RotatingText'
import { motion } from 'motion/react'
import GradientText from '../GradientText/GradientText'
import ShinyText from '../ShinyText/ShinyText'
import StarBorder from '../StarBorder/StarBorder'
import { profile } from '../../data'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <LetterGlitch />
        <div className="absolute inset-0 bg-gradient-to-b from-veil/40 via-transparent to-veil" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center gap-6 pt-28 pb-20 text-center">
        <span className="chip font-mono">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-400" />
          building right now — LykCloud &amp; ShiftAPI
        </span>

        <p className="font-mono text-sm tracking-[0.3em] text-dim uppercase">Hi, I am</p>

        <SplitText
          text={profile.name}
          tag="h1"
          effect="blur"
          delay={40}
          duration={1.1}
          trigger="load"
          className="m-0 text-[clamp(3rem,11vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight text-ink"
        />

        <GradientText
          colors={['#a5b4ff', '#8de9ff', '#ffb3f7', '#a5b4ff']}
          animationSpeed={7}
          className="text-[clamp(1.05rem,3vw,1.5rem)] font-semibold"
        >
          <span className="block leading-snug">
            <RotatingText
              texts={['Developer', 'Creator', 'Founder']}
              rotationInterval={2.6}
              staggerDuration={0.014}
              staggerFrom="first"
            />
          </span>
        </GradientText>

        <p className="max-w-[60ch] text-[clamp(0.95rem,2.5vw,1.1rem)] leading-relaxed text-dim">
          {profile.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <motion.div
            whileHover={{ y: -3, scale: 1.03, boxShadow: '0 10px 30px -10px rgba(124, 108, 255, 0.55)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="inline-block rounded-full"
            style={{ boxShadow: '0 0 0 0 rgba(124, 108, 255, 0)' }}
          >
            <StarBorder
              as="a"
              href="#projects"
              theme="dark"
              color="#9d8bff"
              trailColor="#4ec7ff"
              thickness={1.5}
              radius={999}
              hover="brighten"
              className="px-6 py-2.5 font-semibold text-ink"
            >
              View my work
            </StarBorder>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, scale: 1.03, boxShadow: '0 10px 30px -10px rgba(78, 199, 255, 0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="inline-block rounded-xl"
            style={{ boxShadow: '0 0 0 0 rgba(78, 199, 255, 0)' }}
          >
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-line bg-white/[0.03] px-6 py-2.5 font-semibold text-dim transition-colors hover:border-line hover:text-ink"
            >
              GitHub →
            </a>
          </motion.div>
        </div>

        <ShinyText
          text="scroll to explore"
          speed={2.5}
          className="mt-10 font-mono text-xs tracking-[0.35em] uppercase"
        />
      </div>
    </section>
  )
}
