import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

const MODULES = [
  { label: 'SYSTEM', position: [-2.15, 3.1, 0] as [number, number, number], size: [3.3, 1.15, 1] as [number, number, number], rotation: [0, 0.05, -0.08] as [number, number, number] },
  { label: 'INTERFACE', position: [1.85, 4.3, -0.25] as [number, number, number], size: [2.7, 1.6, 0.68] as [number, number, number], rotation: [0.04, -0.12, 0.1] as [number, number, number] },
  { label: 'MOTION', position: [-1.1, 5.55, 0.3] as [number, number, number], size: [2.2, 0.62, 1.5] as [number, number, number], rotation: [0.1, 0.1, -0.04] as [number, number, number] },
  { label: 'SPACE', position: [1.95, 2.2, 0.2] as [number, number, number], size: [1.35, 2.2, 1.25] as [number, number, number], rotation: [-0.08, 0.2, 0.04] as [number, number, number] },
]

export function CraftWorld({ chapter, position, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const moduleRefs = useRef<Array<THREE.Group | null>>([])
  const aligned = useMemo(() => MODULES.map((_, index) => new THREE.Vector3((index - 1.5) * 1.2, 3.25 + (index % 2) * 0.72, 0)), [])

  useFrame(() => {
    const progress = journeyRuntime.progress
    const local = getLocalProgress(progress, chapter.range)
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const alignment = 1 - Math.abs(local - 0.5) * 2
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (root.current) root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.18) * 0.035) * weight
    moduleRefs.current.forEach((module, index) => {
      const spec = MODULES[index]
      const target = aligned[index]
      if (!module || !spec || !target) return
      module.position.x = THREE.MathUtils.lerp(spec.position[0], target.x, alignment) + (reducedMotion ? 0 : Math.sin(time * 0.45 + index) * 0.025 * weight)
      module.position.y = THREE.MathUtils.lerp(spec.position[1], target.y, alignment)
      module.position.z = THREE.MathUtils.lerp(spec.position[2], target.z, alignment)
      module.rotation.x = THREE.MathUtils.lerp(spec.rotation[0], 0, alignment)
      module.rotation.y = THREE.MathUtils.lerp(spec.rotation[1], 0, alignment)
      module.rotation.z = THREE.MathUtils.lerp(spec.rotation[2], 0, alignment)
    })
  })

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="CraftModules">
      <mesh position={[0, 1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.5, 5.5]} />
        <meshStandardMaterial color={COLORS.night} roughness={0.96} metalness={0.08} />
      </mesh>
      {MODULES.map((spec, index) => (
        <group key={spec.label} ref={(node) => { moduleRefs.current[index] = node }} position={spec.position} rotation={spec.rotation}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={spec.size} />
            <meshStandardMaterial color={index % 2 === 0 ? COLORS.graphite : COLORS.stoneLight} roughness={0.62} metalness={0.28} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...spec.size.map((value) => value * 1.012))]} />
            <lineBasicMaterial color={COLORS.gold} transparent opacity={0.46} />
          </lineSegments>
          <mesh position={[0, spec.size[1] * 0.12, spec.size[2] / 2 + 0.012]}>
            <planeGeometry args={[Math.max(0.4, spec.size[0] * 0.42), Math.max(0.16, spec.size[1] * 0.1)]} />
            <meshBasicMaterial color={COLORS.ivory} transparent opacity={0.58} />
          </mesh>
        </group>
      ))}
      <line>
        <bufferGeometry attach="geometry" onUpdate={(geometry) => geometry.setFromPoints([
          new THREE.Vector3(-4.5, 1.35, 0),
          new THREE.Vector3(-1.1, 1.8, 0.4),
          new THREE.Vector3(3.9, 1.5, 0),
        ])} />
        <lineBasicMaterial color="#8a673d" transparent opacity={0.7} />
      </line>
      <pointLight color={COLORS.gold} intensity={0.42} distance={10} position={[0, 4, 2.5]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'craft' as const,
  number: '03',
  label: 'Craft',
  title: 'Tools Into Possibilities',
  range: [0.285, 0.49] as const,
  anchor: 44,
  landmark: 'modular-architecture',
}
