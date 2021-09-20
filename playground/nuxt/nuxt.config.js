import { resolve } from 'path'

export default {
  rootDir: resolve(__dirname, '.'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-vite',
    '~~../../src/nuxt.ts',
  ],
  telemetry: false,
}
