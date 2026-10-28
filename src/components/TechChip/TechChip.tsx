'use client';

import { createElement } from 'react';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { FiCode, FiLayers, FiMessageCircle, FiServer, FiTerminal, FiWifi, FiZap } from 'react-icons/fi';
import {
  SiC,
  SiCloudflare,
  SiCplusplus,
  SiCss,
  SiDiscord,
  SiGit,
  SiGo,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiLua,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript
} from 'react-icons/si';

const ACCENTS = ['#7c6cff', '#4ec7ff', '#ff7ce5', '#8de9ff'];

const TECH_ICONS: Record<string, IconType> = {
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  'node.js': SiNodedotjs,
  c: SiC,
  'c++': SiCplusplus,
  rust: SiRust,
  go: SiGo,
  lua: SiLua,
  shell: SiGnubash,
  html: SiHtml5,
  css: SiCss,
  mongodb: SiMongodb,
  cloudflare: SiCloudflare,
  'discord.py': SiDiscord,
  react: SiReact,
  'git & github actions': SiGit
};

const ACTIVITY_ICONS: Array<[RegExp, IconType]> = [
  [/api/i, FiCode],
  [/discord/i, FiMessageCircle],
  [/hosting/i, FiServer],
  [/router|firmware/i, FiWifi],
  [/script|automation/i, FiTerminal],
  [/ai|model|infra/i, FiLayers]
];

function iconFor(item: string, activity: boolean): IconType {
  if (!activity) {
    const direct = TECH_ICONS[item.toLowerCase()];
    if (direct) return direct;
  }
  for (const [pattern, icon] of ACTIVITY_ICONS) {
    if (pattern.test(item)) return icon;
  }
  return FiZap;
}

export interface TechChipProps {
  item: string;
  index?: number;
  activity?: boolean;
  muted?: boolean;
  hoverable?: boolean;
  className?: string;
}

/** Neon chip with a per-tech icon — used by the skills ticker and the About chips. */
export default function TechChip({
  item,
  index = 0,
  activity = false,
  muted = false,
  hoverable = false,
  className = ''
}: TechChipProps) {
  const accent = muted ? 'rgba(154, 163, 184, 0.78)' : ACCENTS[index % ACCENTS.length];
  const iconNode: ReactNode = createElement(iconFor(item, activity), {
    'aria-hidden': true,
    className: 'size-4 shrink-0',
    style: {
      color: accent,
      filter: muted ? undefined : `drop-shadow(0 0 5px ${accent}55)`
    }
  });

  return (
    <span
      className={[
        'inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-sm md:text-base transition-all duration-300',
        muted ? 'border-line/70 bg-transparent text-dim' : 'border-line bg-white/[0.03] text-ink/85',
        hoverable ? 'hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.08] hover:text-ink' : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {iconNode}
      {item}
    </span>
  );
}
