import { describe, expect, it } from 'vitest'

import { chapters } from '../src/data/chapters'
import {
  clamp01,
  getDominantChapter,
  getLocalProgress,
  getSectionWeight,
  mapRange,
  smoothstep01,
} from '../src/lib/progress'

describe('master progress contract', () => {
  it('clamps normalized progress and handles non-finite input safely', () => {
    expect(clamp01(-0.1)).toBe(0)
    expect(clamp01(0.42)).toBe(0.42)
    expect(clamp01(1.1)).toBe(1)
    expect(clamp01(Number.NaN)).toBe(0)
  })

  it('maps values linearly without unexpectedly clamping the result', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
    expect(mapRange(-5, 0, 10, 0, 100)).toBe(-50)
    expect(mapRange(15, 0, 10, 0, 100)).toBe(150)
  })

  it('normalizes a chapter range to local progress', () => {
    const origins = chapters[1]

    expect(getLocalProgress(0.135, origins.range)).toBe(0)
    expect(getLocalProgress(0.2275, origins.range)).toBe(0.5)
    expect(getLocalProgress(0.32, origins.range)).toBe(1)
    expect(getLocalProgress(0, origins.range)).toBe(0)
    expect(getLocalProgress(1, origins.range)).toBe(1)
  })

  it('returns a bell-shaped section weight and deterministic dominant chapter', () => {
    const impact = chapters[3]
    const center = (impact.range[0] + impact.range[1]) / 2

    expect(getSectionWeight(impact.range[0] - 0.1, impact.range)).toBe(0)
    expect(getSectionWeight(center, impact.range)).toBe(1)
    expect(getSectionWeight(impact.range[1] + 0.1, impact.range)).toBe(0)
    expect(getSectionWeight(center - 0.03, impact.range)).toBe(
      getSectionWeight(center + 0.03, impact.range),
    )

    expect(getDominantChapter(0, chapters).id).toBe('prelude')
    expect(getDominantChapter(0.2, chapters).id).toBe('origins')
    expect(getDominantChapter(0.38, chapters).id).toBe('craft')
    expect(getDominantChapter(0.56, chapters).id).toBe('impact')
    expect(getDominantChapter(0.72, chapters).id).toBe('process')
    expect(getDominantChapter(0.9, chapters).id).toBe('future')
  })

  it('keeps smoothstep endpoints stable', () => {
    expect(smoothstep01(-1)).toBe(0)
    expect(smoothstep01(0)).toBe(0)
    expect(smoothstep01(0.5)).toBe(0.5)
    expect(smoothstep01(1)).toBe(1)
    expect(smoothstep01(2)).toBe(1)
  })
})
