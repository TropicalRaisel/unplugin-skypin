import { createUnplugin } from 'unplugin'
import { getSkypackUrl } from '@tropicalraisel/skylib'
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
      if (urls.size === 0) {
        for (const id of settings.packages) {
          const sub = settings.replace(id)

          if (sub)
            urls.set(typeof sub === 'string' ? sub : id, await getSkypackUrl(id, settings.minify))
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
    /* transform(code: string, filename: string) {
      if (meta.framework === 'webpack' && filename.endsWith('.html')) {
        const dom = new BeautifulDom(code)

        for (const id of urls.keys()) {
          const attr = `src=${id}`
          const src = dom.querySelector(`script[${attr}]`)

          if (src) {
            code.replace(new RegExp(src.outerHTML), (match) => {
              return match.replace(attr, `src=${urls.get(id)}`)
            })
          }
        }
      }
      return code
    },
    webpack(compiler: Compiler) {}, */
  }
})
