import { writeFileSync } from 'fs'
import makeManifest from '../src/manifest.json.js'

const { version } = require('../package.json')

const excludes = [
  'login',
  'join',
  'sessions',
  'blog',
  'about',
  'features',
  'business',
  'personal',
  'open-source',
  'pricing',
  'contact',
  'explore',
  'settings',
  'notifications',
  'watching',
  'pulls',
  'issues',
  'integrations',
  'showcases',
  'trending'
]

let body = makeManifest({
  version,
  excludes
})
body = JSON.stringify(body, null, '  ')

writeFileSync('dist/manifest.json', body)
