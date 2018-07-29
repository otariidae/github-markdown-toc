import fs from 'fs'
import makeManifest from '../src/manifest.json.mjs'

const res = fs.readFileSync('package.json')
const pkg = JSON.parse(res.toString())
const json = JSON.stringify(makeManifest(pkg), null, 2)

fs.writeFileSync('dist/manifest.json', json)
