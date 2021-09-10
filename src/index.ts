import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'
import { resolveOptions } from './core/options'
// import { generateValidUrls } from './core/helpers'

export default createUnplugin<Options>((options) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'
  // const urls = await generateValidUrls(settings)

  return {
    name,
    enforce: 'post',
    async resolveId(id: string) {
      if (!settings.packages.includes(id))
        return id

      const replace = settings.replace(id)

      if (replace) {
        // https://github.com/MarshallCB/skypin/blob/main/src/index.ts#L49
        return await skypin(typeof replace === 'string' ? replace : id, {
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
