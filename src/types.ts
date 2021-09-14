export type SkypinOptions = { min: boolean; pin: boolean }

export interface Options {
  packages: string[]
  skypin: SkypinOptions
  replace: (id: string) => (boolean | string)
}
