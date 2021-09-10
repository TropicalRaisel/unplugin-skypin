import { skypin } from 'skypin'
import { Options, ResolvedOptions } from '../types'

export async function generateValidUrls(options: Options): Promise<ResolvedOptions> {
  const urls = new Map<String, String>()
  const resolved = options

  for (const id of options.packages) {
    const replace = options.replace(id)

    if (replace) {
      urls.set(id, await skypin(typeof replace === 'string' ? replace : id, {
        min: options.minified,
        pin: options.pinned,
      }))
    }
  }

  resolved.urls = urls
  return resolved
}
