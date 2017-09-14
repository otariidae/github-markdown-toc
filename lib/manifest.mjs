import fs from 'fs'
import util from 'util'
import makeManifest from '../src/manifest.json.mjs'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

readFileAsync('package.json')
  .then(res => res.toString())
  .then(pkg => makeManifest(pkg))
  .then(str => JSON.stringify(str, null, 2))
  .then(json => writeFileAsync('dist/manifest.json', json))

