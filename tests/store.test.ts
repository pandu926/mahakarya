import { describe, expect, it } from 'vitest'

import { createExperienceStore } from '../src/store/experience'

describe('experience store invariants', () => {
  it('starts with a safe, serializable discrete state', () => {
    const store = createExperienceStore()
    const state = store.getState()

    expect(state.activeChapter).toBe('prelude')
    expect(state.previousChapter).toBeNull()
    expect(state.menuOpen).toBe(false)
    expect(state.projectSlug).toBeNull()
    expect(state.webglReady).toBe(false)
    expect(state.reducedMotion).toBe(false)
    expect(['high', 'medium', 'low']).toContain(state.qualityTier)
    expect(['mouse', 'touch', 'keyboard']).toContain(state.inputMode)
  })

  it('records the previous chapter only when the active chapter changes', () => {
    const store = createExperienceStore()

    store.getState().setActiveChapter('craft')
    expect(store.getState().activeChapter).toBe('craft')
    expect(store.getState().previousChapter).toBe('prelude')

    store.getState().setActiveChapter('craft')
    expect(store.getState().previousChapter).toBe('prelude')

    store.getState().setActiveChapter('impact')
    expect(store.getState().previousChapter).toBe('craft')
  })

  it('keeps menu and project overlay state explicit and independently closable', () => {
    const store = createExperienceStore()

    store.getState().openMenu()
    expect(store.getState().menuOpen).toBe(true)
    store.getState().closeMenu()
    expect(store.getState().menuOpen).toBe(false)

    store.getState().openProject('digital-experience-platform')
    expect(store.getState().projectSlug).toBe('digital-experience-platform')
    store.getState().closeProject()
    expect(store.getState().projectSlug).toBeNull()
  })

  it('updates runtime capability and input flags immutably', () => {
    const store = createExperienceStore()

    store.getState().setWebglReady(true)
    store.getState().setWebglEnabled(false)
    store.getState().setReducedMotion(true)
    store.getState().setQualityTier('low')
    store.getState().setInputMode('keyboard')
    store.getState().setIsScrolling(true)

    expect(store.getState()).toMatchObject({
      webglReady: true,
      webglEnabled: false,
      reducedMotion: true,
      qualityTier: 'low',
      inputMode: 'keyboard',
      isScrolling: true,
    })
  })
})
