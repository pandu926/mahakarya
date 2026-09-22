import { describe, expect, it } from 'vitest'
import { rockGeometry } from '../src/chapters/geometry'

describe('procedural rock quality budget', () => {
  it('honors low detail for mobile instead of forcing the desktop mesh', () => {
    const low = rockGeometry(1107, 3)
    const high = rockGeometry(1107, 8)
    try {
      expect(low.index!.count / 3).toBeLessThan(500)
      expect(low.index!.count).toBeLessThan(high.index!.count / 3)
    } finally { low.dispose(); high.dispose() }
  })
  it('rebuilds identical geometry for the same seed', () => {
    const first = rockGeometry(2203, 4), second = rockGeometry(2203, 4)
    try { expect(first.attributes.position.array).toEqual(second.attributes.position.array) }
    finally { first.dispose(); second.dispose() }
  })
})
