import { Options, ResolvedOptions } from '../types'
import { generateValidUrls } from './helpers'

export async function resolveOptions(options = {}): ResolvedOptions {
  const defaults: Options = {
    packages: [],
    pinned: true,
    minified: true,
    replace: () => true,
  }

  return await generateValidUrls({ ...defaults, ...options })
}
