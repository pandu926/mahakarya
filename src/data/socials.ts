import { profile } from './projects'
import type { SocialLink } from '../types'

export const socials = [
  { id: 'email', label: 'Email', href: `mailto:${profile.email}` },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, external: true },
  { id: 'github', label: 'GitHub', href: '#', external: true },
  { id: 'resume', label: 'Download CV', href: profile.resume },
] as const satisfies readonly SocialLink[]

export const SOCIALS = socials
