import { describe, it as test, before, after } from 'kocha'
import t from 'assert'
import { URL } from 'url'
import PageType from '../src/js/page-type.js'

describe('check-page-type', () => {
  before(() => {
    global.URL = URL
  })
  after(() => {
    delete global.URL
  })

  test('code', () => {
    t.ok(
      new PageType('https://github.com/example/example-project').isCodePage()
    )
    t.ok(
      new PageType(
        'https://github.com/example/example-project/tree/master/test'
      ).isCodePage()
    )
    t.ok(
      new PageType(
        'https://github.com/example/example-project/blob/master/package.json'
      ).isCodePage()
    )
  })
  test('release', () => {
    t.ok(
      new PageType(
        'https://github.com/example/example-project/releases'
      ).isReleasePage()
    )
  })
  test('wiki', () => {
    t.ok(
      new PageType(
        'https://github.com/example/example-project/wiki'
      ).isWikiPage()
    )
    t.ok(
      new PageType(
        'https://github.com/example/example-project/wiki/API-changes'
      ).isWikiPage()
    )
  })
  test('unknown', () => {
    t.ok(
      new PageType(
        'https://github.com/example/example-project/releases/tag/v1.0.0'
      ).isUnknownPage()
    )
    t.ok(new PageType('https://github.com/example').isUnknownPage())
    t.ok(new PageType('https://github.com').isUnknownPage())
  })
})
