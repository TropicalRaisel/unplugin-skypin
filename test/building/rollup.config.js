import skypin from 'unplugin-skypin/rollup'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/rollup',
    format: 'esm',
  },
  plugins: [
    skypin({
      packages: [
        'hueman',
      ],
      /* other options */
    }),
  ],
}
