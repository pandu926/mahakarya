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
        <a href={profile.linkedin || '#'}>LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.resume || '#resume'}>Download CV</a>
      </nav>
    </footer>
  )
}
