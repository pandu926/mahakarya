import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ChapterId } from '../types'
import { journeyRuntime, setJourneyProgress } from '../experience/runtime'

gsap.registerPlugin(ScrollTrigger)

interface JourneyScrollOptions {
  reducedMotion: boolean
  chapters: readonly { id: ChapterId; range: readonly [number, number] }[]
}

interface JourneyScrollApi {
  progress: number
  velocity: number
  goToChapter: (id: ChapterId, immediate?: boolean) => void
  lenisRef: React.MutableRefObject<Lenis | null>
}

function getMaxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
}

export function useJourneyScroll({ reducedMotion, chapters }: JourneyScrollOptions): JourneyScrollApi {
  const lenisRef = useRef<Lenis | null>(null)
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastSnapshot = useRef(0)
  const pendingSnapshot = useRef<number | null>(null)

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let resizeProgress = journeyRuntime.progress
    const onResize = () => {
      if (resizeTimer === null) resizeProgress = journeyRuntime.progress
      else clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-chapter]'))
        let target = resizeProgress * getMaxScroll()
        if (sections.length === 6) {
          const marks = [0, .2275, .3875, .5575, .73, 1]
          const index = marks.reduce((found, mark, i) => mark <= resizeProgress ? i : found, 0)
          const fraction = (resizeProgress - marks[index]) / Math.max(.001, (marks[index + 1] ?? 1) - marks[index])
          target = sections[index].offsetTop + ((sections[index + 1]?.offsetTop ?? getMaxScroll()) - sections[index].offsetTop) * fraction
        }
        lenisRef.current?.resize()
        resizeTimer = null
        if (lenisRef.current) lenisRef.current.scrollTo(target, { immediate: true, force: true })
        else window.scrollTo({ top: target, behavior: 'instant' })
        ScrollTrigger.refresh()
      }, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })
    const updateSnapshot = (next: number, nextVelocity: number) => {
      const now = performance.now()
      if (now - lastSnapshot.current < 80 && next < 1 && next > 0) {
        if (pendingSnapshot.current === null) {
          pendingSnapshot.current = window.setTimeout(() => {
            pendingSnapshot.current = null
            lastSnapshot.current = performance.now()
            setProgress(journeyRuntime.progress)
            setVelocity(journeyRuntime.velocity)
          }, 80)
        }
        return
      }
      lastSnapshot.current = now
      if (pendingSnapshot.current !== null) {
        window.clearTimeout(pendingSnapshot.current)
        pendingSnapshot.current = null
      }
      setProgress(next)
      setVelocity(nextVelocity)
    }

    const onScroll = ({ scroll, velocity: nextVelocity = 0 }: { scroll?: number; velocity?: number }) => {
      if (resizeTimer !== null) return
      const offset = scroll ?? window.scrollY
      let next = Math.min(1, Math.max(0, offset / getMaxScroll()))
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-chapter]'))
      if (sections.length === 6) {
        const marks = [0, .2275, .3875, .5575, .73, 1]
        const index = sections.reduce((found, section, i) => section.offsetTop <= offset + 1 ? i : found, 0)
        const start = sections[index].offsetTop
        const end = sections[index + 1]?.offsetTop ?? getMaxScroll()
        const local = Math.max(0, Math.min(1, (offset - start) / Math.max(1, end - start)))
        next = marks[index] + ((marks[index + 1] ?? 1) - marks[index]) * local
      }
      setJourneyProgress(next, nextVelocity)
      ScrollTrigger.update()
      updateSnapshot(next, nextVelocity)
      document.documentElement.style.setProperty('--journey-progress', String(next))
      document.documentElement.style.setProperty('--scroll-velocity', String(nextVelocity))
    }

    let lenis: Lenis | null = null
    if (!reducedMotion) {
      lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.92, touchMultiplier: 1, syncTouch: false })
      lenisRef.current = lenis
      lenis.on('scroll', onScroll)
      const ticker = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(ticker)
      ScrollTrigger.refresh()
      onScroll({ scroll: lenis.scroll, velocity: 0 })
      return () => {
        gsap.ticker.remove(ticker)
        lenis?.destroy()
        lenisRef.current = null
        if (pendingSnapshot.current !== null) window.clearTimeout(pendingSnapshot.current)
        pendingSnapshot.current = null
        window.removeEventListener('resize', onResize)
        if (resizeTimer !== null) clearTimeout(resizeTimer)
      }
    }

    const nativeScroll = () => onScroll({ scroll: window.scrollY, velocity: 0 })
    nativeScroll()
    window.addEventListener('scroll', nativeScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', nativeScroll)
      window.removeEventListener('resize', onResize)
      if (resizeTimer !== null) clearTimeout(resizeTimer)
      if (pendingSnapshot.current !== null) window.clearTimeout(pendingSnapshot.current)
      pendingSnapshot.current = null
    }
  }, [reducedMotion])

  const goToChapter = useCallback((id: ChapterId, immediate = false) => {
    const chapter = chapters.find((item) => item.id === id)
    if (!chapter) return
    const section = document.querySelector<HTMLElement>(`[data-mobile-chapter="${id}"]`)
    const target = section ? section.offsetTop : ((chapter.range[0] + chapter.range[1]) / 2) * getMaxScroll()
    if (lenisRef.current) lenisRef.current.scrollTo(target, { immediate, force: true })
    else window.scrollTo({ top: target, behavior: reducedMotion || immediate ? 'auto' : 'smooth' })
  }, [chapters, reducedMotion])

  return { progress, velocity, goToChapter, lenisRef }
}
