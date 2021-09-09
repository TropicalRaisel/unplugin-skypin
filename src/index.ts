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
      if (!source || source.match(/^src/))
        return source

      const replace = options?.replace(source)

      if (replace)
        // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
        return await skypin(typeof replace === 'string' ? replace : source, skypinOptions)
    },
    rollup: {
      external: true,
    },
  }
})
