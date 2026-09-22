import type { RefObject } from 'react'
import ArrowIcon from './ArrowIcon'
import type { ProjectItem } from './experienceTypes'
import { useFocusTrap } from './useFocusTrap'

interface ProjectOverlayProps {
  project: ProjectItem | null
  motif?: string
  panelRef: RefObject<HTMLDivElement | null>
  restoreFocusRef: RefObject<HTMLElement | null>
  onClose: () => void
}

export default function ProjectOverlay({
  project,
  motif = 'cliff',
  panelRef,
  restoreFocusRef,
  onClose,
}: ProjectOverlayProps) {
  useFocusTrap({ active: Boolean(project), containerRef: panelRef, onEscape: onClose, restoreFocusRef })
  if (!project) return null

  const details = project.details || {}
  const titleId = `project-title-${project.id}`

  return (
    <aside className="mk-project-overlay" aria-hidden={!project} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="mk-project-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="mk-overlay-header"><span className="mk-eyebrow">{project.number} / Impact</span><button type="button" className="mk-overlay-close" onClick={onClose} aria-label="Close project detail"><span /><span /></button></div>
        <div className="mk-project-panel__body">
          <div className={`mk-project-panel__visual mk-preview--${motif}`}><img src="/assets/images/chapters/impact.jpg" alt="Procedural cliff-city study representing the selected project" /></div>
          <div className="mk-project-panel__copy">
            <h2 id={titleId}>{project.title}</h2>
            <p className="mk-project-panel__role">{project.role}</p>
            <p className="mk-project-panel__outcome">{project.outcome}</p>
            <dl>
              {[
                ['Problem', project.problem || details.problem],
                ['Process', project.process || details.process],
                ['Contribution', project.contribution || details.contribution],
                ['Result', project.result || details.result],
              ].map(([label, value]) => value ? <div key={label}><dt>{label}</dt><dd>{value}</dd></div> : null)}
            </dl>
            {project.link && <a className="mk-button mk-button--primary" href={project.link}>View project <ArrowIcon /></a>}
          </div>
        </div>
      </div>
    </aside>
  )
}
