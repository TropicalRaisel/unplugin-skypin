import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'
import { resolveOptions } from './core/options'

export default createUnplugin<Options>((options) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'

  return {
    name,
    enforce: 'post',
    async resolveId(id: string) {
      if (!id || !settings.packages.includes(id))
        return id

      if (settings.replace) {
        // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
        return await skypin(id, {
          min: settings.minified,
          pin: settings.pinned,
        })
      }
    },
    rollup: {
      name,
      api: {
        external: settings.packages,
      },
    },
  }
})
