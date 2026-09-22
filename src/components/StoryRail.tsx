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
              <img className="mk-preview mk-preview--render" src={`/assets/images/chapters/${chapter.id}.jpg`} alt="" loading={chapter.id === 'prelude' ? 'eager' : 'lazy'} width="660" height="575" />
              <span className="mk-story-index__shade" aria-hidden="true" />
              <span className="mk-story-index__copy"><b>{chapter.number}</b><small>{chapter.label}</small><strong>{['Manifesto, who I am, and why I create.', 'Early experiments and first steps.', 'Skills, tools, and ways of thinking.', 'Selected projects and real-world results.', 'How I work, from problem to solution.', 'Vision, goals, and let’s build together.'][Number(chapter.number) - 1]}</strong></span>
              <span className="mk-story-index__arrow" aria-hidden="true"><ArrowIcon /></span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
