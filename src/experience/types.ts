import type { CSSProperties, ComponentType, ReactNode } from 'react'
import type { ChapterConfig, QualityTier } from '../types'

export type { ChapterConfig, ChapterId, QualityTier } from '../types'
export type WorldPosition = readonly [number, number, number]

export interface ChapterWorldProps {
  chapter: ChapterConfig
  position: readonly [number, number, number]
  qualityTier: QualityTier
  reducedMotion?: boolean
}

export type ChapterWorld = ComponentType<ChapterWorldProps>

export interface JourneyRuntime {
  progress: number
  targetProgress: number
  velocity: number
  direction: -1 | 0 | 1
  pointerX: number
  pointerY: number
  reducedMotion: boolean
}

export interface QualityProfile {
  tier: QualityTier
  particleCount: number
  fragmentCount: number
  maxDpr: number
  fogDensity: number
  antialias: boolean
  shadows: boolean
}
export type QualityConfig = QualityProfile

export interface WebGLStageProps {
  activeChapter?: ChapterConfig['id']
  progress?: number
  velocity?: number
  reducedMotion?: boolean
  qualityTier?: QualityTier | 'auto'
  chapters?: readonly ChapterConfig[]
  className?: string
  style?: CSSProperties
  onAvailabilityChange?: (available: boolean) => void
  onReady?: () => void
  fallback?: ReactNode
}
