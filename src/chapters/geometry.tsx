import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { createSeededRandom } from '../experience/runtime'

export function rockGeometry(seed: number, detail = 5) {
  const base = new THREE.IcosahedronGeometry(1, Math.max(5, detail))
  base.deleteAttribute('normal')
  base.deleteAttribute('uv')
  const geometry = mergeVertices(base)
  base.dispose()
  const positions = geometry.attributes.position
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i)
    const n = Math.sin(x * 7.1 + seed) * Math.cos(y * 5.3 - seed) * Math.sin(z * 6.7 + seed * .3)
    const broad = Math.sin(x * 2.3 + y * 3.7 + seed) * .12
    const radius = 1 + n * .14 + broad
    positions.setXYZ(i, x * radius, y * radius, z * radius)
  }
  geometry.computeVertexNormals()
  return geometry
}

export function StoneMaterial({ color = '#343e44', roughness = .84, metalness = .08, emissive = '#000000' }: { color?: string; roughness?: number; metalness?: number; emissive?: string }) {
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity: .3 })
    m.onBeforeCompile = shader => {
      shader.vertexShader = 'varying vec3 vStone;\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvStone = position;')
      shader.fragmentShader = 'varying vec3 vStone;\nfloat mineral(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}\n' + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\nfloat grain=mineral(floor(vStone*180.)); float vein=pow(abs(sin(vStone.x*42.+sin(vStone.y*31.)+vStone.z*18.)),12.); diffuseColor.rgb *= .72 + grain*.25 + vein*.15;')
    }
    return m
  }, [color, roughness, metalness, emissive])
  useEffect(() => () => material.dispose(), [material])
  return <primitive object={material} attach="material" />
}

export interface InstanceSpec { position: [number, number, number]; scale: [number, number, number]; rotation?: [number, number, number]; color?: string }

export function Instances({ geometry, items, color = '#343e44', roughness = .84, metalness = .08, emissive = '#000000', stone = false }: { geometry: THREE.BufferGeometry; items: readonly InstanceSpec[]; color?: string; roughness?: number; metalness?: number; emissive?: string; stone?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const transform = new THREE.Object3D()
    const tint = new THREE.Color()
    items.forEach((item, i) => {
      transform.position.set(...item.position)
      transform.scale.set(...item.scale)
      transform.rotation.set(...(item.rotation ?? [0, 0, 0]))
      transform.updateMatrix()
      ref.current?.setMatrixAt(i, transform.matrix)
      ref.current?.setColorAt(i, tint.set(item.color ?? color))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
    ref.current.computeBoundingSphere()
  }, [items, color])
  return <instancedMesh ref={ref} args={[geometry, undefined, items.length]} frustumCulled={false}>{stone ? <StoneMaterial color="white" roughness={roughness} metalness={metalness} emissive={emissive} /> : <meshStandardMaterial color="white" roughness={roughness} metalness={metalness} emissive={emissive} emissiveIntensity={.3} />}</instancedMesh>
}

export function Human({ position = [0, 0, 2], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const geometry = useMemo(() => {
    const parts: THREE.BufferGeometry[] = []
    parts.push(new THREE.SphereGeometry(.09, 10, 8).translate(0, .76, 0))
    parts.push(new THREE.CylinderGeometry(.1, .16, .37, 7).translate(0, .47, 0))
    for (const side of [-1, 1]) {
      parts.push(new THREE.CylinderGeometry(.035, .03, .32, 6).rotateZ(side * .12).translate(side * .065, .16, 0))
      parts.push(new THREE.CylinderGeometry(.032, .027, .34, 6).rotateZ(side * .19).translate(side * .145, .46, 0))
    }
    const merged = mergeGeometries(parts)
    parts.forEach(p => p.dispose())
    return merged
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <mesh geometry={geometry} position={position} scale={scale}><meshStandardMaterial color="#080b0e" roughness={.95} /></mesh>
}

export function City({ seed, count, width = 16, depth = 8, height = 6 }: { seed: number; count: number; width?: number; depth?: number; height?: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const buildings = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: count }, (): InstanceSpec => {
      const x = (random() - .5) * width
      const h = .7 + random() * height * (1 - Math.abs(x) / width)
      return { position: [x, h / 2, -3 - random() * depth], scale: [.2 + random() * .65, h, .3 + random() * .7], color: ['#37464d', '#27343b', '#53616a'][Math.floor(random() * 3)] }
    })
  }, [seed, count, width, depth, height])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <Instances geometry={geometry} items={buildings} />
}
