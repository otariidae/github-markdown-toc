import { writeFileSync } from 'fs'
import manifest from '../src/manifest.json.js'

const body = JSON.stringify(manifest, null, 2)

writeFileSync('dist/manifest.json', body)
