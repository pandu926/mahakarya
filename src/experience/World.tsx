import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Atmosphere, WorldGround } from './Atmosphere'
import { JourneyTrail } from './JourneyTrail'
import { CameraRig } from './CameraRig'
import { journeyRuntime, getSectionWeight } from './runtime'
import type { ChapterConfig, QualityTier } from './types'
import { CHAPTER_POSITIONS, chapterConfigs } from '../chapters/config'
import { PreludeWorld, OriginsWorld, CraftWorld, ImpactWorld, ProcessWorld, FutureWorld } from '../chapters'
import { COLORS } from '../chapters/shared'
import { ReflectiveFloor } from './ReflectiveFloor'
import { EnvironmentLight } from './EnvironmentLight'
import { StoneTextureProvider } from '../chapters/StoneTexture'

const WORLD_LIGHT_POSITIONS: readonly [number, number, number][] = [
  [0, 5.2, 3.8], [22, 5.4, 3.2], [44, 5.2, 3.6], [68, 5.2, 3.4], [92, 5.2, 3.6], [118, 5.8, 2.8],
]

function WorldLighting({ chapters, qualityTier }: { chapters: readonly ChapterConfig[]; qualityTier: QualityTier }) {
  const warm = useRef<THREE.PointLight>(null)
  const key = useRef<THREE.DirectionalLight>(null)
  const { gl } = useThree()
  const keyIntensity = 2.6

  useFrame(() => {
    const progress = journeyRuntime.progress
    if (warm.current) {
      let weightedX = 0
      let totalWeight = 0
      chapters.forEach(chapter => {
        const weight = getSectionWeight(progress, chapter.range)
        weightedX += chapter.worldX * weight
        totalWeight += weight
      })
      warm.current.position.x = totalWeight > 0 ? weightedX / totalWeight : progress * 118
      warm.current.intensity = 22
    }
    if (key.current) key.current.intensity = keyIntensity
    gl.toneMappingExposure = THREE.MathUtils.lerp(1.05, 1.18, THREE.MathUtils.smoothstep(progress, .79, 1))
  })

  return (
    <>
      <hemisphereLight args={['#b7d5ea', '#172028', .5]} />
      <directionalLight ref={key} color="#adc0bf" position={[-12, 18, 12]} castShadow={qualityTier === 'high'} shadow-mapSize={[qualityTier === 'high' ? 1024 : 512, qualityTier === 'high' ? 1024 : 512]} />
      <pointLight ref={warm} color="#ffe0b0" intensity={22} distance={24} decay={2} position={WORLD_LIGHT_POSITIONS[0]} />
    </>
  )
}

function resolveChapter(chapters: readonly ChapterConfig[], id: ChapterConfig['id'], index: number): ChapterConfig {
  return chapters.find((chapter) => chapter.id === id) ?? chapterConfigs[index] ?? chapterConfigs[0]
}

export interface WorldProps {
  chapters?: readonly ChapterConfig[]
  qualityTier: QualityTier
  reducedMotion?: boolean
}

export function World({ chapters = chapterConfigs, qualityTier, reducedMotion = false }: WorldProps) {
  const chapterList = useMemo(() => [
    resolveChapter(chapters, 'prelude', 0),
    resolveChapter(chapters, 'origins', 1),
    resolveChapter(chapters, 'craft', 2),
    resolveChapter(chapters, 'impact', 3),
    resolveChapter(chapters, 'process', 4),
    resolveChapter(chapters, 'future', 5),
  ], [chapters])

  return (
    <StoneTextureProvider>
      <fogExp2 attach="fog" args={[COLORS.night, qualityTier === 'low' ? 0.018 : qualityTier === 'medium' ? 0.014 : 0.011]} />
      <WorldGround />
      <EnvironmentLight />
      <ReflectiveFloor qualityTier={qualityTier} />
      <JourneyTrail reducedMotion={reducedMotion} />
      <PreludeWorld chapter={chapterList[0]} position={CHAPTER_POSITIONS[0]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <OriginsWorld chapter={chapterList[1]} position={CHAPTER_POSITIONS[1]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <CraftWorld chapter={chapterList[2]} position={CHAPTER_POSITIONS[2]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <ImpactWorld chapter={chapterList[3]} position={CHAPTER_POSITIONS[3]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <ProcessWorld chapter={chapterList[4]} position={CHAPTER_POSITIONS[4]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <FutureWorld chapter={chapterList[5]} position={CHAPTER_POSITIONS[5]} qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <Atmosphere qualityTier={qualityTier} reducedMotion={reducedMotion} />
      <WorldLighting chapters={chapterList} qualityTier={qualityTier} />
      <CameraRig reducedMotion={reducedMotion} />
    </StoneTextureProvider>
  )
}

export default World
