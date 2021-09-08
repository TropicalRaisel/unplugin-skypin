import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'

const defaults: Options = {
  pinned: true,
  minified: true,
  replace: () => true,
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-skypin',
  async resolveId(source: string) {
    options = { ...defaults, ...options }

    const replace = options.replace(source)

    if (replace && !(source.match(/^\.|^src|^https?:\/\//))) {
      return await skypin(typeof replace === 'string' ? replace : source, {
        min: options.minified,
        pin: options.pinned,
      })
    }

    return source
  },
}))
