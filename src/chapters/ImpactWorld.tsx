import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { createPointsGeometry, getLocalProgress, getSectionWeight, journeyRuntime } from '../experience/runtime'
import { COLORS } from './shared'

const WATERFALL_VERTEX = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.x += sin(uv.y * 13.0 + uTime * 0.5) * 0.035;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

const WATERFALL_FRAGMENT = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  void main() {
    float stream = 0.52 + 0.48 * sin(vUv.x * 29.0 + vUv.y * 5.0 - uTime * 1.8);
    float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
    float alpha = edge * (0.28 + stream * 0.24) * uOpacity;
    gl_FragColor = vec4(0.48, 0.69, 0.73, alpha);
  }
`

export function ImpactWorld({ chapter, position, qualityTier, reducedMotion = false }: ChapterWorldProps) {
  const root = useRef<THREE.Group>(null)
  const waterfall = useRef<THREE.ShaderMaterial>(null)
  const slabs = useRef<THREE.Group>(null)
  const mistGeometry = useMemo(() => createPointsGeometry(qualityTier === 'low' ? 26 : qualityTier === 'medium' ? 40 : 58, 904, { x: 3.2, y: 1.7, z: 0.6, yBase: -0.15 }), [qualityTier])
  const waterfallMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.55 } },
    vertexShader: WATERFALL_VERTEX,
    fragmentShader: WATERFALL_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [])
  const mistMaterial = useMemo(() => new THREE.PointsMaterial({
    color: COLORS.water,
    size: qualityTier === 'low' ? 0.12 : 0.16,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [qualityTier])

  useFrame(() => {
    const progress = journeyRuntime.progress
    const local = getLocalProgress(progress, chapter.range)
    const weight = getSectionWeight(progress, chapter.range)
    if (weight < 0.01) return
    const time = reducedMotion ? 0 : performance.now() * 0.001
    if (root.current) root.current.rotation.y = (reducedMotion ? 0 : Math.sin(time * 0.13) * 0.018) * weight
    if (waterfall.current) {
      waterfall.current.uniforms.uTime.value = time
      waterfall.current.uniforms.uOpacity.value = 0.26 + weight * 0.46
    }
    if (slabs.current) {
      slabs.current.children.forEach((slab, index) => {
        slab.position.y = 5.1 + index * 0.13 + (reducedMotion ? 0 : Math.sin(time * 0.52 + index) * 0.035 * weight)
        slab.rotation.z = (index - 1) * 0.045 + (reducedMotion ? 0 : Math.sin(time * 0.28 + index) * 0.008)
      })
    }
    if (mistMaterial) mistMaterial.opacity = 0.18 + weight * 0.24 + local * 0.05
  })

  const projectSlabs = useMemo(() => [
    { x: -2.4, height: 1.35, color: COLORS.steel },
    { x: 0, height: 1.59, color: COLORS.gold },
    { x: 2.35, height: 1.83, color: COLORS.steel },
  ], [])

  return (
    <group ref={root} position={[position[0], position[1], position[2]]} name="ImpactCliffsWaterfall">
      <mesh position={[0, 1.9, 0.8]} rotation={[0, 0, -0.08]} castShadow receiveShadow>
        <boxGeometry args={[8, 3.8, 2.3]} />
        <meshStandardMaterial color={COLORS.basalt} roughness={0.94} metalness={0.04} />
      </mesh>
      <mesh position={[-0.4, 3.86, 0.3]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[6.2, 0.42, 3.1]} />
        <meshStandardMaterial color={COLORS.stoneLight} roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh position={[-1.35, 1.9, -0.78]}>
        <planeGeometry args={[1.95, 4.4, 12, 16]} />
        <primitive object={waterfallMaterial} attach="material" />
      </mesh>
      <group ref={slabs}>
        {projectSlabs.map((slab, index) => (
          <mesh key={`impact-slab-${index}`} position={[slab.x, 5.1 + index * 0.13, -0.2]} castShadow>
            <boxGeometry args={[1.35, slab.height, 0.35]} />
            <meshStandardMaterial color={slab.color} emissive={index === 1 ? COLORS.goldDark : '#17252a'} emissiveIntensity={index === 1 ? 0.9 : 0.2} metalness={0.64} roughness={0.4} />
          </mesh>
        ))}
      </group>
      <points position={[-1.35, 0, -0.84]} geometry={mistGeometry} material={mistMaterial} />
      <mesh position={[0, 0.02, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#12242a" roughness={0.72} metalness={0.18} transparent opacity={0.8} />
      </mesh>
      <pointLight color={COLORS.gold} intensity={0.45} distance={13} position={[0, 4.8, 3]} />
    </group>
  )
}

export const chapterConfig = {
  id: 'impact' as const,
  number: '04',
  label: 'Impact',
  title: 'Ideas That Deliver',
  range: [0.45, 0.665] as const,
  anchor: 68,
  landmark: 'cliffs-waterfall-slabs',
}
