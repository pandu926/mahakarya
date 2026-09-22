import { useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChapterWorldProps } from '../experience/types'
import { journeyRuntime } from '../experience/runtime'
import { City, Instances, rockGeometry, type InstanceSpec } from './geometry'

export function ImpactWorld({ position, qualityTier, reducedMotion = false }: ChapterWorldProps) {
  const rock = useMemo(() => rockGeometry(4409, 3), [])
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const cliffs = useMemo<InstanceSpec[]>(() => Array.from({ length: 9 }, (_, i) => ({ position: [(i - 4) * 1.6, .8 + (i % 3) * .7, -1.2 - (i % 2) * 2], scale: [1.1, 2.4 + (i % 3) * .8, 1.4], rotation: [0, i * .4, (i % 2 ? 1 : -1) * .1], color: ['#39444a', '#253039', '#4c5558'][i % 3] })), [])
  const terraces = useMemo<InstanceSpec[]>(() => Array.from({ length: 7 }, (_, i) => ({ position: [(i - 3) * 1.8, 3.3 + (i % 3) * .4, -.8], scale: [1.9, .17, 2.4], color: '#4c5353' })), [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useEffect(() => () => { rock.dispose(); box.dispose() }, [rock, box])
  useFrame(({ clock }) => { uniforms.uTime.value = reducedMotion || journeyRuntime.progress >= .985 ? 0 : clock.elapsedTime })
  return <group position={[...position]} name="ImpactCliffCity">
    <Instances geometry={rock} items={cliffs} stone />
    <Instances geometry={box} items={terraces} />
    <group position={[0, 3.6, -2]}><City seed={4409} count={qualityTier === 'low' ? 25 : 60} width={15} depth={6} height={4} /></group>
    {[-3.6, .2, 4].map((x, i) => <mesh key={x} position={[x, 1.9 + i * .15, .9]}>
      <planeGeometry args={[i === 1 ? 1.2 : .7, 4 + i * .3, 2, 12]} />
      <shaderMaterial transparent depthWrite={false} side={THREE.DoubleSide} uniforms={uniforms} vertexShader="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv;uniform float uTime;void main(){float a=sin(vUv.x*91.+sin(vUv.y*18.+uTime*1.8)*2.)*.14+.42;float edge=smoothstep(0.,.12,vUv.x)*smoothstep(0.,.12,1.-vUv.x);float flow=.7+.3*sin(vUv.y*39.+uTime*3.);float mist=smoothstep(.35,0.,vUv.y);gl_FragColor=vec4(vec3(.65,.73,.77)+mist*.1,edge*(a*flow+mist*.15));}" />
    </mesh>)}
    {[-2.7, 0, 2.7].map((x, i) => <group key={x} position={[x, 5.5 + i * .15, 1.6]} rotation={[0, -.12 + i * .12, 0]}>
      <mesh><boxGeometry args={[1.75, 2.25, .24]} /><meshStandardMaterial color="#17242c" metalness={.22} roughness={.7} /></mesh>
      <mesh position={[0, 0, .13]}><planeGeometry args={[1.52, 2]} /><meshStandardMaterial color={['#667982', '#6a7167', '#6a6054'][i]} emissive="#53636b" emissiveIntensity={.18} roughness={.8} /></mesh>
      <mesh position={[-.83, 0, .15]}><boxGeometry args={[.018, 2.15, .02]} /><meshBasicMaterial color="#e7b86b" /></mesh>
      <mesh position={[0, 0, .16]}><planeGeometry args={[1.46, 1.94]} /><shaderMaterial uniforms={{ uKind: { value: i } }} vertexShader="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv;uniform float uKind;void main(){vec2 p=vUv-.5;float line=0.;if(uKind<.5){vec2 grid=abs(fract(vUv*6.)-.5);line=1.-smoothstep(.015,.03,min(grid.x,grid.y));}else if(uKind<1.5){float ring=abs(fract(length(p)*10.)-.5);line=1.-smoothstep(.02,.05,ring);}else{vec2 q=abs(fract(vUv*4.)-.5);line=1.-smoothstep(.025,.06,abs(max(q.x,q.y)-.32));}float mask=smoothstep(.5,.15,length(p));vec3 c=mix(vec3(.06,.105,.13),vec3(.62,.48,.28),line*mask*.7);gl_FragColor=vec4(c,1.);}" /></mesh>
    </group>)}
  </group>
}
