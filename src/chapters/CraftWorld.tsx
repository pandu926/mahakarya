import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { getLocalProgress, journeyRuntime } from '../experience/runtime'
import { Instances, type InstanceSpec } from './geometry'

function moduleBeams(index: number): InstanceSpec[] {
  const items: InstanceSpec[] = []
  const offsetX = index % 2 * 2.4 - 2.4
  const offsetY = Math.floor(index / 2) * 2.4 + 1.4
  for (let x = 0; x <= 3; x++) for (let z = 0; z <= 2; z++) {
    items.push({ position: [offsetX + x * .8, offsetY + 1.2, z * 1.2 - 1.2], scale: [.045, 2.4, .045] })
  }
  for (let y = 0; y <= 3; y++) {
    for (const z of [-1.2, 0, 1.2]) items.push({ position: [offsetX + 1.2, offsetY + y * .8, z], scale: [2.4, .045, .045] })
    for (const x of [0, .8, 1.6, 2.4]) items.push({ position: [offsetX + x, offsetY + y * .8, 0], scale: [.045, .045, 2.4] })
  }
  return items
}

export function CraftWorld({ chapter, position, reducedMotion = false }: ChapterWorldProps) {
  const groups = useRef<Array<THREE.Group | null>>([])
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const modules = useMemo(() => Array.from({ length: 4 }, (_, i) => moduleBeams(i)), [])
  const panels = useMemo<InstanceSpec[]>(() => Array.from({ length: 28 }, (_, i) => ({ position: [-2 + (i % 7) * .72, 1.8 + Math.floor(i / 7) * 1.2, i % 3 === 0 ? 1.24 : -.5], scale: [.65, 1.05, .035], color: i % 5 === 0 ? '#c4a275' : ['#242c32', '#344149', '#1c272e'][i % 3] })), [])
  const ribbon = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-3, 1, 1.5), new THREE.Vector3(-4, 2, 0), new THREE.Vector3(-2, 5.5, -1), new THREE.Vector3(2, 6.8, -.3), new THREE.Vector3(3.3, 4.5, 1.2)]), 80, .028, 6), [])
  useEffect(() => () => { box.dispose(); ribbon.dispose() }, [box, ribbon])
  useFrame(() => {
    const local = getLocalProgress(journeyRuntime.progress, chapter.range)
    const offset = reducedMotion ? 0 : Math.max(0, Math.abs(local - .6) - .15) * .8
    groups.current.forEach((group, i) => {
      if (!group) return
      group.position.x = (i % 2 ? 1 : -1) * offset
      group.position.y = (i < 2 ? -1 : 1) * offset
      group.rotation.z = (i % 2 ? -1 : 1) * offset * .2
    })
  })
  return <group position={[...position]} rotation={[0, -.24, 0]} name="CraftArchitecture">
    {modules.map((items, i) => <group key={i} ref={node => { groups.current[i] = node }}><Instances geometry={box} items={items} color="#7b7770" metalness={.55} roughness={.48} /></group>)}
    <Instances geometry={box} items={panels} metalness={.32} roughness={.64} />
    <mesh geometry={box} position={[0, 3.5, -.3]} scale={[2, 2.8, 1.5]}><meshStandardMaterial color="#d4b386" emissive="#e7b86b" emissiveIntensity={.42} roughness={.48} /></mesh>
    <mesh geometry={ribbon}><meshStandardMaterial color="#ae946c" emissive="#a87936" emissiveIntensity={.35} metalness={.65} roughness={.4} /></mesh>
    <mesh position={[0, .5, 0]}><boxGeometry args={[6.1, .16, 4]} /><meshStandardMaterial color="#252f36" roughness={.9} /></mesh>
  </group>
}
