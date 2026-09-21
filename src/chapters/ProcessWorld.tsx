import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

const STAGE_COUNT = 5

function Connector({ end, color }: { end: THREE.Vector3; color: string }) {
  const points: [number, number, number][] = [[0, 2.85, 0], [end.x, end.y, end.z]]
  return <Line points={points} color={color} opacity={0.38} transparent />
}

export function ProcessWorld({ chapter, position, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const rings = useRef<Array<THREE.Mesh | null>>([])
  const nodes = useRef<Array<THREE.Mesh | null>>([])
  const ringMaterials = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const nodePositions = useMemo(() => Array.from({ length: STAGE_COUNT }, (_, index) => {
    const angle = (index / STAGE_COUNT) * Math.PI * 2 - Math.PI / 2
    return new THREE.Vector3(Math.cos(angle) * (1.7 + index * 0.3), 2.85 + Math.sin(angle) * 1.1, 0.1)
  }), [])

  useFrame((_, delta) => {
    const progress = journeyRuntime.progress
    const local = getLocalProgress(progress, chapter.range)
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (root.current) root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.14) * 0.025) * weight
    rings.current.forEach((ring, index) => {
      if (!ring) return
      if (!reducedMotion) ring.rotation[index % 2 === 0 ? 'y' : 'z'] += delta * (0.0008 + index * 0.00024) * 60
      const stageStart = index * 0.17
      const active = getLocalProgress(local, [stageStart, Math.min(1, stageStart + 0.3)])
      ring.scale.setScalar(1 + active * 0.025)
      if (ringMaterials.current[index]) ringMaterials.current[index]!.emissiveIntensity = 0.16 + active * 0.72 + weight * 0.12
    })
    nodes.current.forEach((node, index) => {
      if (!node) return
      const active = getLocalProgress(local, [index * 0.17, Math.min(1, index * 0.17 + 0.3)])
      node.scale.setScalar(1 + active * 0.24)
    })
  })

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="ProcessOrrery">
      {Array.from({ length: STAGE_COUNT }, (_, index) => (
        <mesh key={`process-ring-${index}`} ref={(node) => { rings.current[index] = node }} rotation={[index * 0.18, index * 0.27, index * 0.12]} position={[0, 2.85, 0]}>
          <torusGeometry args={[1.25 + index * 0.52, 0.025 + (index === 2 ? 0.018 : 0), 8, 72]} />
          <meshStandardMaterial ref={(material) => { ringMaterials.current[index] = material }} color={index === 2 ? COLORS.gold : '#58717a'} emissive={index === 2 ? COLORS.goldDark : '#142b32'} emissiveIntensity={0.24} metalness={0.72} roughness={0.36} transparent opacity={0.84} />
        </mesh>
      ))}
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 6.7, 8]} />
        <meshStandardMaterial color={COLORS.steel} metalness={0.72} roughness={0.38} />
      </mesh>
      {nodePositions.map((nodePosition, index) => (
        <mesh key={`process-node-${index}`} ref={(node) => { nodes.current[index] = node }} position={nodePosition}>
          <sphereGeometry args={[0.14, 10, 8]} />
          <meshStandardMaterial color={index === 0 ? COLORS.gold : COLORS.ivory} emissive={index === 0 ? COLORS.goldDark : '#2d322c'} emissiveIntensity={0.3} metalness={0.42} roughness={0.4} />
        </mesh>
      ))}
      {nodePositions.map((nodePosition, index) => <Connector key={`process-connector-${index}`} end={nodePosition} color="#6a7f83" />)}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.3, 64]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={COLORS.gold} intensity={0.5} distance={11} position={[0, 4.2, 3]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'process' as const,
  number: '05',
  label: 'Process',
  title: 'A System That Works',
  range: [0.625, 0.835] as const,
  anchor: 92,
  landmark: 'kinetic-orrery',
}
