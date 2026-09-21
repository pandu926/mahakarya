import { act } from 'react'
import { useRef, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'

import HeroManifesto from '../src/components/HeroManifesto'
import MenuOverlay from '../src/components/MenuOverlay'
import StoryRail from '../src/components/StoryRail'
import TopBar from '../src/components/TopBar'
import { chapterConfigs } from '../src/chapters/config'

const profile = {
  email: 'hello@example.com',
  role: 'Creative Developer / Designer',
  resume: '#resume',
}

function UiFixture() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement>(null)
  const activeChapter = chapterConfigs[0]

  return (
    <>
      <TopBar
        scrolled={false}
        menuOpen={menuOpen}
        onHome={() => {}}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        menuButtonRef={menuButtonRef}
      />
      <HeroManifesto
        chapter={activeChapter}
        chapters={chapterConfigs}
        projects={[]}
        profile={profile}
        localProgress={0}
        onNext={() => {}}
        onOpenProject={() => {}}
      />
      <StoryRail
        chapters={chapterConfigs}
        activeId={activeChapter.id}
        progress={0}
        onSelect={() => {}}
      />
      <MenuOverlay
        open={menuOpen}
        chapters={chapterConfigs}
        activeChapter={activeChapter}
        profile={profile}
        panelRef={panelRef}
        restoreFocusRef={restoreFocusRef}
        onClose={() => setMenuOpen(false)}
        onSelect={() => setMenuOpen(false)}
      />
    </>
  )
}

describe('editorial chapter shell', () => {
  const mounted: Array<{ container: HTMLDivElement; root: Root }> = []

  function mountShell() {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    act(() => {
      root.render(<UiFixture />)
    })
    mounted.push({ container, root })
    return container
  }

  afterEach(() => {
    mounted.splice(0).forEach(({ container, root }) => {
      act(() => root.unmount())
      container.remove()
    })
  })

  it('exposes six chapter labels as navigation/index controls', () => {
    const container = mountShell()

    const index = container.querySelector('[data-role="story-index"]')
    expect(index).not.toBeNull()
    const labels = chapterConfigs.map(({ label }) => label)
    const buttons = index?.querySelectorAll('button')

    expect(buttons).toHaveLength(6)
    labels.forEach((label) => {
      expect(Array.from(buttons ?? []).some((button) => button.textContent?.includes(label))).toBe(true)
    })
  })

  it('renders one active storyboard state over the stage while the index remains separate', () => {
    const container = mountShell()

    const stage = container.querySelector('[data-storyboard-state]')
    expect(stage).not.toBeNull()
    expect(container.querySelectorAll('[data-storyboard-state]')).toHaveLength(1)
    expect(stage?.querySelector('h1')?.textContent).toContain('Mahakarya')
    expect(stage?.querySelectorAll('h1')).toHaveLength(1)
    expect(container.querySelector('[data-role="story-index"]')).not.toBeNull()
  })

  it('uses menu button semantics and closes the modal menu with Escape', () => {
    const container = mountShell()

    const menuButton = container.querySelector('.mk-menu-trigger') as HTMLButtonElement
    expect(menuButton.getAttribute('aria-expanded')).toBe('false')
    expect(menuButton.getAttribute('aria-controls')).toBe('menu-overlay')

    act(() => menuButton.click())
    expect(menuButton.getAttribute('aria-expanded')).toBe('true')

    const menu = container.querySelector('[role="dialog"][aria-labelledby="menu-title"]')
    expect(menu).not.toBeNull()
    expect(menu?.getAttribute('aria-modal')).toBe('true')
    expect(menu?.querySelectorAll('button')).toHaveLength(7)

    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
    expect(menuButton.getAttribute('aria-expanded')).toBe('false')
  })
})
