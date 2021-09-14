import { Options } from '../types'

export function resolveOptions(options = {}): Options {
  const defaults: Options = {
    packages: [],
    skypin: {
      min: true,
      pin: true,
    },
    replace: () => true,
  }

  return { ...defaults, ...options }
}
