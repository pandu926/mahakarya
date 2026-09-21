import type { RefObject } from 'react'

interface TopBarProps {
  scrolled: boolean
  menuOpen: boolean
  onHome: () => void
  onToggleMenu: () => void
  menuButtonRef: RefObject<HTMLButtonElement | null>
}

export default function TopBar({
  scrolled,
  menuOpen,
  onHome,
  onToggleMenu,
  menuButtonRef,
}: TopBarProps) {
  return (
    <header className={`mk-topbar${scrolled ? ' is-scrolled' : ''}`}>
      <a className="mk-brand" href="#prelude" onClick={(event) => { event.preventDefault(); onHome() }}>
        <span className="mk-brand__name">Mahakarya</span>
        <span className="mk-brand__role">Career Journey Portfolio</span>
      </a>
      <p className="mk-topbar__tagline">A journey of ideas. A lifetime of impact.</p>
      <button
        ref={menuButtonRef}
        className={`mk-menu-trigger${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="menu-overlay"
        onClick={onToggleMenu}
      >
        <span>Menu</span>
        <span className="mk-menu-glyph" aria-hidden="true"><i /><i /><i /><i /></span>
      </button>
    </header>
  )
}
