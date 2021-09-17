import { Module } from '@nuxt/types'
import { Options } from './types'
import unplugin from '.'

const nuxtModule: Module<Options> = function(this: any, options: Options) {
  const { nuxt } = this

  // install webpack plugin
  /* this.extendBuild((config: any) => {
    config.plugins = config.plugins || []
    config.plugins.unshift(unplugin.webpack(options))
  }) */

  // install vite plugin
  nuxt.hook('vite:extend', async(vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })
};

(nuxtModule as any).meta = require('../package.json')

export default nuxtModule
