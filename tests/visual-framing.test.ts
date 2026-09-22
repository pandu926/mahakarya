import { describe, expect, it } from 'vitest'
import { PerspectiveCamera, Vector3 } from 'three'
import { CAMERA_POINTS, TARGET_POINTS } from '../src/experience/CameraRig'

describe('desktop chapter composition', () => {
  const landmarks = [
    { index: 2, x: 22, bottom: .4, top: 6.7 },
    { index: 3, x: 44, bottom: .5, top: 6.8 },
    { index: 4, x: 68, bottom: -.5, top: 9 },
    { index: 5, x: 92, bottom: .2, top: 7.2 },
    { index: 6, x: 118, bottom: 0, top: 9.3 },
  ]
  for (const landmark of landmarks) it(`frames chapter ${landmark.index} as a dominant monument, not a distant miniature`, () => {
    const camera = new PerspectiveCamera(38, 1536 / 664, .1, 260)
    camera.position.set(...CAMERA_POINTS[landmark.index])
    camera.lookAt(new Vector3(...TARGET_POINTS[landmark.index]))
    camera.updateMatrixWorld()
    const top = new Vector3(landmark.x, landmark.top, 0).project(camera)
    const bottom = new Vector3(landmark.x, landmark.bottom, 0).project(camera)
    expect((top.y - bottom.y) / 2).toBeGreaterThan(.56)
    expect(top.y).toBeLessThan(1)
    expect(bottom.y).toBeGreaterThan(-1)
    expect(top.x).toBeGreaterThan(.18)
    expect(top.x).toBeLessThan(.72)
  })
})
