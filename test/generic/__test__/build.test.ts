/* import { resolve } from 'path'
import fs from 'fs-extra'

const r = (...args: string[]) => resolve(__dirname, '../dist', ...args) */

import { hasValidVersion } from '../../../src'

describe('valid versions are handled correctly', () => {
  it('package w/ no version', () => {
    expect(hasValidVersion('canvas-confetti')).toBe(true)
  })
  it('package w/ valid version', () => {
    expect(hasValidVersion('canvas-confetti@1.4.0')).toBe(true)
  })
  it('package w/ valid version and patch range matcher', () => {
    expect(hasValidVersion('canvas-confetti@~1.4.0')).toBe(true)
  })
  it('package w/ valid version and minor range matcher', () => {
    expect(hasValidVersion('canvas-confetti@^1.4.0')).toBe(true)
  })
  it('scoped package w/ no version', () => {
    expect(hasValidVersion('@skypack/package-check')).toBe(true)
  })
  it('scoped package w/ valid version', () => {
    expect(hasValidVersion('@skypack/package-check@0.2.2')).toBe(true)
  })
})

describe('invalid versions are handled correctly', () => {
  it('invalid version starting w/ "v"', () => {
    expect(hasValidVersion('canvas-confetti@v1.4.0')).toBe(false)
  })
  it('scoped package w/ invalid version', () => {
    expect(hasValidVersion('@skypack/package-check@v0.2.2')).toBe(false)
  })
  it('empty string', () => {
    expect(hasValidVersion('')).toBe(false)
  })
})
