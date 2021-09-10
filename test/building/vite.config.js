import skypin from 'unplugin-skypin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    skypin({
      packages: [
        'hueman',
      ],
      /* other options */
    }),
  ],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'index',
      fileName: 'index.js',
    },
    outDir: 'dist/vite',
  },
})
