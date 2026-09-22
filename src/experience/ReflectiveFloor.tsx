import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { useFrame } from '@react-three/fiber'
import { journeyRuntime } from './runtime'
import type { QualityTier } from './types'

// One low-resolution planar reflection, rippled and blended with dark stone.
// Low-tier devices use the unreflected floor underneath.
export function ReflectiveFloor({ qualityTier }: { qualityTier: QualityTier }) {
  const mirror = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(28, 30)
    const reflector = new Reflector(geometry, {
      textureWidth: qualityTier === 'high' ? 1024 : 512,
      textureHeight: qualityTier === 'high' ? 512 : 256,
      multisample: 0,
      clipBias: .003,
      color: '#071018',
    })
    const material = reflector.material as THREE.ShaderMaterial
    material.vertexShader = material.vertexShader
      .replace('varying vec4 vUv;', 'varying vec4 vUv; varying vec2 vStoneUv;')
      .replace('void main() {', 'void main() { vStoneUv = uv * vec2(28.,30.);')
    material.fragmentShader = `
      uniform sampler2D tDiffuse;
      varying vec4 vUv;
      varying vec2 vStoneUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){
        vec2 p=vStoneUv;
        vec2 uv=vUv.xy/vUv.w;
        float ripple=sin(p.y*36.+sin(p.x*17.))*sin(p.y*11.+p.x*3.);
        uv.x+=ripple*.0015;
        vec3 reflection=texture2D(tDiffuse,uv).rgb*.5;
        reflection+=texture2D(tDiffuse,uv+vec2(.0015,.0005)).rgb*.25;
        reflection+=texture2D(tDiffuse,uv-vec2(.0015,.0005)).rgb*.25;
        float grain=hash(floor(p*170.));
        float border=smoothstep(0.,3.,min(min(p.x,28.-p.x),min(p.y,30.-p.y)));
        float wet=border*(.10+.14*pow(.5+.5*sin(p.x*1.3+sin(p.y*.8)),2.));
        vec2 grid=abs(fract(p/3.)-.5);
        float joints=smoothstep(.496,.5,max(grid.x,grid.y));
        vec3 stone=vec3(.012,.023,.031)*(.85+grain*.15-joints*.4);
        gl_FragColor=vec4(stone+reflection*wet,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
    reflector.rotation.x = -Math.PI / 2
    reflector.position.set(0, -.10, 8)
    reflector.name = 'WetStoneReflection'
    return reflector
  }, [qualityTier])
  useFrame(() => { mirror.visible = qualityTier === 'high' && journeyRuntime.progress < .18 })
  useEffect(() => () => { mirror.geometry.dispose(); mirror.dispose() }, [mirror])
  return qualityTier !== 'high' ? null : <primitive object={mirror} />
}
