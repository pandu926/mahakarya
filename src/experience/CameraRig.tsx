import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { journeyRuntime } from './runtime'

const STOPS = [0, .0775, .2275, .3875, .5575, .73, .895, 1]
// Fixed 38° lens: dolly closer to each landmark, never pulse the field of view.
// Paired knots keep the monument on the right of the stable editorial column.
const CAMERA_POINTS = [[7, 6.5, 28], [3, 6, 25], [18, 4.8, 15], [39, 4.8, 15], [62, 5.6, 19], [88, 4.4, 16], [113, 5.4, 19], [115, 6.2, 20]] as const
const TARGET_POINTS = [[14, 4.5, 0], [5, 4.5, 0], [17.6, 3.6, 0], [39.5, 3.6, 0], [62.5, 4.1, 0], [87.4, 3.7, 0], [112.6, 4.7, 0], [114.5, 5, -1]] as const

function splinePosition(progress: number) {
  const i = Math.max(0, Math.min(STOPS.length - 2, STOPS.findIndex((p) => p > progress) - 1))
  if (progress >= 1) return 1
  return (i + (progress - STOPS[i]) / (STOPS[i + 1] - STOPS[i])) / (STOPS.length - 1)
}

export function CameraRig({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { camera, size } = useThree()
  const curves = useMemo(() => ({
    camera: new THREE.CatmullRomCurve3(CAMERA_POINTS.map(p => new THREE.Vector3(...p)), false, 'catmullrom', .3),
    target: new THREE.CatmullRomCurve3(TARGET_POINTS.map(p => new THREE.Vector3(...p)), false, 'catmullrom', .3),
  }), [])
  const temporary = useMemo(() => ({ camera: new THREE.Vector3(), target: new THREE.Vector3(), look: new THREE.Vector3(...TARGET_POINTS[0]), initialized: false }), [])
  useFrame((_, delta) => {
    const p = splinePosition(journeyRuntime.progress)
    curves.camera.getPoint(p, temporary.camera)
    curves.target.getPoint(p, temporary.target)
    if (size.width < 768) {
      const anchors = [0, 0, 22, 44, 68, 92, 118, 118]
      const interval = p * (anchors.length - 1)
      const i = Math.min(anchors.length - 2, Math.floor(interval))
      const x = THREE.MathUtils.lerp(anchors[i], anchors[i + 1], interval - i)
      temporary.camera.set(x - 2, 7, 34)
      temporary.target.set(x, 1, 0)
    }
    if (!reducedMotion) {
      temporary.camera.x += journeyRuntime.pointerX * .16
      temporary.camera.y -= journeyRuntime.pointerY * .1
    }
    const factor = reducedMotion || !temporary.initialized ? 1 : 1 - Math.exp(-Math.min(delta, .05) * 7.5)
    camera.position.lerp(temporary.camera, factor)
    temporary.look.lerp(temporary.target, factor)
    camera.lookAt(temporary.look)
    temporary.initialized = true
  })
  return null
}
export { CAMERA_POINTS, TARGET_POINTS }
