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
  enforce: 'post',
  async resolveId(source: string) {
    options = { ...defaults, ...options }

    if (source) {
      const replace = options.replace(source)

      if (replace && !(source.match(/^\.|^src|^https?:\/\//))) {
        const url = await skypin(typeof replace === 'string' ? replace : source, {
          min: options.minified,
          pin: options.pinned,
        })

        if (url)
          return url
      }
    }

    return source
  },
}))
