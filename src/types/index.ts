export type ChapterId =
  | 'prelude'
  | 'origins'
  | 'craft'
  | 'impact'
  | 'process'
  | 'future'

export type QualityTier = 'high' | 'medium' | 'low'
export type InputMode = 'mouse' | 'touch' | 'keyboard'
export type ProgressRange = readonly [number, number]

export interface ChapterCopy {
  readonly subtitle?: string
  readonly manifesto?: string
  readonly cta?: string
  readonly subheading?: string
  readonly supporting?: string
  readonly milestones?: readonly string[]
  readonly body?: string
  readonly modules?: readonly string[]
  readonly projects?: string
  readonly primaryCta?: string
  readonly secondaryCta?: string
  readonly stages?: readonly string[]
}

export interface ChapterConfig {
  readonly id: ChapterId
  readonly index: number
  readonly number: string
  readonly label: string
  readonly title: string
  readonly eyebrow: string
  readonly heading: string
  readonly range: ProgressRange
  readonly worldX: number
  readonly story: string
  readonly description: string
  readonly copy: ChapterCopy
  readonly landmark: string
  readonly motif: string
  readonly thumbnail?: string
}

export interface ProjectDetails {
  readonly problem: string
  readonly process: string
  readonly contribution: string
  readonly result: string
  readonly gallery: readonly string[]
  readonly externalLink: string
}

export interface ProjectItem {
  readonly id: string
  readonly slug: string
  readonly number: string
  readonly title: string
  readonly label: string
  readonly role: string
  readonly summary: string
  readonly outcome: string
  readonly metric: string
  readonly thumbnail: string
  readonly tags: readonly string[]
  readonly details: ProjectDetails
  readonly year?: string
  readonly image?: string
  readonly href?: string
}

export interface Profile {
  readonly name: string
  readonly role: string
  readonly email: string
  readonly linkedin: string
  readonly resume: string
}

export interface NavigationItem {
  readonly id: ChapterId
  readonly number: string
  readonly label: string
  readonly href: `#${ChapterId}`
}

export type SocialId = 'email' | 'linkedin' | 'github' | 'behance' | 'dribbble' | 'resume'

export interface SocialLink {
  readonly id: SocialId
  readonly label: string
  readonly href: string
  readonly external?: boolean
}
