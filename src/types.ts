export interface Options {
  packages: string[]
  minify: boolean
  replace: (id: string) => (boolean | string)
}
