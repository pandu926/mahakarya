import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { QualityTier } from './types'
import { createPointsGeometry } from './runtime'
import { COLORS } from '../chapters/shared'

export function Atmosphere({ qualityTier, reducedMotion = false }: { qualityTier: QualityTier; reducedMotion?: boolean }) {
  const points = useRef<THREE.Points>(null)
  const profile = qualityTier === 'low' ? 240 : qualityTier === 'medium' ? 480 : 760
  const geometry = useMemo(() => createPointsGeometry(profile, 1337, { x: 148, y: 11.2, z: 17, yBase: 0.2 }), [profile])
  const material = useMemo(() => new THREE.PointsMaterial({
    color: '#8da3a4',
    size: qualityTier === 'low' ? 0.035 : 0.045,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    sizeAttenuation: true,
  }), [qualityTier])

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += delta * 0.0035
    points.current.position.y = Math.sin(performance.now() * 0.00012) * 0.035
  })

  return <points ref={points} geometry={geometry} material={material} name="SeededAtmosphere" position={[54, 0, -2]} />
}

export function WorldGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[58, -0.12, 0]} receiveShadow name="MuseumFloor">
        <planeGeometry args={[154, 22]} />
        <meshStandardMaterial color={COLORS.night} roughness={0.88} metalness={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[58, -0.105, 1.2]}>
        <planeGeometry args={[150, 0.12]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  )
}
