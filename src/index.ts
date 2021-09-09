import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'

export default createUnplugin<Options>((options) => {
  const defaults: Options = {
    packages: [],
    pinned: true,
    minified: true,
    replace: true,
  }

  const name = 'unplugin-skypin'

  return {
    name,
    enforce: 'post',
    async resolveId(id: string) {
      options = { ...defaults, ...options }

      if (!id || !options.packages.includes(id))
        return id

      if (options.replace) {
        // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
        return await skypin(id, {
          min: options.minified,
          pin: options.pinned,
        })
      }
    },
    rollup: {
      name,
      api: {
        external: options?.packages,
      },
    },
  }
})
