import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('chapter preview assets', () => {
  it('contains six distinct scenes instead of repeated development error screens', () => {
    const chapters = ['prelude', 'origins', 'craft', 'impact', 'process', 'future']
    const hashes = chapters.map(chapter => createHash('sha256')
      .update(readFileSync(`public/assets/images/chapters/${chapter}.jpg`)).digest('hex'))
    expect(new Set(hashes).size).toBe(6)
  })
})
