export const profile = {
  name: 'Libin V M',
  handle: '@LegendYt4k',
  avatar: 'https://avatars.githubusercontent.com/u/174950288?v=4',
  role: 'Developer · Creator · Founder',
  tagline: 'I build APIs, Discord bots and cloud tools that just work — and ship them fast.',
  links: {
    github: 'https://github.com/libinvm20',
    youtube: 'https://www.youtube.com/@LegendYt4k',
    discordBot: 'https://minenotify.xi.to/',
    lykcloud: 'https://lykcloud.com',
    shiftapi: 'https://shiftapi.qzz.io',
    rapidapi: 'https://rapidapi.com/FreeCode911/api/flux-api-4-custom-models-100-style/',
  },
}

export type Project = {
  title: string
  subtitle: string
  description: string
  tags: string[]
  href: string
  cta: string
}

export const projects: Project[] = [
  {
    title: 'ShiftAPI',
    subtitle: 'by LykCloud Pvt Ltd',
    description:
      'All-in-one AI models API — 15+ models (Flux, Gemini Nano Banana, Seedream, TTS, Translate and more) behind a single RapidAPI key. Plans from $0/mo.',
    tags: ['API', 'RapidAPI', 'AI'],
    href: profile.links.shiftapi,
    cta: 'Open ShiftAPI',
  },
  {
    title: 'LykCloud',
    subtitle: 'cloud & AI company',
    description:
      'The company behind ShiftAPI — building developer-first cloud infrastructure, self-hosted docs, guides and hosting tooling.',
    tags: ['Company', 'Founder', 'Cloud'],
    href: profile.links.lykcloud,
    cta: 'Visit LykCloud',
  },
  {
    title: 'PteroServerBot',
    subtitle: 'Discord bot for Pterodactyl',
    description:
      'A powerful Discord bot that manages Pterodactyl panel servers — user authentication, server creation and built-in resource templates.',
    tags: ['Discord', 'Python', 'Pterodactyl'],
    href: profile.links.discordBot,
    cta: 'View on GitHub',
  },
  {
    title: 'DomainForge',
    subtitle: 'subdomains from Discord',
    description:
      'Create, manage and organize Cloudflare subdomains directly from a Discord server — no dashboard needed.',
    tags: ['Discord', 'discord.py', 'Cloudflare'],
    href: 'https://github.com/Freecode911/DomainForge',
    cta: 'View on GitHub',
  },
  {
    title: 'Minolink',
    subtitle: 'URL shortener',
    description:
      'Node.js and MongoDB-powered URL shortener that turns long links into easy-to-share short links for free.',
    tags: ['Node.js', 'MongoDB', 'Web'],
    href: 'https://minolink.us.kg/',
    cta: 'Try Minolink',
  },
  {
    title: 'AnoUpload',
    subtitle: 'anonymous file uploads',
    description:
      'Anonymous file uploader using GitHub cloud storage — drop a file, get a shareable link. No accounts, no tracking.',
    tags: ['Tooling', 'GitHub API'],
    href: 'https://github.com/Freecode911/AnoUpload',
    cta: 'View on GitHub',
  },
]

export const skills: string[] = [
  'Python',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'C',
  'C++',
  'Rust',
  'Go',
  'Lua',
  'Shell',
  'HTML',
  'CSS',
  'MongoDB',
  'Cloudflare',
  'discord.py',
  'React',
  'Git & GitHub Actions',
]

/* ── Skill knowledge map ────────────────────────────────────────────────
   `level` is a self-rated depth score from 0–100. It drives both the pie
   (every entry with category 'language' becomes a wedge) and the bar
   meters. Notes tell a hiring manager what each tool ships with. */

export type SkillCategory = 'language' | 'framework' | 'data' | 'tooling'

export interface SkillEntry {
  name: string
  level: number
  category: SkillCategory
  note: string
}

export const skillLevels: SkillEntry[] = [
  // languages — rendered as wedges in the knowledge pie
  { name: 'Python', level: 92, category: 'language', note: 'bots, automation & AI tooling — discord.py, scraping, scripts' },
  { name: 'JavaScript', level: 88, category: 'language', note: 'the workhorse — web tools, bot engines, utilities' },
  { name: 'HTML', level: 84, category: 'language', note: 'full landing pages & EJS templating' },
  { name: 'TypeScript', level: 82, category: 'language', note: 'typed React/Vite apps and clean API contracts' },
  { name: 'CSS', level: 78, category: 'language', note: 'neon UI, animations, responsive layouts' },
  { name: 'Shell', level: 68, category: 'language', note: 'router firmware scripts & server glue' },
  { name: 'C', level: 62, category: 'language', note: 'firmware-level tinkering on routers' },
  { name: 'C++', level: 58, category: 'language', note: 'systems practice & performance studies' },
  { name: 'Lua', level: 55, category: 'language', note: 'OpenWrt router customization' },
  { name: 'Go', level: 46, category: 'language', note: 'lightweight network services' },
  { name: 'Rust', level: 42, category: 'language', note: 'systems experiments — still climbing the curve' },

  // frameworks & runtimes — bar meters
  { name: 'discord.py', level: 92, category: 'framework', note: 'PteroServerBot, DomainForge — 3 bots in production' },
  { name: 'Node.js', level: 80, category: 'framework', note: 'Minolink, AnoUpload & REST-style services' },
  { name: 'React', level: 76, category: 'framework', note: 'this portfolio — motion-heavy SPA' },

  // data & platforms — bar meters
  { name: 'Cloudflare', level: 82, category: 'data', note: 'Workers, Pages, DNS & subdomain products' },
  { name: 'MongoDB', level: 74, category: 'data', note: 'document storage behind Minolink & bot data' },

  // workflow & tooling — bar meters
  { name: 'Git & GitHub Actions', level: 84, category: 'tooling', note: 'CI, releases & repo hygiene' },
  { name: 'EJS', level: 60, category: 'tooling', note: 'server-rendered pages on web tools' },
]

/** In-palette accents — every color derives from the five theme anchors. */
export const skillColors: Record<string, string> = {
  python: '#6d72c3',
  javascript: '#c7bbe2',
  typescript: '#5941a9',
  html: '#9f8acb',
  css: '#a9a3d8',
  shell: '#5f608e',
  c: '#6359b6',
  'c++': '#7d7998',
  lua: '#a092a3',
  go: '#8b8acd',
  rust: '#8d869e',
  'discord.py': '#8172c0',
  'node.js': '#7d7998',
  react: '#a9a3d8',
  cloudflare: '#c7bbe2',
  mongodb: '#6359b6',
  'git & github actions': '#5941a9',
  ejs: '#a092a3',
}

export function colorFor(skill: string): string {
  return skillColors[skill.toLowerCase()] ?? '#a9a3d8'
}

/** Bucket a 0–100 depth score into a recruiter-friendly word. */
export function levelWord(level: number): string {
  if (level >= 85) return 'expert'
  if (level >= 70) return 'advanced'
  if (level >= 55) return 'comfortable'
  return 'familiar'
}

/** Snapshot from a live audit of github.com/Freecode911 (26 original repos). */
export const githubAudit = {
  originalRepos: 26,
  forks: 6,
  topLanguages: ['JavaScript', 'HTML', 'TypeScript'],
  url: 'https://github.com/Freecode911',
  audited: 'Oct 2026',
}

export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 27, label: 'public repos on GitHub' },
  { value: 15, suffix: '+', label: 'AI models unified in ShiftAPI' },
  { value: 3, label: 'Discord bots shipped' },
  { value: 1, label: 'company — LykCloud Pvt Ltd' },
]

export const focusAreas = [
  'API development',
  'Discord bots',
  'Self-hosting',
  'Router firmware',
  'Automation & scripts',
  'AI model infra',
]
