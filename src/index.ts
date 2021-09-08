import { createUnplugin } from 'unplugin'
import { skypin } from 'skypin'
import { Options } from './types'

const defaults: Options = {
  pinned: true,
  minified: true,
  allowRelative: false,
  allowWeb: true,
  shouldReplace: () => true,
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-skypin',
  async resolveId(id: string) {
    options = { ...defaults, ...options }

    if ((id.startsWith('.') && options.allowRelative) || ((id.startsWith('https://') || id.startsWith('http://')) && options.allowWeb))
      return id

    const replacing = options.shouldReplace(id)

    if (replacing) {
      return await skypin(typeof replacing === 'string' ? replacing : id, {
        min: options.minified,
        pin: options.pinned,
      })
    }

    // default node import
    return id
  },
}))
