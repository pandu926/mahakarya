import { createExperienceStore } from './experience'

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

export const useExperienceStore = createExperienceStore()

export const experienceStore = useExperienceStore
