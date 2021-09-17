import { createUnplugin } from 'unplugin'
import got from 'got'
import { Options } from './types'
import { resolveOptions } from './core/options'
import { log } from './core/log'

export const SKYPACK_URL = 'https://cdn.skypack.dev'

export function hasValidVersion(id: string): boolean {
  // https://docs.skypack.dev/skypack-cdn/api-reference/lookup-urls#api-package-matching
  if (!id.includes('@', 1))
    return true // no version is valid

  let version = id.split('@')[1]

  if (version.match(/^[a-z]+$/))
    return true // assume this is a dist-tag: https://docs.npmjs.com/cli/v7/commands/npm-dist-tag | https://docs.npmjs.com/adding-dist-tags-to-packages

  if (version[0].match(/^(\~|\^)/))
    version = version.slice(1)

  // semver 2.0.0: https://regex101.com/r/vkijKf/1/
  const semver = version.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/)
  return (semver && semver.length > 0) || false
}

export async function getSkypackUrl(id: string, min = true): Promise<string> {
  // If the dependency is remote or relative, or has an invalid version, ignore it.
  // The '@' character is checked at the start to determine if the package is scoped.
  if ((!id.startsWith('@') && id.includes('/')) || id.includes('.') || !hasValidVersion(id))
    return id

  try {
    const response = await got(id, {
      prefixUrl: SKYPACK_URL,
      http2: true,
    })
    const headers = response.headers as NodeJS.Dict<string>
    const status = headers['x-import-status']
    const pin = headers['x-pinned-url'] || headers['x-import-url'] || status

    if (pin && pin !== status) {
      switch (status) {
        case 'SUCCESS':
          // https://docs.skypack.dev/skypack-cdn/api-reference/private-urls#error-package-error-urls
          if (pin.startsWith('/error/'))
            throw new Error('Skypack reported a build error! Create an issue here: https://github.com/skypackjs/skypack-cdn/issues')

          return SKYPACK_URL.concat(min ? pin.replace('mode=imports', 'mode=imports,min') : pin)
        case 'NEW':
          // https://docs.skypack.dev/skypack-cdn/api-reference/private-urls#new-new-package-urls
          return await getSkypackUrl(id, min)
        default:
          throw new Error(`Unknown Skypack status; please report this! <${status}>`)
      }
    }

    throw new Error('Skypack did not return any valid reponse!')
  }
  catch (err) {
    log.error('COULD NOT GET SKYPACKAGE!', err as Error)
  }

  return id
}

export default createUnplugin<Options>((options, meta) => {
  const settings = resolveOptions(options)
  const name = 'unplugin-skypin'
  const urls = new Map<string, string>()

  return {
    name,
    enforce: 'pre',
    async buildStart() {
      for (const id of settings.packages) {
        const sub = settings.replace(id)

        if (sub)
          urls.set(typeof sub === 'string' ? sub : id, await getSkypackUrl(id, settings.minify))
      }
    },
    resolveId(id: string) {
      if (urls.has(id)) {
        const url = urls.get(id)!
        return meta.framework !== 'webpack' ? { id: url, external: true } : url
      }
      return id
    },
    /* transform(code: string, filename: string) {
      if (meta.framework === 'webpack' && filename.endsWith('.html')) {
        const dom = new BeautifulDom(code)

        for (const id of urls.keys()) {
          const attr = `src=${id}`
          const src = dom.querySelector(`script[${attr}]`)

          if (src) {
            code.replace(new RegExp(src.outerHTML), (match) => {
              return match.replace(attr, `src=${urls.get(id)}`)
            })
          }
        }
      }
      return code
    },
    webpack(compiler: Compiler) {}, */
  }
})
