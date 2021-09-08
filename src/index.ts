import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'

const defaults: Options = {
  pinned: true,
  minified: true,
  replace: () => true,
}

export default createUnplugin<Options>((options) => {
  options = { ...defaults, ...options }
  const skypinOptions = {
    min: options.minified,
    pin: options.pinned,
  }

  return {
    name: 'unplugin-skypin',
    enforce: 'post',
    async resolveId(source: string) {
      if (!source || source.match(/^\.|^src|^https?:\/\//))
        return source

      const replace = options?.replace(source)

      if (replace) {
        const url = await skypin(typeof replace === 'string' ? replace : source, skypinOptions)

        if (url)
          return url
      }
    },
  }
})
