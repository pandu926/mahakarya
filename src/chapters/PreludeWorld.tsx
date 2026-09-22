import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { createSeededRandom, getLocalProgress, journeyRuntime } from '../experience/runtime'
import { Human, Instances, StoneMaterial, type InstanceSpec } from './geometry'

export function PreludeWorld({ position, chapter, reducedMotion = false }: ChapterWorldProps) {
  const energy = useRef<THREE.ShaderMaterial>(null)
  const ring = useRef<THREE.Group>(null)
  const slab = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1, 5, 18, 3)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i)
      p.setZ(i, z + Math.sin(x * 27 + y * 31) * .025)
    }
    g.computeVertexNormals()
    return g
  }, [])
  const plates = useMemo<InstanceSpec[]>(() => Array.from({ length: 12 }, (_, i) => ({ position: [(i < 6 ? -1 : 1) * 2.12, .85 + (i % 6) * 1.85, .51], scale: [1.84, 1.78, .08], color: i % 3 === 0 ? '#30373a' : '#1d252c' })), [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uStrength: { value: 1 } }), [])
  const stardust = useMemo(() => {
    const random = createSeededRandom(1107)
    const points = new Float32Array(900 * 3)
    for (let i = 0; i < 900; i++) {
      const angle = random() * Math.PI * 2
      const radius = .3 + Math.pow(random(), .4) * .7
      points[i * 3] = Math.cos(angle) * radius
      points[i * 3 + 1] = 5.7 + Math.sin(angle) * radius * 5
      points[i * 3 + 2] = .1 + random() * .03
    }
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(points, 3))
  }, [])
  useEffect(() => () => { slab.dispose(); stardust.dispose() }, [slab, stardust])
  useFrame(({ clock }) => {
    const local = getLocalProgress(journeyRuntime.progress, chapter.range)
    if (energy.current) {
      uniforms.uTime.value = reducedMotion ? 0 : clock.elapsedTime
      uniforms.uStrength.value = 1 - local * .55
    }
    if (ring.current) ring.current.rotation.z = reducedMotion ? 0 : local * Math.PI / 15
  })
  return <group position={[...position]} name="PreludePortal">
    <mesh geometry={slab} position={[-2.1, 5.75, 0]} scale={[2.1, 11.5, 1]}><StoneMaterial color="#343b40" roughness={.82} metalness={.04} /></mesh>
    <mesh geometry={slab} position={[2.1, 6.1, 0]} scale={[2.1, 12.2, 1]}><StoneMaterial color="#2b343b" roughness={.84} metalness={.04} /></mesh>
    <Instances geometry={slab} items={plates} stone />
    <mesh position={[0, 5.7, -.12]}><planeGeometry args={[2.12, 11.4]} /><meshBasicMaterial color="#111d29" /></mesh>
    <points geometry={stardust}><pointsMaterial color="#c7dceb" size={.015} transparent opacity={.7} depthWrite={false} /></points>
    <group ref={ring} position={[0, 5.7, .09]}>
      {[1.05, 1.13, 1.32, 1.7, 1.91, 2.02].map((r, i) => <mesh key={r} scale={[.5, 1.9, 1]} rotation={[0, 0, i * .035]}><torusGeometry args={[r, i === 2 ? .013 : .005, 5, 100]} /><meshBasicMaterial color={i % 2 ? '#aac7dc' : '#e7b86b'} transparent opacity={.22 + i * .035} /></mesh>)}
    </group>
    <mesh position={[0, 5.7, .17]}>
      <planeGeometry args={[1.05, 11.4]} />
      <shaderMaterial ref={energy} transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={uniforms} vertexShader="varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv; uniform float uTime; uniform float uStrength; void main(){float d=abs(vUv.x-.5); float core=exp(-d*42.); float halo=exp(-d*8.)*.36; float flicker=.95+.05*sin(vUv.y*26.-uTime*.7); vec3 c=mix(vec3(1.,.58,.19),vec3(1.,.98,.88),core); gl_FragColor=vec4(c,(core+halo)*uStrength*flicker);}" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.03, 5]}><planeGeometry args={[4.5, 10]} /><shaderMaterial transparent depthWrite={false} uniforms={uniforms} vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv; uniform float uTime; void main(){float ripple=sin(vUv.y*340.+sin(vUv.x*53.))* .04; float d=abs(vUv.x-.5+ripple);float light=exp(-d*23.);float fade=pow(vUv.y,1.4);gl_FragColor=vec4(1.,.85,.62,light*fade*.6);}" /></mesh>
    <Human position={[.1, 0, 2.4]} scale={1.65} />
  </group>
}
