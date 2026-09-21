import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { journeyRuntime } from './runtime'

const CAMERA_POINTS = [
  [-8, 3.4, 12],
  [4, 3.1, 10],
  [22, 4.2, 11],
  [43, 3.6, 10],
  [67, 4.5, 12],
  [92, 3.2, 11],
  [116, 4.8, 13],
] as const

const TARGET_POINTS = [
  [0, 2.4, 0],
  [22, 2.8, 0],
  [44, 2.4, 0],
  [68, 2.6, 0],
  [92, 2.2, 0],
  [120, 3, 0],
] as const

export function CameraRig({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { camera } = useThree()
  const cameraCurve = useMemo(() => new THREE.CatmullRomCurve3(CAMERA_POINTS.map((point) => new THREE.Vector3(...point)), false, 'catmullrom', 0.42), [])
  const targetCurve = useMemo(() => new THREE.CatmullRomCurve3(TARGET_POINTS.map((point) => new THREE.Vector3(...point)), false, 'catmullrom', 0.42), [])
  const cameraPosition = useMemo(() => new THREE.Vector3(), [])
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])
  const currentProgress = useMemo(() => ({ value: journeyRuntime.progress }), [])

  useFrame((_, delta) => {
    const targetProgress = journeyRuntime.progress
    const factor = reducedMotion ? 1 : 1 - Math.exp(-delta * (journeyRuntime.velocity ? 8.5 : 6.5))
    currentProgress.value = THREE.MathUtils.lerp(currentProgress.value, targetProgress, factor)
    cameraCurve.getPointAt(currentProgress.value, cameraPosition)
    targetCurve.getPointAt(currentProgress.value, targetPosition)
    const pointerX = reducedMotion ? 0 : journeyRuntime.pointerX
    const pointerY = reducedMotion ? 0 : journeyRuntime.pointerY
    cameraPosition.x += pointerX * 0.16
    cameraPosition.y += pointerY * -0.1
    targetPosition.x += pointerX * 0.6
    targetPosition.y += pointerY * -0.26
    camera.position.lerp(cameraPosition, reducedMotion ? 1 : 1 - Math.exp(-delta * 7.5))
    look.lerp(targetPosition, reducedMotion ? 1 : 1 - Math.exp(-delta * 6.5))
    camera.lookAt(look)
  })

  return null
}

export { CAMERA_POINTS, TARGET_POINTS }
