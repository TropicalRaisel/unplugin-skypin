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
  async resolveId(source: string) {
    options = { ...defaults, ...options }

    if (!source || options.packages.includes(source))
      return source

    if (options.replace) {
      // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
      return await skypin(source, {
        min: options.minified,
        pin: options.pinned,
      })
    }
  },
  rollup: {
    external: true,
  },
}))
