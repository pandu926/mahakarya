import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { createSeededRandom, getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

interface FragmentSpec {
  position: [number, number, number]
  scale: number
  rotation: [number, number, number]
  speed: number
  phase: number
}

export function OriginsWorld({ chapter, position, qualityTier, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const island = useRef<THREE.Mesh>(null)
  const fragments = useRef<THREE.Group>(null)
  const fragmentSpecs = useMemo<FragmentSpec[]>(() => {
    const random = createSeededRandom(402)
    const count = qualityTier === 'low' ? 10 : qualityTier === 'medium' ? 14 : 18
    return Array.from({ length: count }, (_, index) => {
      const angle = random() * Math.PI * 2
      const radius = 3.15 + random() * 1.9
      return {
        position: [Math.cos(angle) * radius, 1.3 + random() * 3, Math.sin(angle) * radius * 0.54] as [number, number, number],
        scale: 0.11 + random() * 0.27,
        rotation: [random() * 2, random() * 2, random() * 2] as [number, number, number],
        speed: 0.06 + random() * 0.11,
        phase: index * 0.63 + random() * 5,
      }
    })
  }, [qualityTier])

  useFrame(() => {
    const progress = journeyRuntime.progress
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (island.current) island.current.position.y = 1.8 + (reducedMotion ? 0 : Math.sin(time * 0.7) * 0.08) * weight
    if (root.current) root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.16) * 0.035) * weight
    fragments.current?.children.forEach((fragment, index) => {
      const spec = fragmentSpecs[index]
      if (!spec) return
      const amount = reducedMotion ? 0 : Math.sin(time * spec.speed + spec.phase) * 0.08 * weight
      fragment.position.y = spec.position[1] + amount
      if (!reducedMotion) fragment.rotation.y += spec.speed * 0.008
    })
  })

  const local = getLocalProgress(journeyRuntime.progress, chapter.range)

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="OriginsFloatingIsland">
      <mesh ref={island} position={[0, 1.8, 0]} scale={[1.2, 0.58, 0.86]} castShadow receiveShadow>
        <icosahedronGeometry args={[2.65, 1]} />
        <meshStandardMaterial color={COLORS.basalt} roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[0, 2.55, 0]} scale={[1, 1, 0.75]}>
        <cylinderGeometry args={[2.06, 1.52, 0.27, 9]} />
        <meshStandardMaterial color={COLORS.stone} roughness={0.86} metalness={0.08} />
      </mesh>
      <group position={[0, 2.55, 0]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.11, 0.22, 1.9, 7]} />
          <meshStandardMaterial color={COLORS.graphite} roughness={0.72} metalness={0.18} />
        </mesh>
        <mesh position={[0, 2.1, 0]} scale={[1, 1.15, 1]}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial color="#28504c" roughness={0.9} metalness={0.04} />
        </mesh>
        <mesh position={[-0.36, 2.55, 0.02]} scale={[1, 1.15, 1]}>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial color="#315a52" roughness={0.9} metalness={0.04} />
        </mesh>
        <mesh position={[0.38, 2.62, -0.02]} scale={[1, 1.15, 1]}>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial color="#315a52" roughness={0.9} metalness={0.04} />
        </mesh>
      </group>
      <group ref={fragments}>
        {fragmentSpecs.map((spec, index) => (
          <mesh key={`origin-fragment-${index}`} position={spec.position} rotation={spec.rotation} scale={spec.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={index % 3 === 0 ? COLORS.stoneLight : COLORS.graphite} roughness={0.82} metalness={0.16} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.15, 48]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.12 + local * 0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#9fb8ab" intensity={0.4 + local * 0.25} distance={11} position={[0, 4.8, 3]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'origins' as const,
  number: '02',
  label: 'Origins',
  title: 'Where It Began',
  range: [0.135, 0.32] as const,
  anchor: 22,
  landmark: 'floating-island-tree',
}
