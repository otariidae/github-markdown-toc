import test from 'tape'
import { URL } from 'url'
import PageType from '../src/page-type.js'

test('check-page-type', t => {
  global.URL = URL
  t.ok(new PageType('https://github.com/example/example-project').isCodePage())
  t.ok(new PageType('https://github.com/example/example-project/tree/master/test').isCodePage())
  t.ok(new PageType('https://github.com/example/example-project/blob/master/package.json').isCodePage())
  t.ok(new PageType('https://github.com/example/example-project/releases').isReleasePage())
  t.ok(new PageType('https://github.com/example/example-project/releases/tag/v1.0.0').isUnknownPage())
  t.ok(new PageType('https://github.com/example').isUnknownPage())
  t.ok(new PageType('https://github.com').isUnknownPage())
  t.end()
})
