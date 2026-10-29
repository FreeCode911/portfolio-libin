import { motion } from 'motion/react'
import { colorFor, levelWord, skillLevels, type SkillCategory } from '../../data'

/* Recruiter-facing bar meters for everything that is not a language
   wedge: runtimes/frameworks, data & platforms, workflow tooling.
   Bars fill on scroll-into-view; the level word comes from levelWord(). */

const GROUPS: { category: SkillCategory; title: string }[] = [
  { category: 'framework', title: 'frameworks & runtimes' },
  { category: 'data', title: 'data & platforms' },
  { category: 'tooling', title: 'workflow & tooling' },
]

export default function SkillBars() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {GROUPS.map(group => (
        <div
          key={group.category}
          className="rounded-2xl border border-line bg-white/[0.02] p-5"
        >
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-dim">
            {group.title}
          </h3>
          <div className="mt-4 space-y-4">
            {skillLevels
              .filter(s => s.category === group.category)
              .map((skill, i) => {
                const color = colorFor(skill.name)
                return (
                  <div key={skill.name}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-ink/90">{skill.name}</span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: `${color}cc` }}
                      >
                        {levelWord(skill.level)}
                      </span>
                      <span className="ml-auto font-mono text-xs text-dim">{skill.level}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}22, ${color})`,
                          boxShadow: `0 0 10px ${color}66`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs leading-snug text-dim">{skill.note}</p>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
