import type { RefObject } from 'react'
import ArrowIcon from './ArrowIcon'
import type { ChapterConfig, ChapterSelectHandler, Profile } from './experienceTypes'
import { useFocusTrap } from './useFocusTrap'

interface MenuOverlayProps {
  open: boolean
  chapters: readonly ChapterConfig[]
  activeChapter: ChapterConfig
  profile: Profile
  panelRef: RefObject<HTMLDivElement | null>
  restoreFocusRef: RefObject<HTMLElement | null>
  onClose: () => void
  onSelect: ChapterSelectHandler
}

export default function MenuOverlay({
  open,
  chapters,
  activeChapter,
  profile,
  panelRef,
  restoreFocusRef,
  onClose,
  onSelect,
}: MenuOverlayProps) {
  useFocusTrap({ active: open, containerRef: panelRef, onEscape: onClose, restoreFocusRef })

  return (
    <aside
      id="menu-overlay"
      className={`mk-menu-overlay${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      inert={!open}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="mk-menu-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="menu-title" tabIndex={-1}>
        <div className="mk-overlay-header"><span className="mk-eyebrow">Navigation / 00</span><button type="button" className="mk-overlay-close" onClick={onClose} aria-label="Close menu"><span /><span /></button></div>
        <div className="mk-menu-panel__body">
          <div className="mk-menu-chapters"><h2 id="menu-title">The chapters</h2><ol>{chapters.map((chapter) => <li key={chapter.id}><button type="button" onClick={() => onSelect(chapter)}><span>{chapter.number}</span>{chapter.label}<ArrowIcon /></button></li>)}</ol></div>
          <div className="mk-menu-aside"><img className="mk-menu-preview" src={`/assets/images/chapters/${activeChapter.id}.jpg`} alt="" /><span className="mk-eyebrow">Current chapter</span><strong>{activeChapter.number} / {activeChapter.label}</strong><p>{activeChapter.subtitle || activeChapter.description}</p><span className="mk-menu-aside__rule" /><span className="mk-eyebrow">Say hello</span><a href={`mailto:${profile.email}`}>{profile.email}</a><small>{profile.role}</small></div>
        </div>
      </div>
    </aside>
  )
}
