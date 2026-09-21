import { describe, expect, it } from 'vitest'

import { chapters } from '../src/data/portfolio.js'
import {
  clamp,
  getActiveChapter,
  getLocalProgress,
  getSectionWeight,
  mapRange,
  smoothstep,
} from '../src/lib/progress.js'

describe('progress helpers', () => {
  it('clamps values to the inclusive bounds', () => {
    expect(clamp(-0.2, 0, 1)).toBe(0)
    expect(clamp(0.42, 0, 1)).toBe(0.42)
    expect(clamp(1.2, 0, 1)).toBe(1)
  })

  it('maps a value linearly between ranges without clamping the result', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
    expect(mapRange(-5, 0, 10, 0, 100)).toBe(-50)
    expect(mapRange(15, 0, 10, 0, 100)).toBe(150)
  })

  it('returns smoothstep endpoints and a midpoint', () => {
    expect(smoothstep(0)).toBe(0)
    expect(smoothstep(0.5)).toBe(0.5)
    expect(smoothstep(1)).toBe(1)
    expect(smoothstep(-1)).toBe(0)
    expect(smoothstep(2)).toBe(1)
  })

  it('normalizes section progress to local 0..1 and clamps at both ends', () => {
    const origins = chapters.find(({ id }) => id === 'origins')

    expect(getLocalProgress(0.135, origins)).toBe(0)
    expect(getLocalProgress((0.135 + 0.32) / 2, origins)).toBe(0.5)
    expect(getLocalProgress(0.32, origins)).toBe(1)
    expect(getLocalProgress(0, origins)).toBe(0)
    expect(getLocalProgress(1, origins)).toBe(1)
    expect(getLocalProgress(origins, 0.2275)).toBe(0.5)
    expect(getLocalProgress(0.2275, [0.32, 0.135])).toBe(0.5)
  })

  it('rejects malformed section ranges with actionable errors', () => {
    expect(() => getLocalProgress(0.5, null)).toThrow(TypeError)
    expect(() => getLocalProgress(0.5, { range: [0.5, 0.5] })).toThrow(RangeError)
    expect(() => getLocalProgress(0.5, { range: ['a', 1] })).toThrow(RangeError)
  })

  it('produces a bell-shaped section weight with a peak at the section center', () => {
    const impact = chapters.find(({ id }) => id === 'impact')
    const center = (impact.range[0] + impact.range[1]) / 2

    expect(getSectionWeight(impact.range[0] - 0.1, impact)).toBe(0)
    expect(getSectionWeight(center, impact)).toBe(1)
    expect(getSectionWeight(impact.range[1] + 0.1, impact)).toBe(0)
    expect(getSectionWeight(center - 0.03, impact)).toBe(
      getSectionWeight(center + 0.03, impact),
    )
  })

  it('selects the strongest active chapter at representative journey positions', () => {
    expect(getActiveChapter(0, chapters).id).toBe('prelude')
    expect(getActiveChapter(0.2, chapters).id).toBe('origins')
    expect(getActiveChapter(0.38, chapters).id).toBe('craft')
    expect(getActiveChapter(0.56, chapters).id).toBe('impact')
    expect(getActiveChapter(0.72, chapters).id).toBe('process')
    expect(getActiveChapter(0.9, chapters).id).toBe('future')
    expect(getActiveChapter(1, chapters).id).toBe('future')
  })

  it('always returns a boundary chapter for out-of-range master progress', () => {
    expect(getActiveChapter(-1, chapters).id).toBe('prelude')
    expect(getActiveChapter(2, chapters).id).toBe('future')
  })
})
