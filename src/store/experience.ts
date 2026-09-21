import { create } from 'zustand'
import type { ExperienceState } from './experienceStore'

export function createExperienceStore() {
  return create<ExperienceState>((set) => ({
    activeChapter: 'prelude',
    previousChapter: null,
    menuOpen: false,
    projectSlug: null,
    webglReady: false,
    webglEnabled: true,
    reducedMotion: false,
    qualityTier: 'high',
    inputMode: 'mouse',
    isScrolling: false,
    setActiveChapter: (id) => set((state) => state.activeChapter === id ? state : { activeChapter: id, previousChapter: state.activeChapter }),
    openMenu: () => set({ menuOpen: true }),
    closeMenu: () => set({ menuOpen: false }),
    openProject: (slug) => set({ projectSlug: slug }),
    closeProject: () => set({ projectSlug: null }),
    setWebglReady: (webglReady) => set({ webglReady }),
    setWebglEnabled: (webglEnabled) => set({ webglEnabled }),
    setReducedMotion: (reducedMotion) => set({ reducedMotion }),
    setQualityTier: (qualityTier) => set({ qualityTier }),
    setInputMode: (inputMode) => set({ inputMode }),
    setIsScrolling: (isScrolling) => set({ isScrolling }),
  }))
}
