import { create } from 'zustand'

import type { ChapterId, InputMode, QualityTier } from '../types'

export interface ExperienceState {
  readonly activeChapter: ChapterId
  readonly previousChapter: ChapterId | null
  readonly menuOpen: boolean
  readonly projectSlug: string | null
  readonly webglReady: boolean
  readonly webglEnabled: boolean
  readonly reducedMotion: boolean
  readonly qualityTier: QualityTier
  readonly inputMode: InputMode
  readonly isScrolling: boolean
  setActiveChapter: (id: ChapterId) => void
  openMenu: () => void
  closeMenu: () => void
  openProject: (slug: string) => void
  closeProject: () => void
  setWebglReady: (ready: boolean) => void
  setWebglEnabled: (enabled: boolean) => void
  setReducedMotion: (reduced: boolean) => void
  setQualityTier: (tier: QualityTier) => void
  setInputMode: (mode: InputMode) => void
  setIsScrolling: (isScrolling: boolean) => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
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
  setActiveChapter: (id) =>
    set((state) =>
      state.activeChapter === id
        ? state
        : { activeChapter: id, previousChapter: state.activeChapter },
    ),
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

export const experienceStore = useExperienceStore
