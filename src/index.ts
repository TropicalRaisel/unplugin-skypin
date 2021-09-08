import { createUnplugin } from 'unplugin'
import { Options } from './types'

export default createUnplugin<Options>((options: any) => ({
  name: 'unplugin-skypin',
  transformInclude(id: string) {
    return id.endsWith('main.ts')
  },
  transform(code: string) {
    return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
  },
}))
