import { Options } from '../types'

export function resolveOptions(options = {}): Options {
  const defaults: Options = {
    packages: [],
    pinned: true,
    minified: true,
    replace: () => true,
  }

  return { ...defaults, ...options }
}
