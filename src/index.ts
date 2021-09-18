import { createUnplugin } from 'unplugin'
import got from 'got'
import { valid } from 'semver'
import { Options } from './types'
import { resolveOptions } from './core/options'
import { log } from './core/log'

export const SKYPACK_URL = 'https://cdn.skypack.dev'

export function isValidVersion(package_version: string): boolean {
  let version = package_version

  if (!version || version.length <= 0)
    return false // empty versions are invalid

  if (version.match(/^latest|next$/))
    return true // dist tags are valid

  if (version[0].match(/^\~|\^$/))
    version = version.slice(1)

  // semver 2.0.0: https://regex101.com/r/vkijKf/1/
  const semver = valid(version)
  return (semver && semver.length > 0) || false
}

// https://docs.skypack.dev/skypack-cdn/api-reference/lookup-urls#api-package-matching
export function isValidPackage(package_id: string): boolean {
  const id = package_id

  if (!id || id.length <= 0)
    return false // no empty strings; null or undefined should throw compiler errors

  switch ((id.match(/\@/g) || []).length) {
    case 0: // no version
      return true
    case 1: { // scoped package or package with version
      const slices = id.split('@')

      if (id.startsWith('@'))
        return slices[1].length > 0 && !isValidVersion(slices[1])

      return slices[0].length > 0 && isValidVersion(slices[1])
    }
    case 2: { // scoped package with version
      const slices = id.slice(1).split('@')
      return slices[0].length > 0 && isValidVersion(slices[1])
    }
    default:
      return false
  }
}

export async function getSkypackUrl(package_id: string, minified = true): Promise<string> {
  const id = package_id
  const min = minified

  // If the dependency is remote or relative, or has an invalid version, ignore it.
  // The '@' character is checked at the start to determine if the package is scoped.
  if ((!id.startsWith('@') && id.includes('/')) || id.includes('.') || !isValidPackage(id))
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
