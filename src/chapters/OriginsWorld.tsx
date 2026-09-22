import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { ChapterWorldProps } from '../experience/types'
import { createSeededRandom, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { Instances, StoneMaterial, rockGeometry, type InstanceSpec } from './geometry'

function treeGeometry() {
  const random = createSeededRandom(2203)
  const parts: THREE.BufferGeometry[] = []
  const tips: THREE.Vector3[] = []
  const up = new THREE.Vector3(0, 1, 0)
  function branch(start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number) {
    const end = start.clone().addScaledVector(direction, length)
    const g = new THREE.CylinderGeometry(radius * .57, radius, length, 7)
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, direction))
    g.translate(...start.clone().add(end).multiplyScalar(.5).toArray())
    parts.push(g)
    if (depth === 0) { tips.push(end); return }
    for (let i = 0; i < 3; i++) {
      const angle = i * Math.PI * 2 / 3 + random()
      const next = new THREE.Vector3(Math.cos(angle) * .7, .55 + random() * .35, Math.sin(angle) * .7).addScaledVector(direction, .45).normalize()
      branch(end, next, length * .62, radius * .53, depth - 1)
    }
  }
  branch(new THREE.Vector3(), new THREE.Vector3(.12, 1, .05).normalize(), 1.5, .2, 3)
  const geometry = mergeGeometries(parts)
  parts.forEach(p => p.dispose())
  return { geometry, tips }
}

export function OriginsWorld({ chapter, position, qualityTier, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const rock = useMemo(() => rockGeometry(2203, 8), [])
  const island = useMemo(() => {
    const geometry = rockGeometry(2203, 9)
    const p = geometry.attributes.position
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i)
      const taper = y < 0 ? .55 + (y + 1) * .45 : 1
      p.setXYZ(i, p.getX(i) * taper, Math.min(.5, y), p.getZ(i) * taper)
    }
    geometry.computeVertexNormals()
    return geometry
  }, [])
  const tree = useMemo(treeGeometry, [])
  const canopy = useMemo<InstanceSpec[]>(() => tree.tips.filter((_, i) => i % 2 === 0).map((tip, i) => ({ position: tip.toArray() as [number, number, number], scale: [.48 + i % 2 * .12, .42 + i % 3 * .09, .5], color: ['#777668', '#8e8775', '#646e60'][i % 3] })), [tree])
  const fragments = useMemo<InstanceSpec[]>(() => {
    const random = createSeededRandom(2204)
    return Array.from({ length: qualityTier === 'low' ? 8 : 16 }, (_, i) => {
      const a = i * 2.399
      const r = 3.5 + random() * 1.7
      const s = .12 + random() * .35
      return { position: [Math.cos(a) * r, 1.8 + random() * 4, Math.sin(a) * r * .5], scale: [s, s * 1.8, s * .7], rotation: [random(), random(), random()] }
    })
  }, [qualityTier])
  useEffect(() => () => { rock.dispose(); island.dispose(); tree.geometry.dispose() }, [rock, island, tree])
  useFrame(({ clock }) => {
    if (root.current) root.current.position.y = position[1] + (reducedMotion ? 0 : Math.sin(clock.elapsedTime * .4) * .08 * getSectionWeight(journeyRuntime.progress, chapter.range))
  })
  return <group position={[...position]} name="OriginsFloatingIsland">
    <group ref={root}>
      <mesh geometry={island} position={[0, 2.1, 0]} scale={[2.8, 1.7, 2]}><StoneMaterial color="#596168" roughness={.94} /></mesh>
      <mesh geometry={island} position={[0, 2.95, 0]} scale={[2.65, .15, 1.9]}><StoneMaterial color="#656357" roughness={.98} /></mesh>
      <group position={[0, 3.1, 0]}>
        <mesh geometry={tree.geometry}><meshStandardMaterial color="#514537" roughness={.94} /></mesh>
        <Instances geometry={rock} items={canopy} />
      </group>
    </group>
    <Instances geometry={rock} items={fragments} color="#49545b" />
  </group>
}
