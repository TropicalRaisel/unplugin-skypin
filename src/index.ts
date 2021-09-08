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
  async resolveId(id: string) {
    options = { ...defaults, ...options }

    const replace = options.replace(id)

    if (replace && !(id.startsWith('.') || id.startsWith('https://') || id.startsWith('http://'))) {
      return await skypin(typeof replace === 'string' ? replace : id, {
        min: options.minified,
        pin: options.pinned,
      })
    }

    return id
  },
}))
