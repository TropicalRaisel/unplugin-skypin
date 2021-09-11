import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'
import { resolveOptions } from './core/options'

export default createUnplugin<Options>((options, meta) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'

  return {
    name,
    // https://rollupjs.org/guide/en/#build-hooks
    // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
    enforce: 'pre',
    async resolveId(id: string) {
      if (!settings.packages.includes(id))
        return id

      if (settings.replace) {
        // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
        const url = await skypin(id, {
          min: settings.minified,
          pin: settings.pinned,
        })

        return meta.framework !== 'webpack' ? { id: url, external: true } : url
      }
    },
  }
})
