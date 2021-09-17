export default {
  generate: {
    dir: 'dist/',
  },
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-vite',
    '../../../src/nuxt.ts',
  ],
}
