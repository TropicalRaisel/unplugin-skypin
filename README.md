<div align="center">
  <img alt="Skypin Logo" src="https://github.com/marshallcb/skypin/raw/main/meta/skypin.png" width="300">
  <h1>unplugin-skypin</h1>
  <p>Bringing <a href="https://docs.skypack.dev/#skypack-vs-traditional-cdns">Skypack's power</a> to platforms supported by <a href="https://github.com/unjs/unplugin#unplugin">Unplugin</a>!</p>
  <p>
    <a href="https://vitejs.dev/">
      <img alt="Vite Logo" src="./.github/images/vite.svg" width="16" height="16">&nbsp;Vite
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://rollupjs.org/guide/en/#overview">
      <img alt="Rollup Logo" src="./.github/images/rollup.svg" width="16" height="16">&nbsp;Rollup
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://nuxtjs.org/">
      <img alt="Nuxt Logo" src="./.github/images/nuxt.svg" width="16" height="16">&nbsp;Nuxt
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://webpack.js.org/concepts/">
      <img alt="Webpack Logo" src="./.github/images/webpack.svg" width="16" height="16">&nbsp;<strike>Webpack 4-5</strike>
    </a>
  </p>
  <hr>
  <p>Inspired by <a href="https://github.com/MarshallCB/rollup-plugin-skypin#usage">rollup-plugin-skypin</a>.</p>
  <hr>
  <p>
    <a href="https://www.npmjs.com/package/@tropicalraisel/unplugin-skypin">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/@tropicalraisel/unplugin-skypin?logo=npm&label=npm&color=CB3837">
    </a>
    <a href="https://david-dm.org/tropicalraisel/unplugin-skypin">
      <img alt="Dependencies Status" src="https://status.david-dm.org/gh/tropicalraisel/unplugin-skypin.svg">
    </a>
    <a href="https://david-dm.org/tropicalraisel/unplugin-skypin?type=dev">
      <img alt="Dev Dependencies Status" src="https://status.david-dm.org/gh/tropicalraisel/unplugin-skypin.svg?type=dev">
    </a>
  </p>
</div>

## Options

- `packages` *(Type: string[], Default: `[]`)*: Declare the package imports that should be changed here. This is done manually opposed to automatically because Unplugin performs some low-level operations that can involve accessing dependencies that were never intended to be. Packages are able to prefetched through this method too, so there are extra performance benefits.
- `minify` *(Type: boolean, Default: `true`)*: Whether to use Skypack's minified asset.
- `replace` *(Type: function(id: string) => boolean|string, Default: `() => true`)*: Uses a returned string as the package **id**. Returning a boolean value simply toggles Skypack URL substitution.

### Import Syntax

Strictly similar to [what Skypack allows](https://docs.skypack.dev/skypack-cdn/api-reference/lookup-urls#api-package-matching). Note that the import syntax in both the `packages` and file listings need to be identical.

### *Can be used as a library!*

```javascript
import { isValidVersion, isValidPackage, getSkypackUrl } from 'unplugin-skypin'
```
Check out the functions over [on GitHub](https://github.com/tropicalraisel/unplugin-skypin/blob/master/src/index.ts)!

## Notes

- Webpack is not currently supported.
- Having `semver` and other CommonJS dependencies caused `snowpack` to crash.
However, since `snowpack` is no longer [being maintained](https://dev.to/fredkschott/5-more-things-i-learned-building-snowpack-to-20-000-stars-5dc9), any planned compatibility is being dropped.
CJS dependencies then become okay.

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.{m}js
import skypin from '@tropicalraisel/unplugin-skypin/vite'
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
import skypin from '@tropicalraisel/unplugin-skypin/rollup'

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
<summary>Nuxt</summary><br>

```ts
// nuxt.config.{m}js
export default {
  buildModules: [
    ['@tropicalraisel/unplugin-skypin/nuxt', { /* options */ }],
  ],
}
```

Reference the test suite here: https://github.com/tropicalraisel/unplugin-skypin/tree/master/playground/nuxt

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

### WIP

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.{c}js
module.exports = {
  /* ... */
  plugins: [
    require('@tropicalraisel/unplugin-skypin/webpack').default({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.{c}js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@tropicalraisel/unplugin-skypin/webpack').default({ /* options */ }),
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
