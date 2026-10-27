import SectionHeader from './SectionHeader'
import GlareHover from '../GlareHover/GlareHover'
import Squares from '../Squares/Squares'
import AnimatedContent from '../AnimatedContent/AnimatedContent'
import { projects, type Project } from '../../data'
import { ArrowIcon, GlobeIcon } from './icons'

function ProjectCard({ project }: { project: Project }) {
  const internal = project.href.startsWith('/')
  return (
    <GlareHover
      glareColor="#9d8bff"
      glareOpacity={0.35}
      glareSize={26}
      softness={0.8}
      variant="streak"
      blendMode="screen"
      mode="hover"
      background="rgba(255, 255, 255, 0.02)"
      borderColor="var(--color-line)"
      borderRadius="1.25rem"
      rimGlint={false}
      className="w-full"
    >
      <a
        href={project.href}
        target={internal ? undefined : '_blank'}
        rel="noreferrer"
        className="flex h-full w-full flex-col gap-3 p-6 md:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-ink">{project.title}</h3>
            <p className="font-mono text-xs text-dim">{project.subtitle}</p>
          </div>
          <GlobeIcon className="mt-1 h-4 w-4 shrink-0 text-dim" />
        </div>
        <p className="text-sm leading-relaxed text-dim">{project.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="chip text-[0.65rem]">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
            {project.cta}
            <ArrowIcon />
          </span>
        </div>
      </a>
    </GlareHover>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 md:py-28">
      <Squares squareSize={38} pulseColor="rgba(124, 108, 255, 0.13)" hoverFillColor="rgba(124, 108, 255, 0.10)" className="-z-10 opacity-70" />
      <div className="container-x">
        <SectionHeader kicker="selected work" title="Things I am building">
          Products, bots and open-source tools — most of it lives on GitHub, some of it earns a living.
        </SectionHeader>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedContent key={project.title} distance={44} duration={0.8} delay={(index % 3) * 0.08} blur={5}>
              <ProjectCard key={project.title} project={project} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
