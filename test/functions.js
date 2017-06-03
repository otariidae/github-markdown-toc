import test from 'tape'
import { JSDOM } from 'jsdom'
import { map } from '../src/functional-util.js'
import { createHeader, querySelector, querySelectorAll, querySelectorAllArray, hash, id2link, hrefOrID, trimmedText, headerLevel, hasText, filterEmptyText, createHeaders, selectAllHeaderElement, element2Array } from '../src/functions.js'

test('createHeader', t => {
  t.deepEqual(createHeader('foo', 42, 'bar'), {
    link: 'foo',
    level: 42,
    text: 'bar'
  })
  t.end()
})

test(({ test }) => {
  const { window } = new JSDOM(`
    <article class="markdown-body">
      <h1>foo</h1>
      <h2>bar</h2>
      <p>baz</p>
    </article>
  `)
  const {
    NodeList,
    Element,
    document
  } = window

  test('querySelector', t => {
    const f = querySelector('h1')
    const result = f(document)

    t.equal(typeof f, 'function')
    t.ok(result instanceof Element)
    t.end()
  })

  test('querySelectorAll', t => {
    const f = querySelectorAll('h1, h2')
    const result = f(document)

    t.equal(typeof f, 'function')
    t.ok(result instanceof NodeList)
    t.equal(result.length, 2)
    t.ok(result[0] instanceof Element)
    t.ok(result[1] instanceof Element)
    t.equal(result[0].textContent, 'foo')
    t.equal(result[1].textContent, 'bar')
    t.end()
  })

  test('querySelectorAllArray', t => {
    const f = querySelectorAllArray('h1, h2')
    const result = f(document)

    t.equal(typeof f, 'function')
    t.ok(result instanceof Array)
    t.equal(result.length, 2)
    t.ok(result[0] instanceof Element)
    t.ok(result[1] instanceof Element)
    t.equal(result[0].textContent, 'foo')
    t.equal(result[1].textContent, 'bar')
    t.end()
  })

  test('selectAllHeaderElement', t => {
    const result = selectAllHeaderElement(document)

    t.ok(result instanceof Array)
    t.equal(result.length, 2)
    t.end()
  })
})

test(({test}) => {
  const { window } = new JSDOM(`
    <p id="foo">bar</p>
    <p id="baz"></p>
  `)
  const {
    Element,
    document
  } = window

  test('hasText', t => {
    const foo = document.getElementById('foo')
    const baz = document.getElementById('baz')

    t.ok(hasText(foo))
    t.notOk(hasText(baz))
    t.end()
  })

  test('filterEmptyText', t => {
    const elements = Array.from(document.getElementsByTagName('p'))
    const result = filterEmptyText(elements)

    t.ok(result[0] instanceof Element)
    t.equal(result.length, 1)
    t.equal(result[0].id, 'foo')
    t.end()
  })

  test('createHeaders', t => {
    const elements = Array.from(document.getElementsByTagName('p'))
    const f = createHeaders(map(p => {
      return ['#example', 1, p.textContent]
    }))
    const result = f(elements)

    t.equal(typeof f, 'function')
    t.deepEqual(result, [{ link: '#example', level: 1, text: 'bar' }])
    t.end()
  })

  test('id2link', t => {
    const foo = document.getElementById('foo')
    const baz = document.getElementById('baz')

    t.equal(id2link(foo), '#foo')
    t.equal(id2link(baz), '#baz')
    t.end()
  })
})

test('hrefOrID', t => {
  const { window } = new JSDOM(`
    <h2>
      <a id="user-content-license" class="anchor" href="#license"></a>
      License
    </h2>
  `, {
    url: 'https://example.com'
  })
  const {
    document
  } = window
  const a = document.querySelector('.anchor')
  const f = hrefOrID(true)
  const g = hrefOrID(false)

  t.equal(typeof f, 'function')
  t.equal(typeof g, 'function')
  t.equal(f(a), '#license')
  t.equal(g(a), '#user-content-license')
  t.end()
})

test('hash', t => {
  t.equal(hash('foo'), '#foo')
  t.end()
})

test('trimmedText', t => {
  const { window } = new JSDOM(`
    <p>foo </p>
    <p>  bar</p>
    <p>   </p>
  `)
  const {
    document
  } = window
  const [foo, bar, space] = document.getElementsByTagName('p')

  t.equal(trimmedText(foo), 'foo')
  t.equal(trimmedText(bar), 'bar')
  t.equal(trimmedText(space), '')
  t.end()
})

test('headerLevel', t => {
  const { window } = new JSDOM(`
      <h1 id="foo">foo</h1>
      <h2 id="bar">bar</h2>
      <h3 id="baz">baz</h3>
  `)
  const {
    document
  } = window
  const foo = document.getElementById('foo')
  const bar = document.getElementById('bar')
  const baz = document.getElementById('baz')

  t.equal(headerLevel(foo), 1)
  t.equal(headerLevel(bar), 2)
  t.equal(headerLevel(baz), 3)
  t.end()
})

test('element2Array', t => {
  const { window } = new JSDOM(`
    <p id="foo" tabindex="42">
      baz
    </p>
  `)
  const {
    document
  } = window
  const f = element2Array(
    () => 'foo',
    () => 42,
    () => 'baz'
  )
  const g = element2Array(
    elm => elm.id,
    elm => Number(elm.getAttribute('tabindex')),
    elm => elm.textContent.trim()
  )
  const root = document.getElementById('foo')
  const resultF = f(root)
  const resultG = g(root)

  t.equal(typeof f, 'function')
  t.equal(typeof g, 'function')
  t.deepEqual(resultF, ['foo', 42, 'baz'])
  t.deepEqual(resultG, ['foo', 42, 'baz'])
  t.end()
})
