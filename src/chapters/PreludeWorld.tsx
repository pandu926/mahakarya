import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

export function PreludeWorld({ chapter, position, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  const seam = useRef<THREE.MeshBasicMaterial>(null)
  const floorGlow = useRef<THREE.MeshBasicMaterial>(null)
  const local = getLocalProgress(journeyRuntime.progress, chapter.range)

  useFrame((_, delta) => {
    const node = root.current
    if (!node) return
    const progress = journeyRuntime.progress
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const chapterProgress = getLocalProgress(progress, chapter.range)
    const time = reducedMotion ? 0 : performance.now() * 0.001
    node.position.y = position[1] + (reducedMotion ? 0 : Math.sin(time * 0.34) * 0.015) * weight
    if (ring.current && !reducedMotion) ring.current.rotation.z += delta * 0.035 * (0.35 + weight)
    if (seam.current) seam.current.opacity = 0.18 + weight * 0.7 - chapterProgress * 0.28
    if (floorGlow.current) floorGlow.current.opacity = 0.12 + weight * 0.26
  })

  const floorGeometry = useMemo(() => new THREE.PlaneGeometry(14, 10), [])

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="PreludePortal">
      <mesh position={[-2.05, 4.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 9.5, 0.8]} />
        <meshStandardMaterial color={COLORS.basalt} roughness={0.9} metalness={0.08} />
      </mesh>
      <mesh position={[2.05, 4.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 9.5, 0.8]} />
        <meshStandardMaterial color={COLORS.basalt} roughness={0.9} metalness={0.08} />
      </mesh>
      <mesh position={[0, 9.25, 0]} castShadow>
        <boxGeometry args={[6.2, 0.65, 0.9]} />
        <meshStandardMaterial color={COLORS.stone} roughness={0.82} metalness={0.12} />
      </mesh>
      <mesh position={[0, 4.25, 0.47]}>
        <planeGeometry args={[0.16, 8.1]} />
        <meshBasicMaterial ref={seam} color={COLORS.ivory} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring} position={[0, 4.25, 0.35]} rotation={[0, 0, 0]} scale={[1, 1.85, 1]}>
        <torusGeometry args={[2.05, 0.025, 8, 72]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.32, 1.25]}>
        <capsuleGeometry args={[0.085, 0.33, 3, 8]} />
        <meshBasicMaterial color="#050b0f" />
      </mesh>
      <mesh position={[0, 0.7, 1.25]}>
        <sphereGeometry args={[0.095, 8, 6]} />
        <meshBasicMaterial color="#050b0f" />
      </mesh>
      <mesh geometry={floorGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0.4]} receiveShadow>
        <meshStandardMaterial color="#09151c" roughness={0.84} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0.01, 1.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 5.5]} />
        <meshBasicMaterial ref={floorGlow} color={COLORS.goldDark} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={COLORS.gold} intensity={0.55 + local * 0.35} distance={14} position={[0, 4.5, 2.4]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'prelude' as const,
  number: '01',
  label: 'Prelude',
  title: 'A Journey in Motion',
  range: [0, 0.155] as const,
  anchor: 0,
  landmark: 'portal',
}
