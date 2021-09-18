import { hasValidVersion } from '../../../src'

describe('valid versions are handled correctly', () => {
  it('only a letter', () => {
    expect(hasValidVersion('A')).toBe(true)
  })

  it('only a number', () => {
    expect(hasValidVersion('1')).toBe(true)
  })

  it('no version', () => {
    expect(hasValidVersion('canvas-confetti')).toBe(true)
  })

  it('valid version string', () => {
    expect(hasValidVersion('canvas-confetti@v1.4.0')).toBe(true)
  })

  it('valid semantic version', () => {
    expect(hasValidVersion('canvas-confetti@1.4.0')).toBe(true)
  })

  it('valid semantic version and patch range matcher', () => {
    expect(hasValidVersion('canvas-confetti@~1.4.0')).toBe(true)
  })

  it('valid semantic version and minor range matcher', () => {
    expect(hasValidVersion('canvas-confetti@^1.4.0')).toBe(true)
  })

  it('scoped no version', () => {
    expect(hasValidVersion('@skypack/package-check')).toBe(true)
  })

  it('scoped valid version', () => {
    expect(hasValidVersion('@skypack/package-check@0.2.2')).toBe(true)
  })
})

describe('invalid versions are handled correctly', () => {
  it('empty string', () => {
    expect(hasValidVersion('')).toBe(false)
  })

  it('only an at symbol', () => {
    expect(hasValidVersion('@')).toBe(false)
  })

  it('empty version', () => {
    expect(hasValidVersion('canvas-confetti@')).toBe(false)
  })

  it('empty package', () => {
    expect(hasValidVersion('@1.4.0')).toBe(false)
  })

  it('patch range matcher on dist tag', () => {
    expect(hasValidVersion('canvas-confetti@~latest')).toBe(false)
  })

  it('minor range matcher on dist tag', () => {
    expect(hasValidVersion('canvas-confetti@^latest')).toBe(false)
  })

  it('version as alphanumeric string', () => {
    expect(hasValidVersion('canvas-confetti@1latest')).toBe(false)
  })
})
