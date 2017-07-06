import { describe, it as test } from 'kocha'
import t from 'assert'
import { URL } from 'url'
import { readFileSync } from 'fs'
import { join } from 'path'
import { JSDOM } from 'jsdom'
import PageFactory, {
  GitHubPage,
  ReleasePage,
  CodePage,
  WikiPage,
  UnknownPage
} from '../src/page.js'

function fragmentFromFile(path) {
  const file = readFileSync(join(__dirname, path))
  return JSDOM.fragment(file.toString())
}

// shared class
const { HTMLHeadingElement } = new JSDOM('').window

describe('UnknownPage', () => {
  const page = new UnknownPage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeadings', () => {
    t.deepEqual(page.getHeadings(), [])
  })
})

describe('ReleasePage', () => {
  const frag = fragmentFromFile('fixtures/release.html')
  const page = new ReleasePage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeadings', () => {
    const headings = page.getHeadings(frag)
    t.ok(Array.isArray(headings))
    t.ok(headings.every(e => e instanceof HTMLHeadingElement))
    t.equal(headings.length, 3)
  })
})

describe('Code Page', () => {
  const frag = fragmentFromFile('./fixtures/code.html')
  const page = new CodePage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeadings', () => {
    const headings = page.getHeadings(frag)
    t.ok(Array.isArray(headings))
    t.ok(headings.every(e => e instanceof HTMLHeadingElement))
    t.equal(headings.length, 4)
  })
})

describe('Wiki Page', () => {
  const frag = fragmentFromFile('./fixtures/wiki.html')
  const page = new WikiPage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeadings', () => {
    const headings = page.getHeadings(frag)
    t.ok(Array.isArray(headings))
    t.ok(headings.every(e => e instanceof HTMLHeadingElement))
    t.equal(headings.length, 4)
  })
})

test('PageFactory', () => {
  global.URL = URL

  const p0 = PageFactory.createFromUrl(
    'https://github.com/example/example-project'
  )
  const p1 = PageFactory.createFromUrl(
    'https://github.com/example/example-project/tree/master/test'
  )
  const p2 = PageFactory.createFromUrl(
    'https://github.com/example/example-project/releases'
  )
  const p3 = PageFactory.createFromUrl(
    'https://github.com/example/example-project/wiki'
  )
  const p4 = PageFactory.createFromUrl('https://github.com/example')
  const p5 = PageFactory.createFromUrl('https://github.com')

  t.ok(p0 instanceof CodePage)
  t.ok(p1 instanceof CodePage)
  t.ok(p2 instanceof ReleasePage)
  t.ok(p3 instanceof WikiPage)
  t.ok(p4 instanceof UnknownPage)
  t.ok(p5 instanceof UnknownPage)

  delete global.URL
})
