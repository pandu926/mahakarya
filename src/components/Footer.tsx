import type { CSSProperties } from 'react'
import type { Profile } from './experienceTypes'

interface FooterProps {
  profile: Profile
  progress: number
}

export default function Footer({ profile, progress }: FooterProps) {
  return (
    <footer className="mk-footer" style={{ '--journey-progress': progress } as CSSProperties}>
      <div className="mk-footer__brand"><span>MAHAKARYA</span><small>Career Journey Portfolio</small></div>
      <div className="mk-footer__note"><q>Ideas travel further when they are real.</q><span>My journey continues <i aria-hidden="true" /></span></div>
      <nav className="mk-footer__links" aria-label="Contact links">
        <a href={profile.linkedin || '#'}><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="1" /><path d="M5 7v5M5 4.5v.5M8 12V7m0 2c0-3 4-3 4 0v3" /></svg>LinkedIn</a>
        <a href={`mailto:${profile.email}`}><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="10" /><path d="m1 3 7 6 7-6M1 13l5-5m9 5-5-5" /></svg>Email</a>
        <a href={profile.resume || '#resume'}><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="1" width="10" height="14" rx="1" /><path d="M8 4v7m-3-3 3 3 3-3" /></svg>Download CV</a>
      </nav>
    </footer>
  )
}
