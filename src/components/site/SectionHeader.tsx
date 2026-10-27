import type { ReactNode } from 'react'

export default function SectionHeader({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="mb-2 font-mono text-xs tracking-[0.3em] text-primary uppercase">{kicker}</p>
      <h2 className="section-title text-ink">{title}</h2>
      {children ? <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-dim md:text-base">{children}</p> : null}
    </div>
  )
}
