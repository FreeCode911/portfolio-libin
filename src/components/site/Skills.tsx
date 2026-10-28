import ScrollVelocity from '../ScrollVelocity/ScrollVelocity'
import AnimatedContent from '../AnimatedContent/AnimatedContent'
import TechChip from '../TechChip/TechChip'
import { skills, focusAreas } from '../../data'

function TickerRow({ items, activity = false, muted = false }: { items: string[]; activity?: boolean; muted?: boolean }) {
  return (
    <>
      {items.map((item, i) => (
        <TechChip key={`${item}-${i}`} item={item} index={i} activity={activity} muted={muted} />
      ))}
    </>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 overflow-hidden border-y border-line py-16 md:py-20">
      <AnimatedContent
        distance={24}
        duration={0.7}
        blur={4}
        className="container-x mb-10 flex flex-col items-center gap-2 text-center"
      >
        <h2 className="section-title">Languages &amp; tools</h2>
        <p className="max-w-[55ch] text-sm text-dim md:text-base">
          Picked up across firmware, bots, APIs and automation work — straight from my GitHub.
        </p>
      </AnimatedContent>

      <div className="space-y-4">
        <ScrollVelocity
          texts={[<TickerRow key="row-a" items={skills} />]}
          velocity={20}
          numCopies={6}
          gap={12}
          pauseOnHover
          fadeEdges
          className="flex items-center"
        />
        <ScrollVelocity
          texts={[<TickerRow key="row-b" items={focusAreas} activity muted />]}
          velocity={-14}
          numCopies={6}
          gap={12}
          pauseOnHover
          fadeEdges
          className="flex items-center"
        />
      </div>
    </section>
  )
}
