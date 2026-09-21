import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export const COLORS = {
  night: '#071018',
  basalt: '#0b141b',
  stone: '#14242c',
  stoneLight: '#263d45',
  graphite: '#1b2d35',
  steel: '#5e777d',
  gold: '#e7b86b',
  goldDark: '#8d5620',
  ivory: '#e3d4b3',
  water: '#6d9499',
}

export function useStandardMaterial(color: string, options: THREE.MeshStandardMaterialParameters = {}) {
  return useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0.12,
    ...options,
  }), [color, options])
}

export function useLineMaterial(color = COLORS.gold, opacity = 0.65) {
  return useMemo(() => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  }), [color, opacity])
}

export function createPointsGeometry(count: number, seed: number, range: { x: number; y: number; z: number; yBase?: number }) {
  let state = seed >>> 0
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * range.x
    positions[index * 3 + 1] = (range.yBase ?? 0) + random() * range.y
    positions[index * 3 + 2] = (random() - 0.5) * range.z
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geometry
}

export function lineBetween(start: THREE.Vector3, end: THREE.Vector3, material: THREE.LineBasicMaterial) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
  geometry.dispose()
  return <Line points={[start, end]} color={material.color.getHex()} opacity={material.opacity} transparent />
}
