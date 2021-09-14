import { Options } from '../types'

export function resolveOptions(options = {}): Options {
  const defaults: Options = {
    packages: [],
    minify: true,
    replace: () => true,
  }

  return { ...defaults, ...options }
}
