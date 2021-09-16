import skypin from '@tropicalraisel/unplugin-skypin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'index',
      fileName: 'index.js',
    },
    outDir: 'dist/',
  },
  plugins: [
    skypin({
      packages: [
        'canvas-confetti',
      ],
      /* other options */
    }),
  ],
})
