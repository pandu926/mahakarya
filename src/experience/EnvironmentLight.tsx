import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Small generated sky map: broad cool sky and a warm low sun provide restrained
// reflections in metal without downloading an HDRI or washing out dark stone.
export function EnvironmentLight() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const width = 256, height = 128
    const data = new Float32Array(width * height * 4)
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const u = x / width, v = y / height
      const horizon = Math.exp(-Math.pow((v - .5) * 9, 2))
      const sun = Math.exp(-Math.pow((u - .7) * 18, 2) - Math.pow((v - .56) * 15, 2))
      const softbox = Math.exp(-Math.pow((u - .24) * 9, 2) - Math.pow((v - .75) * 7, 2))
      const i = (y * width + x) * 4
      data[i] = .04 + horizon * .22 + sun * 2 + softbox * 1.2
      data[i + 1] = .065 + horizon * .29 + sun * 1.35 + softbox * 1.35
      data[i + 2] = .095 + horizon * .37 + sun * .7 + softbox * 1.6
      data[i + 3] = 1
    }
    const sky = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType)
    sky.mapping = THREE.EquirectangularReflectionMapping
    sky.needsUpdate = true
    const generator = new THREE.PMREMGenerator(gl)
    const target = generator.fromEquirectangular(sky)
    const previous = scene.environment
    const previousIntensity = scene.environmentIntensity
    scene.environment = target.texture
    scene.environmentIntensity = .65
    sky.dispose()
    generator.dispose()
    return () => {
      scene.environment = previous
      scene.environmentIntensity = previousIntensity
      target.dispose()
    }
  }, [gl, scene])
  return null
}
