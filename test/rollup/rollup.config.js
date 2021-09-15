import skypin from 'unplugin-skypin/rollup'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/',
    format: 'esm',
  },
  plugins: [
    skypin({
      packages: [
        'canvas-confetti',
      ],
      /* other options */
    }),
  ],
}
