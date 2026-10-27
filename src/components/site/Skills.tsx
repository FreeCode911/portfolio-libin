import ScrollVelocity from '../ScrollVelocity/ScrollVelocity'
import { skills, focusAreas } from '../../data'

export default function Skills() {
  const rowOne = skills
  const rowTwo = focusAreas
  return (
    <section id="skills" className="scroll-mt-24 overflow-hidden border-y border-line py-16 md:py-20">
      <div className="container-x mb-8 flex flex-col items-center gap-2 text-center">
        <h2 className="section-title">
          Languages &amp; tools
        </h2>
        <p className="max-w-[55ch] text-sm text-dim md:text-base">
          Picked up across firmware, bots, APIs and automation work — straight from my GitHub.
        </p>
      </div>
      <div className="space-y-3">
        <ScrollVelocity
          texts={[rowOne.join('  ·  ')]}
          velocity={22}
          numCopies={8}
          pauseOnHover
          className="text-2xl md:text-4xl"
          fontSize="clamp(1.6rem, 4vw, 2.6rem)"
          fontWeight={700}
          color="rgba(244, 246, 251, 0.9)"
          scrollerClassName="font-mono tracking-tight"
          scrollerStyle={{ display: 'inline-flex' }}
        />
        <ScrollVelocity
          texts={[rowTwo.join('  ·  ')]}
          velocity={-16}
          numCopies={8}
          pauseOnHover
          className="text-xl md:text-2xl"
          fontSize="clamp(1.1rem, 3vw, 1.6rem)"
          fontWeight={600}
          color="rgba(154, 163, 184, 0.9)"
          scrollerClassName="font-mono tracking-tight"
          scrollerStyle={{ display: 'inline-flex' }}
        />
      </div>
    </section>
  )
}
