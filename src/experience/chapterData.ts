import type { ChapterConfig, ChapterId } from './types'
import { CHAPTER_ANCHORS, chapterConfigs } from '../chapters/config'

export { chapterConfigs, CHAPTER_ANCHORS }
export const CHAPTER_RANGES = Object.fromEntries(
  chapterConfigs.map((chapter) => [chapter.id, chapter.range]),
) as Record<ChapterId, readonly [number, number]>
export const chapterById = Object.fromEntries(chapterConfigs.map((chapter) => [chapter.id, chapter])) as Record<ChapterId, ChapterConfig>
