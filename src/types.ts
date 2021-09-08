export interface Options {
  minified: boolean
  pinned: boolean
  allowRelative: boolean
  allowWeb: boolean
  shouldReplace: (module_id: string) => (boolean | string)
}
