export interface Options {
  packages: string[]
  minified: boolean
  pinned: boolean
  replace: (id: string) => (boolean | string)
}

export interface ResolvedOptions extends Options {
  urls: Map<string, string>
}
