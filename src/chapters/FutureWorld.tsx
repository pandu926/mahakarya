import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { createSeededRandom, getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

interface BuildingSpec {
  position: [number, number, number]
  size: [number, number, number]
}

export function FutureWorld({ chapter, position, qualityTier, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const sun = useRef<THREE.Mesh>(null)
  const city = useRef<THREE.Group>(null)
  const buildings = useMemo<BuildingSpec[]>(() => {
    const random = createSeededRandom(1801)
    const count = qualityTier === 'low' ? 11 : qualityTier === 'medium' ? 16 : 22
    return Array.from({ length: count }, () => {
      const height = 0.8 + random() * 3.8
      return {
        position: [-4.7 + random() * 9.4, height / 2, -1 - random() * 2.8],
        size: [0.42 + random() * 0.65, height, 0.45 + random() * 0.5],
      }
    })
  }, [qualityTier])

  useFrame(() => {
    const progress = journeyRuntime.progress
    const local = getLocalProgress(progress, chapter.range)
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (root.current) {
      root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.12) * 0.016) * weight
      root.current.position.y = position[1] + (reducedMotion ? 0 : local * 0.8 * weight)
    }
    if (sun.current) {
      sun.current.scale.setScalar(0.86 + local * 0.16)
      const material = sun.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.5 + local * 0.38
    }
    if (city.current) city.current.children.forEach((building, index) => {
      building.position.y = buildings[index].position[1] * (0.72 + local * 0.28)
    })
  })

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="FutureGateCity">
      <mesh position={[-2.9, 4.1, 0]} castShadow>
        <boxGeometry args={[0.48, 8.2, 0.58]} />
        <meshStandardMaterial color="#72848a" emissive="#69502b" emissiveIntensity={0.64} metalness={0.58} roughness={0.42} />
      </mesh>
      <mesh position={[2.9, 4.1, 0]} castShadow>
        <boxGeometry args={[0.48, 8.2, 0.58]} />
        <meshStandardMaterial color="#72848a" emissive="#69502b" emissiveIntensity={0.64} metalness={0.58} roughness={0.42} />
      </mesh>
      <mesh position={[0, 8, 0]} castShadow>
        <boxGeometry args={[6.25, 0.5, 0.58]} />
        <meshStandardMaterial color="#72848a" emissive="#69502b" emissiveIntensity={0.64} metalness={0.58} roughness={0.42} />
      </mesh>
      <group ref={city}>
        {buildings.map((building, index) => (
          <mesh key={`future-building-${index}`} position={building.position} castShadow={index % 4 === 0}>
            <boxGeometry args={building.size} />
            <meshStandardMaterial color={index % 4 === 0 ? COLORS.steel : COLORS.graphite} roughness={0.66} metalness={0.36} />
          </mesh>
        ))}
      </group>
      <mesh ref={sun} position={[0, 5.8, -4.3]}>
        <sphereGeometry args={[1.1, 24, 16]} />
        <meshBasicMaterial color="#e5bf78" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.3, 1.1]}>
        <capsuleGeometry args={[0.1, 0.42, 3, 8]} />
        <meshBasicMaterial color="#050b0f" />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 9]} />
        <meshStandardMaterial color="#17272c" roughness={0.82} metalness={0.16} />
      </mesh>
      <pointLight color="#e5bf78" intensity={0.75} distance={25} position={[0, 5.8, -2]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'future' as const,
  number: '06',
  label: 'Future',
  title: "What's Next",
  range: [0.79, 1] as const,
  anchor: 118,
  landmark: 'future-gate-city',
}
