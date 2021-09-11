import { resolve } from 'path'
import fs from 'fs-extra'

const r = (...args: string[]) => resolve(__dirname, '../dist', ...args)

async function performTest(file: string) {
  const content = await fs.readFile(r(file), 'utf-8')
  // expect(content).toContain('\'hueman\'')
  expect(content).toContain('https://cdn.skypack.dev/pin/hueman@v2.1.3-5b8y8npx5feiJPqgqL57/mode=imports,min/optimized/hueman.js')
}

describe('inject skypack', () => {
  it('vite', async() => performTest('vite/index.js.es.js'))
  it('rollup', async() => performTest('rollup/index.js'))
  // it('webpack', async() => performTest('webpack/index.js'))
})
