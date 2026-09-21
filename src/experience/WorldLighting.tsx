import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { journeyRuntime, progressToWorld } from './runtime'

export interface WorldLightingProps {
  qualityTier: 'high' | 'medium' | 'low'
  reducedMotion?: boolean
}

export function WorldLighting({ qualityTier, reducedMotion = false }: WorldLightingProps) {
  const warm = useRef<THREE.PointLight>(null)
  const key = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (warm.current) {
      warm.current.position.x = progressToWorld(journeyRuntime.progress)
      warm.current.position.y = 4.8 + (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.3) * 0.45)
      warm.current.intensity = 0.34 + journeyRuntime.progress * 0.72
    }
    if (key.current) key.current.intensity = (qualityTier === 'low' ? 0.52 : 0.72) + journeyRuntime.progress * 0.12
  })

  return (
    <>
      <hemisphereLight args={['#6d8991', '#081017', 0.28]} />
      <directionalLight ref={key} color="#adc0bf" position={[-12, 18, 12]} castShadow={qualityTier === 'high'} shadow-mapSize={[qualityTier === 'high' ? 1024 : 512, qualityTier === 'high' ? 1024 : 512]} />
      <pointLight ref={warm} color="#c88a47" position={[0, 5.2, 3.8]} intensity={0.72} distance={26} decay={2} />
    </>
  )
}

export default WorldLighting
