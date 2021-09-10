import { skypin } from 'skypin'
import { Options } from '../types'

export async function generateValidUrls(options: Options): Promise<Map<String, String>> {
  const map = new Map<String, String>()

  for (const id of options.packages) {
    const replace = options.replace(id)

    if (replace) {
      map.set(id, await skypin(typeof replace === 'string' ? replace : id, {
        min: options.minified,
        pin: options.pinned,
      }))
    }
  }

  return map
}
