import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CHAPTER_POSITIONS } from '../chapters/config'
import { journeyRuntime } from './runtime'

const TRAIL_VERTEX = `
  varying float vAlong;
  void main() {
    vAlong = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const TRAIL_FRAGMENT = `
  varying float vAlong;
  uniform float uProgress;
  uniform float uTime;
  uniform float uOpacity;
  void main() {
    float reveal = 1.0 - smoothstep(uProgress - 0.014, uProgress + 0.014, vAlong);
    float leading = 1.0 + 0.55 * exp(-abs(vAlong - uProgress) * 80.0);
    float pulse = 0.9 + 0.1 * sin(uTime * 2.0 + vAlong * 18.0);
    gl_FragColor = vec4(0.91, 0.64, 0.29, reveal * uOpacity * leading * pulse);
  }
`

export function JourneyTrail({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const core = useRef<THREE.ShaderMaterial>(null)
  const halo = useRef<THREE.ShaderMaterial>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    CHAPTER_POSITIONS.map((point, index) => new THREE.Vector3(point[0], 0.18 + (index % 2) * 0.06, index === 0 ? 1.1 : 0)),
    false,
    'catmullrom',
    0.42,
  ), [])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 220, 0.038, 6, false), [curve])
  const haloGeometry = useMemo(() => new THREE.TubeGeometry(curve, 220, 0.16, 6, false), [curve])
  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uOpacity: { value: 0.88 },
  }), [])
  const haloUniforms = useMemo(() => ({
    uProgress: uniforms.uProgress,
    uTime: uniforms.uTime,
    uOpacity: { value: 0.12 },
  }), [uniforms])

  useFrame(() => {
    const time = reducedMotion ? 0 : performance.now() * 0.001
    uniforms.uProgress.value = journeyRuntime.progress
    uniforms.uTime.value = time
    if (core.current) core.current.uniforms.uOpacity.value = 0.72 + (journeyRuntime.velocity === 0 ? 0 : Math.min(Math.abs(journeyRuntime.velocity) * 0.16, 0.18))
    if (halo.current) halo.current.uniforms.uOpacity.value = 0.1 + Math.min(Math.abs(journeyRuntime.velocity) * 0.05, 0.08)
  })

  return (
    <group name="JourneyTrail">
      <mesh geometry={haloGeometry}>
        <shaderMaterial ref={halo} uniforms={haloUniforms} vertexShader={TRAIL_VERTEX} fragmentShader={TRAIL_FRAGMENT} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh geometry={geometry}>
        <shaderMaterial ref={core} uniforms={uniforms} vertexShader={TRAIL_VERTEX} fragmentShader={TRAIL_FRAGMENT} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}
