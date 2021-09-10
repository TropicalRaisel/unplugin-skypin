import { resolve, join } from 'path'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import c from 'chalk'
import { logger } from './testLog'

async function run() {
  const dir = resolve(__dirname, '../test')
  let fixtures = await fs.readdir(dir)

  if (process.argv[2])
    fixtures = fixtures.filter((i: string | string[]) => i.includes(process.argv[2]))

  for (const name of fixtures) {
    const path = join(dir, name)

    if (fs.existsSync(join(path, 'dist')))
      await fs.remove(join(path, 'dist'))

    logger.info(c.yellow.inverse.bold`\n  Vite  ${name} \n`)
    // execSync('pnpm vite build', { cwd: path, stdio: 'inherit' })
    logger.info(c.red.inverse.bold`\n  Rollup  ${name} \n`)
    // execSync('pnpm rollup -c', { cwd: path, stdio: 'inherit' })
    logger.info(c.blue.inverse.bold`\n  Webpack  ${name} \n`)
    // execSync('pnpm webpack', { cwd: path, stdio: 'inherit' })
  }
}

run()
