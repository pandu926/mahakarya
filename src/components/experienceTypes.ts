export type ChapterId = string

export type ChapterMotif =
  | 'portal'
  | 'island'
  | 'structure'
  | 'cliff'
  | 'orrery'
  | 'horizon'
  | string

export interface ChapterCopy {
  subtitle?: string
  subheading?: string
  manifesto?: string
  supporting?: string
  body?: string
  cta?: string
  primaryCta?: string
  secondaryCta?: string
  milestones?: readonly string[]
  modules?: readonly string[]
  stages?: readonly string[]
  projects?: string
}

export interface ChapterConfig {
  id: ChapterId
  number: string
  label: string
  title: string
  heading?: string
  subtitle?: string
  kicker?: string
  description: string
  range: readonly [number, number]
  motif?: ChapterMotif
  image?: string
  copy?: ChapterCopy
}

export interface ProjectDetails {
  problem?: string
  process?: string
  contribution?: string
  result?: string
  externalLink?: string
  gallery?: readonly string[]
}

export interface ProjectItem {
  id: string
  number: string
  title: string
  role: string
  outcome: string
  problem?: string
  process?: string
  contribution?: string
  result?: string
  link?: string
  details?: ProjectDetails
}

export interface Profile {
  name?: string
  role?: string
  email: string
  linkedin?: string
  github?: string
  resume?: string
}

export type ChapterSelectHandler = (chapter: ChapterConfig) => void

export type ProjectSelectHandler = (project: ProjectItem) => void
