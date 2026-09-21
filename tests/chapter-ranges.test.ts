import { describe, expect, it } from 'vitest'

import { chapterConfigs } from '../src/chapters/config'
import type { ChapterConfig, ChapterId } from '../src/experience/types'

const expectedIds: readonly ChapterId[] = [
  'prelude',
  'origins',
  'craft',
  'impact',
  'process',
  'future',
]

describe('typed chapter content', () => {
  it('exposes six ordered chapters with readonly progress tuples', () => {
    const typedChapters: readonly ChapterConfig[] = chapterConfigs

    expect(typedChapters.map(({ id }) => id)).toEqual(expectedIds)
    expect(typedChapters).toHaveLength(6)

    typedChapters.forEach(({ range }, index) => {
      expect(range).toHaveLength(2)
      expect(range[0]).toBeGreaterThanOrEqual(0)
      expect(range[1]).toBeLessThanOrEqual(1)
      expect(range[0]).toBeLessThan(range[1])
      if (index > 0) {
        expect(range[0]).toBeLessThan(typedChapters[index - 1].range[1])
      }
    })
  })

  it('keeps the prompt-defined range boundaries', () => {
    expect(chapterConfigs.map(({ range }) => [...range])).toEqual([
      [0, 0.155],
      [0.135, 0.32],
      [0.285, 0.49],
      [0.45, 0.665],
      [0.625, 0.835],
      [0.79, 1],
    ])
  })
})
