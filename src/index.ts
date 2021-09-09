import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'

const defaults: Options = {
  packages: [],
  pinned: true,
  minified: true,
  replace: true,
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-skypin',
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
    api: {
      external: true,
    },
  },
}))
