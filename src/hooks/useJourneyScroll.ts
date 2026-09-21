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
  goToChapter: (id: ChapterId) => void
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
    const updateSnapshot = (next: number, nextVelocity: number) => {
      const now = performance.now()
      if (now - lastSnapshot.current < 80 && next < 1 && next > 0) {
        if (pendingSnapshot.current === null) {
          pendingSnapshot.current = window.setTimeout(() => {
            pendingSnapshot.current = null
            lastSnapshot.current = performance.now()
            setProgress(next)
            setVelocity(nextVelocity)
          }, 80)
        }
        return
      }
      lastSnapshot.current = now
      setProgress(next)
      setVelocity(nextVelocity)
    }

    const onScroll = ({ scroll, velocity: nextVelocity = 0 }: { scroll?: number; velocity?: number }) => {
      const next = Math.min(1, Math.max(0, (scroll ?? window.scrollY) / getMaxScroll()))
      setJourneyProgress(next, nextVelocity)
      journeyRuntime.progress = next
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
      return () => {
        gsap.ticker.remove(ticker)
        lenis?.destroy()
        lenisRef.current = null
        if (pendingSnapshot.current !== null) window.clearTimeout(pendingSnapshot.current)
      }
    }

    const nativeScroll = () => onScroll({ scroll: window.scrollY, velocity: 0 })
    nativeScroll()
    window.addEventListener('scroll', nativeScroll, { passive: true })
    window.addEventListener('resize', nativeScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', nativeScroll)
      window.removeEventListener('resize', nativeScroll)
      if (pendingSnapshot.current !== null) window.clearTimeout(pendingSnapshot.current)
    }
  }, [reducedMotion])

  const goToChapter = useCallback((id: ChapterId) => {
    const chapter = chapters.find((item) => item.id === id)
    if (!chapter) return
    const target = ((chapter.range[0] + chapter.range[1]) / 2) * getMaxScroll()
    window.history.replaceState({}, '', `#${id}`)
    if (lenisRef.current) lenisRef.current.scrollTo(target)
    else window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [chapters, reducedMotion])

  return { progress, velocity, goToChapter, lenisRef }
}
