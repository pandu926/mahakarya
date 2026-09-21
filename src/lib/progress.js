import { chapters } from '../data/portfolio.js'

const DEFAULT_MIN = 0
const DEFAULT_MAX = 1

/** Keep a value within an inclusive interval. */
export function clamp(value, min = DEFAULT_MIN, max = DEFAULT_MAX) {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)

  if (!Number.isFinite(value)) return lower
  return Math.min(Math.max(value, lower), upper)
}

/** Map a value from one interval to another without clamping its result. */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMin === inMax) return outMin

  const normalized = (value - inMin) / (inMax - inMin)
  return outMin + normalized * (outMax - outMin)
}

/** Cubic smooth interpolation. The one-argument form smooths a 0–1 value. */
export function smoothstep(edge0, edge1, value) {
  if (arguments.length === 1) {
    value = edge0
    edge0 = DEFAULT_MIN
    edge1 = DEFAULT_MAX
  }

  if (edge0 === edge1) return value < edge0 ? 0 : 1

  const t = clamp((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function resolveProgressAndSection(first, second) {
  if (typeof first === 'number') {
    return { progress: first, section: second }
  }

  return { progress: second, section: first }
}

function resolveRange(section) {
  const range = Array.isArray(section) ? section : section?.range

  if (!Array.isArray(range) || range.length < 2) {
    throw new TypeError('A section with a two-value range is required.')
  }

  const [start, end] = range
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === end) {
    throw new RangeError('A section range must contain two distinct finite values.')
  }

  return start < end ? [start, end] : [end, start]
}

/** Convert master progress into the section's 0–1 local progress. */
export function getLocalProgress(first, second) {
  const { progress, section } = resolveProgressAndSection(first, second)
  const [start, end] = resolveRange(section)
  return clamp((progress - start) / (end - start))
}

/** Return the bell-curve transition weight described by the production prompt. */
export function sectionWeight(first, second) {
  const { progress, section } = resolveProgressAndSection(first, second)
  const [start, end] = resolveRange(section)
  const center = (start + end) * 0.5
  const radius = (end - start) * 0.62
  const weight = 1 - clamp(Math.abs(progress - center) / radius)

  return smoothstep(weight)
}

/** Return the chapter carrying the greatest visual weight at master progress. */
export function getActiveChapter(progress, sections = chapters) {
  if (!Array.isArray(sections) || sections.length === 0) return undefined

  const safeProgress = clamp(progress)
  return sections.reduce((active, section) => {
    if (!active) return section

    const activeWeight = sectionWeight(safeProgress, active)
    const sectionWeightValue = sectionWeight(safeProgress, section)
    return sectionWeightValue > activeWeight ? section : active
  }, undefined)
}

export const getSectionWeight = sectionWeight
export const getActiveSection = getActiveChapter

export function chapterHash(id) {
  return chapters.some((chapter) => chapter.id === id) ? `#${id}` : null
}

export function chapterIdFromHash(hash) {
  const value = String(hash ?? '').replace(/^#/, '')
  const [id, nested] = value.split('/')
  if (!id || (nested !== undefined && !nested)) return null
  return chapters.some((chapter) => chapter.id === id) ? id : null
}

export function shouldIgnoreKeyboardShortcut(event) {
  const target = event?.target
  const tagName = target?.tagName?.toUpperCase()
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName) || target?.isContentEditable === true
}
