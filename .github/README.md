# unplugin-skypin

<div align="center">
  <p>Bringing <a href="https://docs.skypack.dev/#skypack-vs-traditional-cdns">Skypack's power</a> to platforms supported by <a href="https://github.com/unjs/unplugin#unplugin">Unplugin</a>!</p>
  <p>
    <a href="https://vitejs.dev/">
      <img alt="Vite Logo" src="./images/vite.svg" width="16" height="16"> Vite
    </a> | <a href="https://rollupjs.org/guide/en/#overview">
      <img alt="Rollup Logo" src="./images/rollup.svg" width="16" height="16"> Rollup
    </a> | <a href="https://nuxtjs.org/">
      <img alt="Nuxt Logo" src="./images/nuxt.svg" width="16" height="16"> Nuxt
    </a> | <strike><a href="https://webpack.js.org/concepts/">
      <img alt="Webpack Logo" src="./images/webpack.svg" width="16" height="16"> Webpack 4-5
    </a></strike>
  </p>
  <hr>
  <p>Inspired by <a href="https://github.com/MarshallCB/rollup-plugin-skypin#usage">rollup-plugin-skypin</a></p>
  <hr>
  <p>
    <a href="https://www.npmjs.com/package/unplugin-skypin">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/unplugin-skypin?logo=npm&label=npm&color=CB3837">
    </a>
    <a href="https://david-dm.org/TropicalRaisel/unplugin-skypin">
      <img alt="Dependencies Status" src="https://status.david-dm.org/gh/TropicalRaisel/unplugin-skypin.svg">
    </a>
    <a href="https://david-dm.org/TropicalRaisel/unplugin-skypin?type=dev">
      <img alt="Dev Dependencies Status" src="https://status.david-dm.org/gh/TropicalRaisel/unplugin-skypin.svg?type=dev">
    </a>
  </p>
</div>

## Options

- `packages` *(Type: String[], Default: `[]`)*: Declare the package imports that should be changed here. Unplugin performs some low-level operations that can involve accessing dependencies that were never intended to be.
- `minified` *(Type: Boolean, Default: `true`)*: Whether to use minified assets.
- `pinned` *(Type: Boolean, Default: `true`)*: Whether to use Skypack's [pinned](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized#generate-a-pinned-url) assets (recommended, even in development).
- `replace` *(Type: function(id: string) => boolean|string, Default: `() => true`)*: Uses a returned string as the package **id**. Returning a boolean value simply toggles Skypack URL substitution.

[Package import formats supported by Skypin](https://github.com/marshallcb/skypin#skypinmodule_id-options---url) should be used
as the package import and when declaring a package in `packages`.

## Notes

- Nuxt is supposed to work but has not yet been tested.
- Webpack is not currently supported.

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.{m}js
import skypin from 'unplugin-skypin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    skypin({
      packages: [
        /* imports to change here */
      ],
      /* other options */
    }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.{m}js
import skypin from 'unplugin-skypin/rollup'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    skypin({
      packages: [
        /* imports to change here */
      ],
      /* other options */
    }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.{c}js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-skypin/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.{m}js
export default {
  buildModules: [
    ['unplugin-skypin/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.{c}js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-skypin/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

## Development

```bash
pnpm i
```

Check the `package.json` for the available scripts.
