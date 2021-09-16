import skypin from '@tropicalraisel/unplugin-skypin/rollup'

/** @type { import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    // public: { url: '/', static: true },
    src: { url: '/' },
  },
  plugins: [
    /* ... */
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    rollup: {
      plugins: [
        skypin({
          packages: [
            'hueman',
          ],
          /* other options */
        }),
      ],
    },
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'dist/snowpack',
  },
}
