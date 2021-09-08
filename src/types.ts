export interface Options {
  minified: boolean
  pinned: boolean
  replace: (module_id: string) => (boolean | string)
}
