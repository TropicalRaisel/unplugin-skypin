// import { resolve } from 'path'
import skypin from 'unplugin-skypin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'index',
      fileName: 'index.js',
    },
    outDir: 'dist/vite',
  },
  plugins: [
    skypin({
      packages: [
        'hueman',
      ],
      /* other options */
    }),
  ],
})
