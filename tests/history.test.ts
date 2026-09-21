import { describe, expect, it } from 'vitest'

import {
  createChapterHash,
  createProjectHash,
  parseJourneyHash,
} from '../src/lib/history'

describe('journey hash/history helpers', () => {
  it.each(['prelude', 'origins', 'craft', 'impact', 'process', 'future'])(
    'round-trips the %s chapter hash',
    (chapterId) => {
      const hash = createChapterHash(chapterId)

      expect(hash).toBe(`#${chapterId}`)
      expect(parseJourneyHash(hash)).toEqual({ chapterId, projectSlug: null })
    },
  )

  it('parses a nested project hash without losing its chapter', () => {
    expect(createProjectHash('impact', 'digital-experience-platform')).toBe(
      '#impact/digital-experience-platform',
    )
    expect(parseJourneyHash('#impact/digital-experience-platform')).toEqual({
      chapterId: 'impact',
      projectSlug: 'digital-experience-platform',
    })
  })

  it.each(['', '#', '#unknown', '#impact/', '#impact/a/b'])('rejects malformed hash %s', (hash) => {
    expect(parseJourneyHash(hash)).toEqual({ chapterId: null, projectSlug: null })
  })
})
