import { createUnplugin } from 'unplugin'
import { Options } from './types'
import { resolveOptions } from './core/options'

export default createUnplugin<Options>((options) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'

  return {
    name,
    enforce: 'post',
    async resolveId(id: string) {
      return settings.packages.includes(id) ? settings.urls.get(id) : id
    },
    rollup: {
      name,
      api: {
        external: settings.urls.values,
      },
    },
  }
})
