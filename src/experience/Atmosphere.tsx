import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { QualityTier } from './types'
import { createPointsGeometry, createSeededRandom, journeyRuntime } from './runtime'
import { Instances, rockGeometry, type InstanceSpec } from '../chapters/geometry'

const vertex = 'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}'
const noise = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=noise(p)*a;p=p*2.03+1.7;a*=.5;}return v;}
`

export function Atmosphere({ qualityTier, reducedMotion = false }: { qualityTier: QualityTier; reducedMotion?: boolean }) {
  const geometry = useMemo(() => createPointsGeometry(qualityTier === 'low' ? 220 : 650, 1107, { x: 165, y: 25, z: 22, yBase: 4 }), [qualityTier])
  const rock = useMemo(() => rockGeometry(773, 2), [])
  const terrain = useMemo<InstanceSpec[]>(() => {
    const r = createSeededRandom(3301)
    return Array.from({ length: 75 }, (_, i) => {
      const x = -22 + i * 2.35
      const horizon = x > 99 && x < 141
      return { position: [x, -2 + r() * 1.5, -20 - r() * 17], scale: [2.5 + r() * 5, horizon ? 1 + r() * 2 : 3 + r() * 7, 2.5 + r() * 3], rotation: [r() * .3, r() * 3, r() * .3], color: ['#354650', '#293840', '#465760'][i % 3] }
    })
  }, [])
  const floaters = useMemo<InstanceSpec[]>(() => {
    const r = createSeededRandom(7711)
    return Array.from({ length: qualityTier === 'low' ? 12 : 36 }, (_, i) => { const s = .2 + r() * .6; return { position: [i * 4 - 5, 4 + r() * 8, -3 - r() * 7], scale: [s, s * 1.8, s * .7], rotation: [r(), r(), r()], color: '#485057' } })
  }, [qualityTier])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uWarm: { value: 0 } }), [])
  useEffect(() => () => { geometry.dispose(); rock.dispose() }, [geometry, rock])
  useFrame(({ clock }) => {
    uniforms.uTime.value = reducedMotion || journeyRuntime.progress >= .985 ? 0 : clock.elapsedTime * .008
    uniforms.uWarm.value = THREE.MathUtils.smoothstep(journeyRuntime.progress, .79, 1)
  })
  return <group name="AtmosphericLandscape">
    <mesh position={[58, 14, -45]}><planeGeometry args={[230, 90]} /><shaderMaterial depthWrite={false} uniforms={uniforms} vertexShader={vertex} fragmentShader={`varying vec2 vUv; uniform float uWarm; ${noise} void main(){float horizon=exp(-pow((vUv.y-.33)*5.,2.)); float cloud=fbm(vUv*vec2(24.,12.)); vec3 sky=mix(vec3(.022,.045,.068),vec3(.23,.30,.35),horizon*(.5+cloud*.5)); sky=mix(sky,vec3(.41,.33,.23),uWarm*horizon*.4); gl_FragColor=vec4(sky,1.);}`} /></mesh>
    <Instances geometry={rock} items={terrain} stone />
    <Instances geometry={rock} items={floaters} stone />
    {[[-58, -15], [0, -9], [58, -13], [116, -10]].map(([x, z], i) => <mesh key={i} position={[x, .9, z]}><planeGeometry args={[68, 9]} /><shaderMaterial transparent depthWrite={false} uniforms={uniforms} vertexShader={vertex} fragmentShader={`varying vec2 vUv; uniform float uTime; ${noise} void main(){float n=fbm(vUv*vec2(15.,4.)+vec2(uTime,0.)); float edge=pow(sin(vUv.y*3.14159),2.)*smoothstep(0.,.12,vUv.x)*smoothstep(0.,.12,1.-vUv.x); float a=smoothstep(.22,.75,n)*edge*.65;gl_FragColor=vec4(.39,.46,.51,a);}`} /></mesh>)}
    <points geometry={geometry} position={[54, 0, -8]}><pointsMaterial color="#b7c6ce" size={.018} transparent opacity={.42} depthWrite={false} /></points>
  </group>
}

export function WorldGround() {
  const material = useMemo(() => {
    const surface = new THREE.MeshStandardMaterial({ color: '#293943', roughness: .78, metalness: .14 })
    surface.onBeforeCompile = shader => {
      shader.vertexShader = 'varying vec2 vFloor;\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvFloor = uv * vec2(190.,50.);')
      shader.fragmentShader = 'varying vec2 vFloor;\n' + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\nvec2 joint=abs(fract(vFloor/2.4)-.5);float seam=smoothstep(.492,.5,max(joint.x,joint.y));float grain=fract(sin(dot(floor(vFloor*120.),vec2(12.9898,78.233)))*43758.5453);diffuseColor.rgb *= .83+grain*.15-seam*.25;')
    }
    return surface
  }, [])
  useEffect(() => () => material.dispose(), [material])
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[58, -.12, 1]} receiveShadow name="MuseumFloor"><planeGeometry args={[190, 50, 1, 1]} /><primitive object={material} attach="material" /></mesh>
}
