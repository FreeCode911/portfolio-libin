import SectionHeader from './SectionHeader'
import SpotlightCard from '../SpotlightCard/SpotlightCard'
import PixelCard from '../PixelCard/PixelCard'
import AnimatedContent from '../AnimatedContent/AnimatedContent'
import { profile, focusAreas } from '../../data'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x grid items-center gap-10 md:grid-cols-[auto,1fr] md:gap-14">
        <div className="flex justify-center md:justify-start">
          <AnimatedContent distance={30} duration={0.7} blur={4}>
            <PixelCard variant="top" gap={22} speed={40} colors={['#7c6cff', '#4ec7ff']} className="rounded-[2rem]">
              <div className="rounded-[2rem] p-3">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} avatar`}
                  width={240}
                  height={240}
                  loading="lazy"
                  className="size-36 rounded-3xl border border-line object-cover shadow-2xl shadow-primary/10 md:size-44 lg:size-48"
                />
              </div>
            </PixelCard>
          </AnimatedContent>
        </div>

        <div>
          <AnimatedContent distance={36} duration={0.75} blur={5}>
            <SectionHeader kicker="who am i" title="Libin V M — a.k.a. LegendYt4k">
            I am a developer and creator building the LykCloud ecosystem: ShiftAPI for unified AI access, Discord bots
            for real server workflows, and self-hosted tooling for people who like to own their stack. When I am not
            shipping web and cloud services, I am compiling router firmware, automating YouTube uploads and breaking
            things until they are interesting.
          </SectionHeader>
          </AnimatedContent>

          <AnimatedContent distance={24} duration={0.7} delay={0.12} blur={4}>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <SpotlightCard
                key={area}
                theme="dark"
                softness={0.55}
                spotlightSize={180}
                className="chip cursor-default select-none text-xs hover:text-ink"
              >
                {area}
              </SpotlightCard>
            ))}
          </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
