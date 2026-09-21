import type { ChapterId } from '../types'

const chapterIds = new Set<ChapterId>(['prelude', 'origins', 'craft', 'impact', 'process', 'future'])

export interface JourneyHash {
  chapterId: ChapterId | null
  projectSlug: string | null
}

export function createChapterHash(chapterId: ChapterId): string {
  return `#${chapterId}`
}

export function createProjectHash(chapterId: ChapterId, projectSlug: string): string {
  return `#${chapterId}/${encodeURIComponent(projectSlug)}`
}

export function parseJourneyHash(hash: string): JourneyHash {
  const raw = String(hash ?? '').replace(/^#/, '')
  const parts = raw.split('/')
  if (parts.length > 2 || !chapterIds.has(parts[0] as ChapterId) || (parts.length === 2 && !parts[1])) {
    return { chapterId: null, projectSlug: null }
  }
  return {
    chapterId: parts[0] as ChapterId,
    projectSlug: parts.length === 2 ? decodeURIComponent(parts[1]) : null,
  }
}
