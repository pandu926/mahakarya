import type { ChapterConfig, ChapterSelectHandler } from './experienceTypes'

interface ChapterRailProps {
  chapters: readonly ChapterConfig[]
  activeId: string
  progress: number
  onSelect: ChapterSelectHandler
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export default function ChapterRail({ chapters, activeId, progress, onSelect }: ChapterRailProps) {
  return (
    <nav className="mk-chapter-rail" aria-label="Chapters">
      <ol>
        {chapters.map((chapter, index) => {
          const active = chapter.id === activeId
          const segmentProgress = clamp((progress - chapter.range[0]) / Math.max(chapter.range[1] - chapter.range[0], 0.001))
          const connectorProgress = index === 0
            ? 0
            : clamp((progress - chapters[index - 1].range[0]) / 0.2)

          return (
            <li key={chapter.id} className={active ? 'is-active' : undefined}>
              {index > 0 && (
                <span className="mk-chapter-rail__connector" aria-hidden="true">
                  <span style={{ transform: `scaleY(${connectorProgress})` }} />
                </span>
              )}
              <button type="button" onClick={() => onSelect(chapter)} aria-current={active ? 'step' : undefined}>
                <span className="mk-chapter-rail__dot" aria-hidden="true" />
                <span className="mk-chapter-rail__copy"><b>{chapter.number}</b><span>{chapter.label}</span></span>
                <span className="mk-chapter-rail__progress" aria-hidden="true" style={{ transform: `scaleX(${segmentProgress})` }} />
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
