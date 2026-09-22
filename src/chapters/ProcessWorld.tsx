import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

const STAGE_COUNT = 5

function Connector({ end, color }: { end: THREE.Vector3; color: string }) {
  const line = useMemo(() => new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 3.7, 0), end]), new THREE.LineBasicMaterial({ color, opacity: .38, transparent: true })), [end, color])
  useEffect(() => () => { line.geometry.dispose(); line.material.dispose() }, [line])
  return <primitive object={line} />
}

export function ProcessWorld({ chapter, position, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const pulse = useRef<THREE.Mesh>(null)
  const rings = useRef<Array<THREE.Mesh | null>>([])
  const nodes = useRef<Array<THREE.Mesh | null>>([])
  const ringMaterials = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const nodePositions = useMemo(() => Array.from({ length: STAGE_COUNT }, (_, index) => {
    const angle = (index / STAGE_COUNT) * Math.PI * 2 - Math.PI / 2
    return new THREE.Vector3(Math.cos(angle) * (1.25 + index * .52), 3.7 + Math.sin(angle) * (1.25 + index * .52), .12 - index * .16)
  }), [])

  useFrame(() => {
    const progress = journeyRuntime.progress
    const local = getLocalProgress(progress, chapter.range)
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    if (pulse.current) {
      const angle = local * Math.PI * 2
      pulse.current.position.set(Math.cos(angle) * 2.29, 3.7 + Math.sin(angle) * 2.29, .12)
    }
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (root.current) root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.14) * 0.025) * weight
    rings.current.forEach((ring, index) => {
      if (!ring) return
      if (!reducedMotion) ring.rotation.y = [0, -.48, .3, -.22, .18][index] + Math.sin(time * .12 + index) * .087
      const starts = [0, .18, .36, .56, .78, 1]
      const active = getLocalProgress(local, [starts[index], starts[index + 1]])
      ring.scale.setScalar(1 + active * 0.025)
      if (ringMaterials.current[index]) ringMaterials.current[index]!.emissiveIntensity = index === 2 ? .12 + active * .24 : .02
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
        <mesh key={`process-ring-${index}`} ref={(node) => { rings.current[index] = node }} rotation={[[.12, -.4, .38, -.18, .08][index], [0, -.48, .3, -.22, .18][index], index * .06]} position={[0, 3.7, index * -.16]}>
          <torusGeometry args={[1.25 + index * 0.52, .07 + (index === 2 ? .025 : 0), 12, 120]} />
          <meshStandardMaterial ref={(material) => { ringMaterials.current[index] = material }} color={index === 2 ? '#b39a73' : '#748087'} emissive={index === 2 ? COLORS.goldDark : '#142b32'} emissiveIntensity={.12} metalness={0.72} roughness={0.28} />
        </mesh>
      ))}
      <mesh position={[0, 3.7, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 6.7, 8]} />
        <meshStandardMaterial color={COLORS.steel} metalness={0.72} roughness={0.38} />
      </mesh>
      {nodePositions.map((nodePosition, index) => (
        <mesh key={`process-node-${index}`} ref={(node) => { nodes.current[index] = node }} position={nodePosition}>
          <sphereGeometry args={[index === 2 ? .32 : .22, 20, 14]} />
          <meshStandardMaterial color={index === 0 ? COLORS.gold : COLORS.ivory} emissive={index === 0 ? COLORS.goldDark : '#2d322c'} emissiveIntensity={0.3} metalness={0.42} roughness={0.4} />
        </mesh>
      ))}
      {nodePositions.map((nodePosition, index) => <Connector key={`process-connector-${index}`} end={nodePosition} color="#6a7f83" />)}
      <mesh ref={pulse}><sphereGeometry args={[.065, 12, 8]} /><meshBasicMaterial color="#ffdf9f" toneMapped={false} /></mesh>
      <mesh position={[0, .09, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[8, 8]} /><shaderMaterial transparent depthWrite={false} vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv;void main(){float a=exp(-length(vUv-.5)*8.)*.5;gl_FragColor=vec4(.01,.025,.03,a);}" /></mesh>
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
