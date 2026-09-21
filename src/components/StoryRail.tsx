import ArrowIcon from './ArrowIcon'
import type { ChapterConfig, ChapterSelectHandler } from './experienceTypes'

interface StoryRailProps {
  chapters: readonly ChapterConfig[]
  activeId: string
  progress: number
  onSelect: ChapterSelectHandler
}

export default function StoryRail({ chapters, activeId, progress, onSelect }: StoryRailProps) {
  return (
    <section
      className="mk-story-index"
      aria-labelledby="chapter-index-title"
      aria-label="Chapter index"
      data-role="story-index"
    >
      <div className="mk-story-index__heading">
        <span className="mk-eyebrow" id="chapter-index-title">The journey / index</span>
        <span>{String(Math.round(progress * 100)).padStart(2, '0')} / 100</span>
      </div>
      <div className="mk-story-index__scroller">
        {chapters.map((chapter) => {
          const active = chapter.id === activeId
          return (
            <button
              className={`mk-story-index__item${active ? ' is-active' : ''}`}
              key={chapter.id}
              type="button"
              onClick={() => onSelect(chapter)}
              aria-current={active ? 'step' : undefined}
              aria-label={`Preview ${chapter.number} ${chapter.label}: ${chapter.title}`}
            >
              <span className={`mk-preview mk-preview--${chapter.motif || chapter.id}`} aria-hidden="true">
                <span className="mk-preview__horizon" /><span className="mk-preview__monument" /><span className="mk-preview__signal" />
              </span>
              <span className="mk-story-index__shade" aria-hidden="true" />
              <span className="mk-story-index__copy"><small>{chapter.number} &nbsp; {chapter.label}</small><strong>{chapter.title}</strong></span>
              <span className="mk-story-index__arrow" aria-hidden="true"><ArrowIcon /></span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
