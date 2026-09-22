import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ChapterWorldProps } from '../experience/types'
import { journeyRuntime } from '../experience/runtime'
import { City, Human } from './geometry'

export function FutureWorld({ position, qualityTier }: ChapterWorldProps) {
  const uniforms = useMemo(() => ({ uProgress: { value: 0 } }), [])
  useFrame(() => { uniforms.uProgress.value = Math.max(0, (journeyRuntime.progress - .79) / .21) })
  return <group position={[...position]} name="FutureGateCity">
    <City seed={6607} count={qualityTier === 'low' ? 30 : 75} width={21} depth={11} height={6} />
    {[-3.4, 3.4].map(x => <group key={x} position={[x, 4.6, 0]}>
      <mesh><boxGeometry args={[.48, 9.2, .8]} /><meshStandardMaterial color="#657179" metalness={.38} roughness={.65} /></mesh>
      <mesh position={[x > 0 ? -.25 : .25, 0, .12]}><boxGeometry args={[.022, 9.1, .45]} /><meshBasicMaterial color="#ffdfae" /></mesh>
      {[0, 1, 2, 3, 4].map(i => <mesh key={i} position={[0, -4 + i * 1.9, .42]}><boxGeometry args={[.5, .035, .035]} /><meshStandardMaterial color="#b0a38d" metalness={.5} roughness={.5} /></mesh>)}
    </group>)}
    <mesh position={[0, 9.1, 0]}><boxGeometry args={[7.2, .35, .8]} /><meshStandardMaterial color="#69767d" metalness={.4} roughness={.6} /></mesh>
    <mesh position={[2, 5.7, -15]}><circleGeometry args={[3.2, 80]} /><meshBasicMaterial color="#fff4db" toneMapped={false} fog={false} /></mesh>
    <mesh position={[2, 5.7, -14.9]}><planeGeometry args={[24, 24]} /><shaderMaterial transparent depthWrite={false} uniforms={uniforms} vertexShader="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying vec2 vUv;uniform float uProgress;void main(){float d=length(vUv-.5)*2.;float halo=exp(-d*5.)*(.4+uProgress*.3);gl_FragColor=vec4(1.,.69,.33,halo);}" /></mesh>
    {[-2, 2].map(x => <mesh key={x} position={[x, -.06, 1.8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.025, 16]} /><meshBasicMaterial color="#b18d51" transparent opacity={.6} /></mesh>)}
    <Human position={[.3, .02, 2.9]} />
  </group>
}
