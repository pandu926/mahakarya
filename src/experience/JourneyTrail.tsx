import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
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
    float reveal = .2 + .8 * (1.0 - smoothstep(uProgress + .08, uProgress + .12, vAlong));
    float leading = 1.0 + 0.55 * exp(-abs(vAlong - uProgress) * 80.0);
    float pulse = 0.9 + 0.1 * sin(uTime * 2.0 + vAlong * 18.0);
    gl_FragColor = vec4(2.4, 1.65, .78, reveal * uOpacity * leading * pulse);
  }
`

export function JourneyTrail({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const core = useRef<THREE.ShaderMaterial>(null)
  const halo = useRef<THREE.ShaderMaterial>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    [[-10,.12,13],[-2,.12,6],[0,.14,2],[7,.18,4],[17,.3,3],[21,1.1,2],[25,.5,1],[34,.2,4],[44,.2,4],[54,.3,2],[68,.3,4],[80,.22,3],[92,.2,4],[104,.22,3],[118,.2,1],[131,.2,-8]].map(p => new THREE.Vector3(...p)),
    false,
    'catmullrom',
    0.42,
  ), [])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 720, 0.032, 6, false), [curve])
  const haloGeometry = useMemo(() => new THREE.TubeGeometry(curve, 720, 0.10, 6, false), [curve])
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
    if (halo.current) halo.current.uniforms.uOpacity.value = 0.08 + Math.min(Math.abs(journeyRuntime.velocity) * 0.025, 0.04)
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
