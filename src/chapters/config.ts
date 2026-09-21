import { chapters } from '../data/chapters'
import type { ChapterConfig, ChapterId } from '../types'

export const chapterConfigs: readonly ChapterConfig[] = chapters

export const CHAPTER_ANCHORS: Record<ChapterId, number> = Object.fromEntries(
  chapterConfigs.map((chapter) => [chapter.id, chapter.worldX]),
) as Record<ChapterId, number>

export const CHAPTER_POSITIONS: readonly (readonly [number, number, number])[] = chapterConfigs.map((chapter) => [
  chapter.worldX,
  0,
  0,
] as const)
