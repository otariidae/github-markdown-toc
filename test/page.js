import { describe, it as test } from 'kocha'
import t from 'assert'
import { URL } from 'url'
import { JSDOM } from 'jsdom'
import PageFactory, {
  GitHubPage,
  ReleasePage,
  CodePage,
  WikiPage,
  UnknownPage
} from '../src/page.js'
import { HeaderRoot } from '../src/functions.js'

// shared class
const { HTMLHeadingElement } = new JSDOM('').window

describe('UnknownPage', () => {
  const page = new UnknownPage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeaders', () => {
    t.deepEqual(page.getHeaders(), [])
  })
})

describe('ReleasePage', () => {
  const frag = JSDOM.fragment(`
    <div class="release-timeline">
      <div class="release label-latest">
        <div class="release-body commit open">
          <div class="release-header">
            <h1 class="release-title">
              <a href="/example/example-project/releases/tag/v1.0.0">1.0.0</a>
            </h1>
          </div>
        </div>
      </div>
      <div class="release">
        <div class="release-body commit open">
          <div class="release-header">
            <h1 class="release-title">
              <a href="/example/example-project/releases/tag/v0.0.2">0.0.2</a>
            </h1>
          </div>
        </div>
      </div>
      <div class="release">
        <div class="release-body commit open">
          <div class="release-header">
            <h1 class="release-title">
              <a href="/example/example-project/releases/tag/v0.0.1">0.0.1</a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  `)
  const page = new ReleasePage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeaders', () => {
    const headers = page.getHeaders(frag)
    t.ok(Array.isArray(headers))
    t.ok(headers.every(e => e instanceof HTMLHeadingElement))
    t.equal(headers.length, 3)
  })
})

describe('Code Page', () => {
  const frag = JSDOM.fragment(`
    <article class="markdown-body">
      <h1>
        <a id="user-content-example-app" class="anchor" href="#example-app">
        </a>
        Example App
      </h1>
      <h2>
        <a id="user-content-install" class="anchor" href="#install">
        </a>
        Install
      </h2>
      <h3>
        <a id="user-content-manual-install" class="anchor" href="#manual-install">
        </a>
        Manual Install
      </h3>
      <h2>
        <a id="user-content-license" class="anchor" href="#license">
        </a>
        License
      </h2>
      <p>CC0</p>
    </article>
  `)
  const page = new CodePage()
  const headers = page.getHeaders(frag)

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeaders', () => {
    const headers = page.getHeaders(frag)
    t.ok(Array.isArray(headers))
    t.ok(headers.every(e => e instanceof HTMLHeadingElement))
    t.equal(headers.length, 4)
  })
})

describe('Wiki Page', () => {
  const frag = JSDOM.fragment(`
    <div id="wiki-content" class="wiki-content">
      <div>
        <div class="wiki-custom-sidebar wiki-writable markdown-body">
          <h2>
            <a id="user-content-nodejs-community-wiki" class="anchor" href="#nodejs-community-wiki"></a> Node.js community wiki
          </h2>
        </div>
      </div>

      <div id="wiki-body" class="wiki-body gollum-markdown-content instapaper_body">
        <div class="markdown-body">
          <h1>
            <a id="user-content-breaking-changes-between-v6-and-v7" class="anchor" href="#breaking-changes-between-v6-and-v7"></a>        Breaking changes between v6 and v7
          </h1>
          <p></p>
          <h2>
            <a id="user-content-by-subsystem" class="anchor" href="#by-subsystem"></a> By Subsystem
          </h2>
          <h3>
            <a id="user-content-buffer" class="anchor" href="#buffer"></a> buffer
          </h3>
          <ul><li></li></ul>
          <h2>
            <a id="user-content-dependencies" class="anchor" href="#dependencies"></a> Dependencies
          </h2>
        </div>
      </div>
    </div>
  `)
  const page = new WikiPage()

  test('inheritance', () => {
    t.ok(page instanceof GitHubPage)
  })
  test('getHeaders', () => {
    const headers = page.getHeaders(frag)
    t.ok(Array.isArray(headers))
    t.ok(headers.every(e => e instanceof HTMLHeadingElement))
    t.equal(headers.length, 4)
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
