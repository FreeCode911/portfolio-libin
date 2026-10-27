export const profile = {
  name: 'Libin V M',
  handle: '@LegendYt4k',
  avatar: 'https://avatars.githubusercontent.com/u/174950288?v=4',
  role: 'Developer · Creator · Founder',
  tagline: 'I build APIs, Discord bots and cloud tools that just work — and ship them fast.',
  links: {
    github: 'https://github.com/Freecode911',
    youtube: 'https://www.youtube.com/@LegendYt4k',
    discordBot: 'https://github.com/Freecode911/PteroServerBot',
    lykcloud: 'https://lykcloud.com',
    shiftapi: 'https://shiftapi.lykcloud.com',
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
