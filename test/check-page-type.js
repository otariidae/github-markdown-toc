import test from 'tape'
import { URL } from 'url'
import checkPageType, { key } from '../src/check-page-type.js'

test('check-page-type', t => {
  global.URL = URL
  t.equal(checkPageType('https://github.com/example/example-project'), key.CODE)
  t.equal(checkPageType('https://github.com/example/example-project/tree/master/test'), key.CODE)
  t.equal(checkPageType('https://github.com/example/example-project/blob/master/package.json'), key.CODE)
  t.equal(checkPageType('https://github.com/example/example-project/releases'), key.RELEASE)
  t.equal(checkPageType('https://github.com/example/example-project/releases/tag/v1.0.0'), key.UNKNOWN)
  t.equal(checkPageType('https://github.com/example'), key.UNKNOWN)
  t.equal(checkPageType('https://github.com'), key.UNKNOWN)
  t.end()
})
