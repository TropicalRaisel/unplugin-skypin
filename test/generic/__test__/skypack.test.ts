import { getSkypackUrl } from '../../../src'

describe('skypack urls are properly fetched', () => {
  it('gets latest pinned url', async() => {
    expect(await getSkypackUrl('canvas-confetti')).toBe('https://cdn.skypack.dev/pin/canvas-confetti@v1.4.0-POmgSMO0U5q84otJfYlN/mode=imports,min/optimized/canvas-confetti.js')
  })
})
