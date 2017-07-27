import { writeFileSync } from 'fs'
import makeManifest from '../src/manifest.json.js'

const { version } = require('../package.json')

let body = makeManifest({
  version
})
body = JSON.stringify(body, null, '  ')

writeFileSync('dist/manifest.json', body)
