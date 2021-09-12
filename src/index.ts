import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
// import BeautifulDom from 'beautiful-dom'
import { Options } from './types'
import { resolveOptions } from './core/options'

export default createUnplugin<Options>((options, meta) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'
  const urls = new Map<string, string>()

  return {
    name,
    enforce: 'pre',
    async buildStart() {
      for (const id of settings.packages) {
        const sub = settings.replace(id)

        if (sub) {
          urls.set(typeof sub === 'string' ? sub : id, await skypin(id, {
            min: settings.minified,
            pin: settings.pinned,
          }))
        }
      }
    },
    resolveId(id: string) {
      if (urls.has(id)) {
        const url = urls.get(id)!
        return meta.framework !== 'webpack' ? { id: url, external: true } : url
      }
      return id
    },
    transform(code: string, filename: string) {
      if (meta.framework === 'webpack' && filename.endsWith('.html')) {
        // const dom = new BeautifulDom(code)
      }
      return code
    },
  }
})
