# unplugin-skypin

[![NPM version](https://img.shields.io/npm/v/unplugin-skypin?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-skypin)

Inspired by [rollup-plugin-skypin](https://github.com/MarshallCB/rollup-plugin-skypin#usage),
this plugin provides the same functionality across all the platforms supported by Unplugin!

## Options

Uses parameters similar to RPS:

- `minified` *(Type: Boolean, Default: `true`)*: Whether to use minified assets.
- `pinned` *(Type: Boolean, Default: `true`)*: Whether to use Skypack's [pinned](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized#generate-a-pinned-url) assets (recommended, even in development).
- `replace` *(Type: function(id: string) => boolean|string, Default: `() => true`)*: Uses a returned string as the package **id**. Returning a boolean value simply toggles Skypack URL substitution.

The other options are not included because only [package imports supported by Skypin](https://github.com/marshallcb/skypin#skypinmodule_id-options---url) should be used.
Imports in other formats should not be changed.
External imports should be properly configured based on the framework used.

## Usage

```bash
pnpm i
```

Check the `package.json` for the available scripts.

## Install

```bash
npm i unplugin-skypin
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Skypin from 'unplugin-skypin/vite'

export default defineConfig({
  plugins: [
    Skypin({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Skypin from 'unplugin-skypin/rollup'

export default {
  plugins: [
    Skypin({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
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
// nuxt.config.js
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
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-skypin/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>
