import { isValidPackage } from '../src'

describe('valid versions are handled correctly', () => {
  it('only a letter', () => {
    expect(isValidPackage('A')).toBe(true)
  })

  it('only a number', () => {
    expect(isValidPackage('1')).toBe(true)
  })

  it('no version', () => {
    expect(isValidPackage('canvas-confetti')).toBe(true)
  })

  it('valid version string', () => {
    expect(isValidPackage('canvas-confetti@v1.4.0')).toBe(true)
  })

  it('valid semantic version', () => {
    expect(isValidPackage('canvas-confetti@1.4.0')).toBe(true)
  })

  it('valid semantic version and patch range matcher', () => {
    expect(isValidPackage('canvas-confetti@~1.4.0')).toBe(true)
  })

  it('valid semantic version and minor range matcher', () => {
    expect(isValidPackage('canvas-confetti@^1.4.0')).toBe(true)
  })

  it('scoped no version', () => {
    expect(isValidPackage('@skypack/package-check')).toBe(true)
  })

  it('scoped valid version', () => {
    expect(isValidPackage('@skypack/package-check@0.2.2')).toBe(true)
  })
})

describe('invalid versions are handled correctly', () => {
  it('empty string', () => {
    expect(isValidPackage('')).toBe(false)
  })

  it('only an at symbol', () => {
    expect(isValidPackage('@')).toBe(false)
  })

  it('empty version', () => {
    expect(isValidPackage('canvas-confetti@')).toBe(false)
  })

  it('empty package', () => {
    expect(isValidPackage('@1.4.0')).toBe(false)
  })

  it('patch range matcher on dist tag', () => {
    expect(isValidPackage('canvas-confetti@~latest')).toBe(false)
  })

  it('minor range matcher on dist tag', () => {
    expect(isValidPackage('canvas-confetti@^latest')).toBe(false)
  })

  it('version as alphanumeric string', () => {
    expect(isValidPackage('canvas-confetti@1latest')).toBe(false)
  })

  it('excess periods', () => {
    expect(isValidPackage('just.plain.wrong')).toBe(false)
  })

  it('relative path', () => {
    expect(isValidPackage('./app.js')).toBe(false)
  })

  it('esm relative path', () => {
    expect(isValidPackage('/app.js')).toBe(false)
  })

  it('esm relative path w/out file extension', () => {
    expect(isValidPackage('/app')).toBe(false)
  })

  it('web url', () => {
    expect(isValidPackage('https://example.com')).toBe(false)
  })

  it('invalid scoped no version', () => {
    expect(isValidPackage('@skypack/package-check/')).toBe(false)
  })

  it('invalid scoped valid version', () => {
    expect(isValidPackage('@skypack/package-check/@0.2.2')).toBe(false)
  })

  it('unscoped', () => {
    expect(isValidPackage('skypack/package-check')).toBe(false)
  })

  it('unscoped with version', () => {
    expect(isValidPackage('skypack/package-check@0.2.2')).toBe(false)
  })
})
