import { resolve } from 'path'
import fs from 'fs-extra'

const r = (...args: string[]) => resolve(__dirname, '../dist', ...args)

describe('inject skypack url through rollup', () => {
  it('rollup', async() => {
    const content = await fs.readFile(r('index.js'), 'utf-8')
    expect(content).toContain('https://cdn.skypack.dev/pin/canvas-confetti@v1.4.0-POmgSMO0U5q84otJfYlN/mode=imports,min/optimized/canvas-confetti.js')
  })
})
