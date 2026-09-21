import { describe, expect, it } from 'vitest'

import { chapters } from '../src/data/portfolio.js'
import {
  chapterIdFromHash,
  chapterHash,
  shouldIgnoreKeyboardShortcut,
} from '../src/lib/progress.js'

const expectedChapters = [
  { id: 'prelude', number: '01', label: 'Prelude', title: 'A Journey in Motion', range: [0, 0.155] },
  { id: 'origins', number: '02', label: 'Origins', title: 'Where It Began', range: [0.135, 0.32] },
  { id: 'craft', number: '03', label: 'Craft', title: 'Tools Into Possibilities', range: [0.285, 0.49] },
  { id: 'impact', number: '04', label: 'Impact', title: 'Ideas That Deliver', range: [0.45, 0.665] },
  { id: 'process', number: '05', label: 'Process', title: 'A System That Works', range: [0.625, 0.835] },
  { id: 'future', number: '06', label: 'Future', title: "What's Next", range: [0.79, 1] },
]

describe('MAHAKARYA chapter data', () => {
  it('contains the six chapters in journey order with the exact ids and ranges', () => {
    expect(chapters).toHaveLength(expectedChapters.length)

    expect(chapters).toEqual(
      expectedChapters.map((expected) =>
        expect.objectContaining(expected),
      ),
    )
  })

  it('keeps chapter ids unique and ranges valid while preserving intentional overlap', () => {
    expect(new Set(chapters.map(({ id }) => id)).size).toBe(chapters.length)

    chapters.forEach(({ range }) => {
      expect(range).toHaveLength(2)
      expect(range[0]).toBeGreaterThanOrEqual(0)
      expect(range[1]).toBeLessThanOrEqual(1)
      expect(range[0]).toBeLessThan(range[1])
    })

    expect(chapters[1].range[0]).toBeLessThan(chapters[0].range[1])
    expect(chapters[2].range[0]).toBeLessThan(chapters[1].range[1])
    expect(chapters[3].range[0]).toBeLessThan(chapters[2].range[1])
    expect(chapters[4].range[0]).toBeLessThan(chapters[3].range[1])
    expect(chapters[5].range[0]).toBeLessThan(chapters[4].range[1])
  })
})

describe('chapter deep links and keyboard safety', () => {
  it.each(expectedChapters)('round-trips the $id chapter hash', ({ id }) => {
    expect(chapterHash(id)).toBe(`#${id}`)
    expect(chapterIdFromHash(`#${id}`)).toBe(id)
  })

  it('normalizes a nested project hash to its chapter', () => {
    expect(chapterIdFromHash('#impact/project-slug')).toBe('impact')
    expect(chapterIdFromHash('impact/project-slug')).toBe('impact')
  })

  it('rejects empty, malformed, and unknown hashes without selecting a chapter', () => {
    expect(chapterIdFromHash('')).toBeNull()
    expect(chapterIdFromHash('#')).toBeNull()
    expect(chapterIdFromHash('#not-a-chapter')).toBeNull()
    expect(chapterIdFromHash('#impact/')).toBeNull()
  })

  it.each(['INPUT', 'TEXTAREA', 'SELECT'])('does not hijack shortcuts in %s fields', (tagName) => {
    expect(shouldIgnoreKeyboardShortcut({ target: { tagName } })).toBe(true)
  })

  it('does not hijack shortcuts in contenteditable elements', () => {
    expect(
      shouldIgnoreKeyboardShortcut({
        target: { tagName: 'DIV', isContentEditable: true },
      }),
    ).toBe(true)
  })

  it('allows shortcuts from non-editable page targets', () => {
    expect(shouldIgnoreKeyboardShortcut({ target: { tagName: 'BODY' } })).toBe(false)
    expect(shouldIgnoreKeyboardShortcut({ target: { tagName: 'BUTTON' } })).toBe(false)
  })
})
