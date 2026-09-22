import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ArrowIcon from './ArrowIcon'
import type { ChapterConfig, ChapterSelectHandler, ProjectItem, ProjectSelectHandler, Profile } from './experienceTypes'

interface HeroManifestoProps {
  mobile?: boolean
  chapter: ChapterConfig
  chapters: readonly ChapterConfig[]
  projects: readonly ProjectItem[]
  profile: Profile
  localProgress: number
  onNext: ChapterSelectHandler
  onOpenProject: ProjectSelectHandler
}

function list(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

export default function HeroManifesto({
  mobile = false,
  chapter,
  chapters,
  projects,
  profile,
  localProgress,
  onNext,
  onOpenProject,
}: HeroManifestoProps) {
  const stage = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (!stage.current || mobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo('.mk-cinematic-stage__content', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' })
    }, stage)
    return () => context.revert()
  }, [chapter.id, mobile])
  const copy = chapter.copy || {}
  const title = chapter.id === 'prelude' ? 'Mahakarya' : chapter.heading || chapter.title
  const kicker = chapter.id === 'prelude' ? chapter.kicker : chapter.subtitle
  const milestones = list(copy.milestones)
  const modules = list(copy.modules)
  const stages = list(copy.stages)
  const Heading = mobile && chapter.id !== 'prelude' ? 'h2' : 'h1'
  const titleId = mobile ? `story-stage-title-${chapter.id}` : 'story-stage-title'

  return (
    <section
      ref={stage}
      className={`mk-cinematic-stage mk-cinematic-stage--${chapter.motif || chapter.id}`}
      aria-labelledby={titleId}
      aria-label="Cinematic chapter state"
      data-storyboard-state={chapter.id}
      data-chapter-index={chapter.number}
    >
      <div className="mk-cinematic-stage__content">
        {chapter.id !== 'prelude' && <span className="mk-eyebrow"><span>{chapter.number}</span> {chapter.label}</span>}
        <Heading id={titleId}>{title}</Heading>
        {kicker && <p className="mk-cinematic-stage__kicker">{kicker}</p>}
        <p className="mk-cinematic-stage__description">{chapter.id === 'prelude' ? chapter.description.split('. ').map((sentence, i, all) => <span key={sentence}>{sentence}{i < all.length - 1 ? '.' : ''}{i < all.length - 1 && <br />}</span>) : chapter.description}</p>

        {chapter.id === 'origins' && milestones.length > 0 && (
          <ul className="mk-detail-list mk-detail-list--milestones" aria-label="Origins milestones">
            {milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}
          </ul>
        )}

        {chapter.id === 'craft' && modules.length > 0 && (
          <ul className="mk-detail-list mk-detail-list--modules" aria-label="Craft modules">
            {modules.map((module) => <li key={module}>{module}</li>)}
          </ul>
        )}

        {chapter.id === 'process' && stages.length > 0 && (
          <ol className="mk-process-stages" aria-label="Process stages">
            {stages.map((stage, index) => (
              <li key={stage} className={index <= Math.round(localProgress * (stages.length - 1)) ? 'is-active' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>{stage}
              </li>
            ))}
          </ol>
        )}

        {chapter.id === 'impact' && (
          <div className="mk-project-index" aria-label="Selected projects">
            {projects.slice(0, 3).map((project) => (
              <button key={project.id} type="button" onClick={() => onOpenProject(project)}>
                <span>{project.number}</span><strong>{project.title}</strong><ArrowIcon />
              </button>
            ))}
          </div>
        )}

        {chapter.id === 'future' && (
          <div className="mk-story-actions">
            <a className="mk-button mk-button--primary" href={`mailto:${profile.email}`}>Get in touch <ArrowIcon /></a>
            <a className="mk-button mk-button--quiet" href={profile.resume || '#resume'}>View resume <ArrowIcon /></a>
          </div>
        )}

        {chapter.id === 'prelude' && chapters[1] && (
          <button className="mk-scroll-cue" type="button" onClick={() => onNext(chapters[1])}>
            <span className="mk-scroll-cue__line" aria-hidden="true" /><span>Scroll to begin</span><ArrowIcon />
          </button>
        )}
      </div>
      <div className="mk-cinematic-stage__meta" aria-hidden="true"><span>More<br />than work</span><i /><small>A positive legacy</small></div>
      {chapter.id === 'prelude' && <div className="mk-travel-hint" aria-hidden="true"><i /><span>Scroll<br />to travel<br />through<br />my story</span></div>}
    </section>
  )
}
