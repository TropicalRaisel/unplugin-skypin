/* eslint-disable no-console */
import { resolve, join } from 'path'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import c from 'chalk'

async function run() {
  const dir = resolve(__dirname, '../playground/')
  let fixtures = await fs.readdir(dir)

  if (process.argv[2])
    fixtures = fixtures.filter(i => i.includes(process.argv[2]))

  for (const name of fixtures) {
    const path = join(dir, name)

    if (fs.existsSync(join(path, 'dist')))
      await fs.remove(join(path, 'dist'))

    switch (name) {
      case 'vite':
        console.log(c.hex('#646CFF').inverse.bold`\n  Vite  `, 'building\n')
        execSync('npx vite build', { cwd: path, stdio: 'inherit' })
        break
      case 'rollup':
        console.log(c.hex('#EC4A3F').inverse.bold`\n  Rollup  `, 'building\n')
        execSync('npx rollup -c', { cwd: path, stdio: 'inherit' })
        break
      case 'webpack':
        console.log(c.hex('#8DD6F9').inverse.bold`\n  Webpack  `, 'building\n')
        execSync('npx webpack', { cwd: path, stdio: 'inherit' })
        break
      case 'nuxt':
        console.log(c.hex('#00C58E').inverse.bold`\n  Nuxt  `, 'building\n')
        execSync('npx nuxt build', { cwd: path, stdio: 'inherit' })
        break
      case 'vue':
        break
      default:
        break
    }
  }
}

run()
