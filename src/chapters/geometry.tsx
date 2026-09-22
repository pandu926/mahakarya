import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { createSeededRandom } from '../experience/runtime'
import { useStoneTexture } from './StoneTexture'

export function rockGeometry(seed: number, detail = 5) {
  const base = new THREE.IcosahedronGeometry(1, Math.max(8, detail))
  base.deleteAttribute('normal')
  base.deleteAttribute('uv')
  const geometry = mergeVertices(base)
  base.dispose()
  const positions = geometry.attributes.position
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i)
    // Fractured ridges at several scales instead of smooth, inflated blobs.
    const broad = Math.sin(x * 3.3 + y * 2.7 + seed) * Math.cos(z * 3.1 - seed)
    const ridge = 1 - Math.abs(Math.sin(x * 11.1 + z * 8.7 + seed) * Math.cos(y * 4.3 - seed))
    const detailNoise = Math.sin(x * 39. + y * 17. + seed) * Math.cos(z * 31. - y * 9.)
    const radius = .88 + broad * .13 + ridge * .2 + detailNoise * .055
    positions.setXYZ(i, x * radius, y * radius, z * radius)
  }
  geometry.computeVertexNormals()
  return geometry
}

export function StoneMaterial({ color = '#343e44', roughness = .84, metalness = .08, emissive = '#000000' }: { color?: string; roughness?: number; metalness?: number; emissive?: string }) {
  const textures = useStoneTexture()
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity: .3 })
    m.onBeforeCompile = shader => {
      shader.uniforms.uBasalt = textures.uBasalt
      shader.uniforms.uBasaltReady = textures.uBasaltReady
      shader.vertexShader = 'varying vec3 vStone;\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        vec4 stonePosition=vec4(position,1.);
        #ifdef USE_INSTANCING
          stonePosition=instanceMatrix*stonePosition;
        #endif
        vStone=(modelMatrix*stonePosition).xyz;
      `)
      shader.fragmentShader = `varying vec3 vStone; uniform sampler2D uBasalt; uniform float uBasaltReady;
        float mineral(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
        float strata(vec3 p){return sin(p.x*13.+sin(p.y*7.)*2.+p.z*11.)*.5+sin(p.y*21.+p.z*5.)*.15;}
      ` + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        float grain=mineral(floor(vStone*180.)); float vein=pow(abs(strata(vStone)),3.);
        vec3 blend=abs(normalize(cross(dFdx(vStone),dFdy(vStone))));
        blend=pow(blend,vec3(4.)); blend/=max(dot(blend,vec3(1.)),.001);
        vec3 mineralColor=texture2D(uBasalt,vStone.yz*.32).rgb*blend.x
          +texture2D(uBasalt,vStone.xz*.32).rgb*blend.y
          +texture2D(uBasalt,vStone.xy*.32).rgb*blend.z;
        diffuseColor.rgb *= mix(vec3(.63+grain*.19+vein*.45), mineralColor*2.8+.12,uBasaltReady);
      `)
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        float height = strata(vStone)*.003;
        vec3 dx = dFdx(-vViewPosition), dy = dFdy(-vViewPosition);
        vec3 sx = cross(dy,normal), sy = cross(normal,dx);
        float determinant=dot(dx,sx);
        normal=normalize(abs(determinant)*normal-sign(determinant)*(dFdx(height)*sx+dFdy(height)*sy));
      `)
    }
    return m
  }, [color, roughness, metalness, emissive, textures])
  useEffect(() => () => material.dispose(), [material])
  return <primitive object={material} attach="material" />
}

export interface InstanceSpec { position: [number, number, number]; scale: [number, number, number]; rotation?: [number, number, number]; color?: string }

export function Instances({ geometry, items, color = '#343e44', roughness = .84, metalness = .08, emissive = '#000000', stone = false }: { geometry: THREE.BufferGeometry; items: readonly InstanceSpec[]; color?: string; roughness?: number; metalness?: number; emissive?: string; stone?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const transform = new THREE.Object3D()
    const tint = new THREE.Color()
    items.forEach((item, i) => {
      transform.position.set(...item.position)
      transform.scale.set(...item.scale)
      transform.rotation.set(...(item.rotation ?? [0, 0, 0]))
      transform.updateMatrix()
      ref.current?.setMatrixAt(i, transform.matrix)
      ref.current?.setColorAt(i, tint.set(item.color ?? color))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
    ref.current.computeBoundingSphere()
  }, [items, color])
  return <instancedMesh ref={ref} args={[geometry, undefined, items.length]} frustumCulled={false}>{stone ? <StoneMaterial color="white" roughness={roughness} metalness={metalness} emissive={emissive} /> : <meshStandardMaterial color="white" roughness={roughness} metalness={metalness} emissive={emissive} emissiveIntensity={.3} />}</instancedMesh>
}

export function Human({ position = [0, 0, 2], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const geometry = useMemo(() => {
    const parts: THREE.BufferGeometry[] = []
    parts.push(new THREE.SphereGeometry(.09, 10, 8).translate(0, .76, 0))
    parts.push(new THREE.CylinderGeometry(.1, .16, .37, 7).translate(0, .47, 0))
    for (const side of [-1, 1]) {
      parts.push(new THREE.CylinderGeometry(.035, .03, .32, 6).rotateZ(side * .12).translate(side * .065, .16, 0))
      parts.push(new THREE.CylinderGeometry(.032, .027, .34, 6).rotateZ(side * .19).translate(side * .145, .46, 0))
    }
    const merged = mergeGeometries(parts)
    parts.forEach(p => p.dispose())
    return merged
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <mesh geometry={geometry} position={position} scale={scale}><meshStandardMaterial color="#080b0e" roughness={.95} /></mesh>
}

export function City({ seed, count, width = 16, depth = 8, height = 6 }: { seed: number; count: number; width?: number; depth?: number; height?: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const buildings = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: count }, (): InstanceSpec => {
      const x = (random() - .5) * width
      const h = .7 + random() * height * (1 - Math.abs(x) / width)
      return { position: [x, h / 2, -3 - random() * depth], scale: [.2 + random() * .65, h, .3 + random() * .7], color: ['#37464d', '#27343b', '#53616a'][Math.floor(random() * 3)] }
    })
  }, [seed, count, width, depth, height])
  const crowns = useMemo<InstanceSpec[]>(() => buildings.flatMap((building, i) => {
    const [x, y, z] = building.position, [w, h, d] = building.scale
    return [{ position: [x, y + h * .53, z], scale: [w * .62, h * .14, d * .65], color: building.color },
      ...(i % 4 === 0 ? [{ position: [x, y + h * .68, z] as [number, number, number], scale: [.035, h * .25, .035] as [number, number, number], color: '#6c7779' }] : [])]
  }), [buildings])
  const windows = useMemo<InstanceSpec[]>(() => buildings.flatMap((building, i) => {
    const [x, y, z] = building.position, [w, h, d] = building.scale
    return Array.from({ length: 4 }, (_, floor) => ({
      position: [x, y - h * .35 + floor * h * .21, z + d * .505] as [number, number, number],
      scale: [w * .68, .018, .008] as [number, number, number],
      color: (i + floor) % 7 === 0 ? '#e4c48a' : '#607783',
    }))
  }), [buildings])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <group><Instances geometry={geometry} items={buildings} metalness={.22} /><Instances geometry={geometry} items={crowns} /><Instances geometry={geometry} items={windows} emissive="#7f8b83" roughness={.5} /></group>
}
