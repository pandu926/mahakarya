import { chapters } from '../data/chapters'
import type { ChapterConfig, ChapterId } from '../types'

const DEFAULT_MIN = 0
const DEFAULT_MAX = 1

export interface JourneyRuntime {
  progress: number
  targetProgress: number
  velocity: number
  direction: -1 | 0 | 1
  pointerX: number
  pointerY: number
}

export const journeyRuntime: JourneyRuntime = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  direction: 0,
  pointerX: 0,
  pointerY: 0,
}

type ProgressSection = Pick<ChapterConfig, 'range'> | readonly [number, number]

/** Keep a value within an inclusive interval. */
export function clamp(value: number, min = DEFAULT_MIN, max = DEFAULT_MAX): number {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)

  if (!Number.isFinite(value)) return lower
  return Math.min(Math.max(value, lower), upper)
}

export const clamp01 = (value: number): number => clamp(value)

/** Map a value from one interval to another without clamping its result. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMin === inMax) return outMin

  const normalized = (value - inMin) / (inMax - inMin)
  return outMin + normalized * (outMax - outMin)
}

/** Cubic smooth interpolation. The one-argument form smooths a 0–1 value. */
export function smoothstep(value: number): number
export function smoothstep(edge0: number, edge1: number, value: number): number
export function smoothstep(
  edge0: number,
  edge1?: number,
  value?: number,
): number {
  if (edge1 === undefined || value === undefined) {
    value = edge0
    edge0 = DEFAULT_MIN
    edge1 = DEFAULT_MAX
  }

  if (edge0 === edge1) return value < edge0 ? 0 : 1

  const t = clamp((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

export const smoothstep01 = (value: number): number => smoothstep(value)

function resolveProgressAndSection(
  first: number | ProgressSection,
  second: number | ProgressSection,
): { progress: number; section: ProgressSection } {
  if (typeof first === 'number') {
    return { progress: first, section: second as ProgressSection }
  }

  return { progress: second as number, section: first }
}

function resolveRange(section: ProgressSection | null | undefined): readonly [number, number] {
  const range = Array.isArray(section)
    ? section
    : section && 'range' in section
      ? section.range
      : undefined

  if (!range || range.length < 2) {
    throw new TypeError('A section with a two-value range is required.')
  }

  const [start, end] = range
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === end) {
    throw new RangeError('A section range must contain two distinct finite values.')
  }

  return start < end ? [start, end] : [end, start]
}

/** Convert master progress into the section's 0–1 local progress. */
export function getLocalProgress(progress: number, section: ProgressSection): number
export function getLocalProgress(section: ProgressSection, progress: number): number
export function getLocalProgress(
  first: number | ProgressSection,
  second: number | ProgressSection,
): number {
  const { progress, section } = resolveProgressAndSection(first, second)
  const [start, end] = resolveRange(section)
  return clamp((progress - start) / (end - start))
}

export const localProgress = getLocalProgress

/** Return the bell-curve transition weight described by the production prompt. */
export function sectionWeight(progress: number, section: ProgressSection): number
export function sectionWeight(section: ProgressSection, progress: number): number
export function sectionWeight(
  first: number | ProgressSection,
  second: number | ProgressSection,
): number {
  const { progress, section } = resolveProgressAndSection(first, second)
  const [start, end] = resolveRange(section)
  const center = (start + end) * 0.5
  const radius = (end - start) * 0.62
  const weight = 1 - clamp(Math.abs(progress - center) / radius)

  return smoothstep(weight)
}

/** Return the chapter carrying the greatest visual weight at master progress. */
export function getActiveChapter(progress: number): ChapterConfig | undefined
export function getActiveChapter<T extends ProgressSection>(
  progress: number,
  sections: readonly T[],
): T | undefined
export function getActiveChapter<T extends ProgressSection>(
  progress: number,
  sections?: readonly T[],
): T | ChapterConfig | undefined {
  const candidates = sections ?? chapters
  if (candidates.length === 0) return undefined

  const safeProgress = clamp(progress)
  const active = candidates.reduce<ProgressSection | undefined>((current, section) => {
    if (!current) return section

    const activeWeight = sectionWeight(safeProgress, current)
    const currentWeight = sectionWeight(safeProgress, section)
    return currentWeight > activeWeight ? section : current
  }, undefined)

  return active as T | ChapterConfig | undefined
}

export const getDominantChapter = getActiveChapter
export const getSectionWeight = sectionWeight
export const getActiveSection = getActiveChapter

/** Map normalized journey progress across the chapter world-coordinate rail. */
export function progressToWorld(
  progress: number,
  sections: readonly ChapterConfig[] = chapters,
): number {
  if (sections.length === 0) return 0
  if (sections.length === 1) return sections[0].worldX

  const safeProgress = clamp(progress)
  const centers = sections.map(({ range }) => (range[0] + range[1]) * 0.5)
  const lastIndex = sections.length - 1

  if (safeProgress <= centers[0]) return sections[0].worldX
  if (safeProgress >= centers[lastIndex]) return sections[lastIndex].worldX

  for (let index = 1; index < sections.length; index += 1) {
    if (safeProgress <= centers[index]) {
      return mapRange(
        safeProgress,
        centers[index - 1],
        centers[index],
        sections[index - 1].worldX,
        sections[index].worldX,
      )
    }
  }

  return sections[lastIndex].worldX
}

/** Convert normalized journey progress to a document scroll offset. */
export function progressToScroll(progress: number, maxScroll: number): number {
  return clamp(progress) * Math.max(0, maxScroll)
}

export function chapterHash(id: ChapterId | string): string | null {
  return chapters.some((chapter) => chapter.id === id) ? `#${id}` : null
}

export function chapterIdFromHash(hash: string | null | undefined): ChapterId | null {
  const value = String(hash ?? '').replace(/^#/, '')
  const [id, nested] = value.split('/')
  if (!id || (nested !== undefined && !nested)) return null
  return chapters.some((chapter) => chapter.id === id) ? (id as ChapterId) : null
}

export function shouldIgnoreKeyboardShortcut(
  event: Pick<KeyboardEvent, 'target'> | null | undefined,
): boolean {
  const target = event?.target as (EventTarget & {
    tagName?: string
    isContentEditable?: boolean
  }) | null
  const tagName = target?.tagName?.toUpperCase()
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName ?? '') || target?.isContentEditable === true
}
