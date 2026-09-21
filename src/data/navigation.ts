import { chapters } from './chapters'
import type { NavigationItem } from '../types'

export const navigation = chapters.map((chapter) => ({
  id: chapter.id,
  number: chapter.number,
  label: chapter.label,
  href: `#${chapter.id}` as `#${typeof chapter.id}`,
})) satisfies readonly NavigationItem[]

export const chapterNavigation = navigation
export const NAVIGATION = navigation
