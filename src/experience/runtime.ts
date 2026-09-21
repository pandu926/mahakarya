import * as THREE from 'three'
import type { ChapterConfig, JourneyRuntime, QualityProfile, QualityTier } from './types'

export const journeyRuntime: JourneyRuntime = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  direction: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: false,
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0))
}

export function getLocalProgress(progress: number, range: readonly [number, number]): number {
  const start = Math.min(range[0], range[1])
  const end = Math.max(range[0], range[1])
  if (start === end) return progress >= end ? 1 : 0
  return clamp01((progress - start) / (end - start))
}

export function getSectionWeight(progress: number, range: readonly [number, number]): number {
  const start = Math.min(range[0], range[1])
  const end = Math.max(range[0], range[1])
  const center = (start + end) * 0.5
  const radius = Math.max((end - start) * 0.62, 0.001)
  const linear = 1 - clamp01(Math.abs(progress - center) / radius)
  return linear * linear * (3 - 2 * linear)
}

export function createSeededRandom(seed = 1): () => number {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function getQualityProfile(tier: QualityTier): QualityProfile {
  if (tier === 'low') {
    return {
      tier,
      particleCount: 220,
      fragmentCount: 12,
      maxDpr: 1,
      fogDensity: 0.018,
      antialias: false,
      shadows: false,
    }
  }

  if (tier === 'medium') {
    return {
      tier,
      particleCount: 480,
      fragmentCount: 26,
      maxDpr: 1.25,
      fogDensity: 0.014,
      antialias: false,
      shadows: false,
    }
  }

  return {
    tier,
    particleCount: 760,
    fragmentCount: 44,
    maxDpr: 1.5,
    fogDensity: 0.011,
    antialias: true,
    shadows: true,
  }
}

export function getAdaptiveQuality(width: number, navigatorLike: { hardwareConcurrency?: number; deviceMemory?: number } = {}): QualityTier {
  const cores = Number(navigatorLike.hardwareConcurrency) || 4
  const memory = Number(navigatorLike.deviceMemory) || 4
  const isMobile = width < 768
  const isTablet = width < 1100
  const lowPower = cores <= 4 || memory <= 4

  if (isMobile || (isTablet && lowPower)) return 'low'
  if (isTablet || lowPower) return 'medium'
  return 'high'
}

export function setJourneyProgress(progress: number, velocity = 0): void {
  const nextProgress = clamp01(progress)
  journeyRuntime.targetProgress = nextProgress
  journeyRuntime.velocity = velocity
  journeyRuntime.direction = velocity === 0 ? 0 : velocity > 0 ? 1 : -1
  journeyRuntime.progress = nextProgress
}

export const createPointsGeometry = (
  count: number,
  seed: number,
  range: { x: number; y: number; z: number; yBase?: number },
): THREE.BufferGeometry => {
  const random = createSeededRandom(seed)
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * range.x
    positions[index * 3 + 1] = (range.yBase ?? 0) + random() * range.y
    positions[index * 3 + 2] = (random() - 0.5) * range.z
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geometry
}

export const progressToWorld = (progress: number): number => clamp01(progress) * 118

export const getDominantChapter = (progress: number, chapters: readonly ChapterConfig[]): ChapterConfig | undefined => (
  chapters.reduce<ChapterConfig | undefined>((dominant, chapter) => {
    if (!dominant) return chapter
    return getSectionWeight(progress, chapter.range) > getSectionWeight(progress, dominant.range) ? chapter : dominant
  }, undefined)
)

export function getQualityConfig(width: number, navigatorLike: { hardwareConcurrency?: number; deviceMemory?: number } = {}): QualityProfile {
  return getQualityProfile(getAdaptiveQuality(width, navigatorLike))
}

export function resolveQualityTier(requested: QualityTier | 'auto' | undefined, width: number): QualityTier {
  return requested && requested !== 'auto' ? requested : getAdaptiveQuality(width, typeof navigator === 'undefined' ? {} : navigator)
}
