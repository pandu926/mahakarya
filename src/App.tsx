import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import A11yAnnouncements from './components/A11yAnnouncements'
import AtmosphereOverlay from './components/AtmosphereOverlay'
import ChapterRail from './components/ChapterRail'
import CurrentChapterIndicator from './components/CurrentChapterIndicator'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import HeroManifesto from './components/HeroManifesto'
import Loader from './components/Loader'
import MenuOverlay from './components/MenuOverlay'
import ProjectOverlay from './components/ProjectOverlay'
import StoryRail from './components/StoryRail'
import TopBar from './components/TopBar'
import type { ChapterConfig as UIChapter, Profile as UIProfile, ProjectItem as UIProject } from './components/experienceTypes'
import { chapters } from './data/chapters'
import { profile, projects } from './data/projects'
import { useExperienceStore } from './store/experienceStore'
import { useJourneyScroll } from './hooks/useJourneyScroll'
import { getLocalProgress } from './experience/runtime'
import { WebGLStage } from './experience/WebGLStage'
import type { ChapterId } from './types'

const uiChapters = chapters.map((chapter) => ({
  ...chapter,
  kicker: 'subtitle' in chapter.copy ? chapter.copy.subtitle ?? chapter.eyebrow : chapter.eyebrow,
  subtitle: 'subheading' in chapter.copy ? chapter.copy.subheading ?? chapter.eyebrow : chapter.eyebrow,
})) as unknown as readonly UIChapter[]

const uiProjects = projects.map((project) => ({
  ...project,
  problem: project.details.problem,
  process: project.details.process,
  contribution: project.details.contribution,
  result: project.details.result,
  link: project.details.externalLink,
})) as unknown as readonly UIProject[]

const uiProfile = profile as unknown as UIProfile

function dominantChapter(progress: number) {
  return chapters.reduce((active, chapter) => {
    const activeCenter = (active.range[0] + active.range[1]) / 2
    const nextCenter = (chapter.range[0] + chapter.range[1]) / 2
    return Math.abs(progress - nextCenter) < Math.abs(progress - activeCenter) ? chapter : active
  }, chapters[0])
}

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [loaderProgress, setLoaderProgress] = useState(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const projectPanelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement>(null)
  const [webglAvailable, setWebglAvailable] = useState(true)
  const menuOpen = useExperienceStore((state) => state.menuOpen)
  const projectSlug = useExperienceStore((state) => state.projectSlug)
  const activeId = useExperienceStore((state) => state.activeChapter)
  const setActiveChapter = useExperienceStore((state) => state.setActiveChapter)
  const openMenu = useExperienceStore((state) => state.openMenu)
  const closeMenu = useExperienceStore((state) => state.closeMenu)
  const openProject = useExperienceStore((state) => state.openProject)
  const closeProject = useExperienceStore((state) => state.closeProject)
  const setReducedMotionStore = useExperienceStore((state) => state.setReducedMotion)
  const activeChapter = chapters.find((chapter) => chapter.id === activeId) ?? chapters[0]
  const { progress, velocity, goToChapter, lenisRef } = useJourneyScroll({ reducedMotion, chapters })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReducedMotion(media.matches)
      setReducedMotionStore(media.matches)
    }
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [setReducedMotionStore])

  useEffect(() => {
    const next = dominantChapter(progress)
    if (next.id !== activeId) setActiveChapter(next.id)
  }, [activeId, progress, setActiveChapter])

  useEffect(() => {
    const context = gsap.context(() => {
      const start = performance.now()
      const tick = () => {
        const value = Math.min(100, Math.round(((performance.now() - start) / 550) * 100))
        setLoaderProgress(value)
        if (value < 100) requestAnimationFrame(tick)
        else setLoaderVisible(false)
      }
      requestAnimationFrame(tick)
    })
    return () => context.revert()
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '').split('/')[0] as ChapterId
    if (chapters.some((chapter) => chapter.id === hash)) {
      requestAnimationFrame(() => goToChapter(hash))
    }
  }, [goToChapter])

  const selectedProject = useMemo(() => projects.find((project) => project.slug === projectSlug) ?? null, [projectSlug])

  const selectChapter = useCallback((chapter: UIChapter) => {
    goToChapter(chapter.id as ChapterId)
    closeMenu()
  }, [closeMenu, goToChapter])

  const selectProject = useCallback((project: UIProject) => {
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    openProject(project.id)
    lenisRef.current?.stop()
    window.history.pushState({}, '', `#impact/${project.id}`)
  }, [lenisRef, openProject])

  const closeProjectOverlay = useCallback(() => {
    closeProject()
    lenisRef.current?.start()
    window.history.replaceState({}, '', '#impact')
    restoreFocusRef.current?.focus()
  }, [closeProject, lenisRef])

  useEffect(() => {
    const onPopState = () => {
      const [chapterId, slug] = window.location.hash.replace(/^#/, '').split('/')
      if (slug) openProject(slug)
      else closeProject()
      if (chapters.some((chapter) => chapter.id === chapterId)) goToChapter(chapterId as ChapterId)
    }
    window.addEventListener('popstate', onPopState)
    window.addEventListener('hashchange', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('hashchange', onPopState)
    }
  }, [closeProject, goToChapter, openProject])

  const localProgress = getLocalProgress(progress, activeChapter.range)
  const scrollSpacerStyle = { height: '620vh' }

  return (
    <div className="mk-app-shell" data-active-chapter={activeChapter.id} style={{ '--journey-progress': progress, '--scroll-velocity': velocity } as CSSProperties}>
      <Loader visible={loaderVisible} progress={loaderProgress} />
      <WebGLStage progress={progress} velocity={velocity} reducedMotion={reducedMotion} onAvailabilityChange={setWebglAvailable} />
      {!webglAvailable && <div className="mk-static-world-fallback" aria-hidden="true" />}
      <AtmosphereOverlay />
      <TopBar scrolled={progress > 0.03} menuOpen={menuOpen} onHome={() => goToChapter('prelude')} onToggleMenu={() => menuOpen ? closeMenu() : openMenu()} menuButtonRef={menuButtonRef} />
      <ChapterRail chapters={uiChapters} activeId={activeChapter.id} progress={progress} onSelect={selectChapter} />
      <CurrentChapterIndicator number={activeChapter.number} label={activeChapter.label} total={chapters.length} />
      <main id="portfolio-content" className="mk-content">
        <HeroManifesto chapter={uiChapters[activeChapter.index] ?? uiChapters[0]} chapters={uiChapters} projects={uiProjects} profile={uiProfile} localProgress={localProgress} onNext={selectChapter} onOpenProject={selectProject} />
        <StoryRail chapters={uiChapters} activeId={activeChapter.id} progress={progress} onSelect={selectChapter} />
        <Footer profile={uiProfile} progress={progress} />
        <div className="mk-scroll-spacer" style={scrollSpacerStyle} aria-hidden="true" />
      </main>
      <MenuOverlay open={menuOpen} chapters={uiChapters} activeChapter={uiChapters[activeChapter.index] ?? uiChapters[0]} profile={uiProfile} panelRef={menuPanelRef} restoreFocusRef={menuButtonRef} onClose={closeMenu} onSelect={selectChapter} />
      <ProjectOverlay project={selectedProject ? (uiProjects.find((project) => project.id === selectedProject.id) ?? null) : null} motif="cliff" panelRef={projectPanelRef} restoreFocusRef={restoreFocusRef} onClose={closeProjectOverlay} />
      <CustomCursor />
      <A11yAnnouncements activeChapter={`${activeChapter.number} ${activeChapter.label}`} projectOpen={Boolean(selectedProject)} />
    </div>
  )
}
