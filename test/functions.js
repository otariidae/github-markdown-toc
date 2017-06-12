import test from 'tape'
import { JSDOM } from 'jsdom'
import { map } from '../src/functional-util.js'
import { createHeader, querySelector, querySelectorAll, querySelectorAllArray, hash, id2link, hrefOrID, trimmedText, headerLevel, hasText, filterEmptyText, createHeaders, selectAllHeaderElement, element2Array, markdownElement2Array } from '../src/functions.js'

// shared classes
const {
  NodeList,
  Element
} = (new JSDOM('')).window

test('createHeader', t => {
  t.deepEqual(createHeader('foo', 42, 'bar'), {
    link: 'foo',
    level: 42,
    text: 'bar'
  })
  t.end()
})

test(({ test }) => {
  const frag = JSDOM.fragment(`
    <article class="markdown-body">
      <h1>foo</h1>
      <h2>bar</h2>
      <p>baz</p>
    </article>
  `)
  const foo = frag.querySelector('h1')
  const bar = frag.querySelector('h2')

  test('querySelector', t => {
    const f = querySelector('h1')
    const result = f(frag)

    t.equal(typeof f, 'function')
    t.ok(Object.is(result, foo))
    t.end()
  })

  test('querySelectorAll', t => {
    const f = querySelectorAll('h1, h2')
    const result = f(frag)
    const [_foo, _bar] = result

    t.equal(typeof f, 'function')
    t.ok(result instanceof NodeList)
    t.equal(result.length, 2)
    t.ok(Object.is(_foo, foo))
    t.ok(Object.is(_bar, bar))
    t.end()
  })

  test('querySelectorAllArray', t => {
    const f = querySelectorAllArray('h1, h2')
    const result = f(frag)
    const [_foo, _bar] = result

    t.equal(typeof f, 'function')
    t.ok(result instanceof Array)
    t.equal(result.length, 2)
    t.ok(Object.is(_foo, foo))
    t.ok(Object.is(_bar, bar))
    t.end()
  })

  test('selectAllHeaderElement', t => {
    const result = selectAllHeaderElement(frag)
    const [_foo, _bar] = result

    t.ok(result instanceof Array)
    t.equal(result.length, 2)
    t.ok(Object.is(_foo, foo))
    t.ok(Object.is(_bar, bar))
    t.end()
  })
})

test(({ test }) => {
  const frag = JSDOM.fragment(`
    <p id="foo">bar</p>
    <p id="baz"></p>
  `)
  const elements = Array.from(frag.children)
  const [foo, baz] = elements
  test('hasText', t => {
    t.ok(hasText(foo))
    t.notOk(hasText(baz))
    t.end()
  })

  test('filterEmptyText', t => {
    const result = filterEmptyText(elements)
    const [_foo] = result

    t.ok(foo instanceof Element)
    t.equal(result.length, 1)
    t.ok(Object.is(_foo, foo))
    t.end()
  })

  test('createHeaders', t => {
    const f = createHeaders(map(p => ['#example', 1, p.textContent]))
    const result = f(elements)

    t.equal(typeof f, 'function')
    t.deepEqual(result, [{ link: '#example', level: 1, text: 'bar' }])
    t.end()
  })

  test('id2link', t => {
    t.equal(id2link(foo), '#foo')
    t.equal(id2link(baz), '#baz')
    t.end()
  })
})

test('hrefOrID', t => {
  const frag = JSDOM.fragment(`
    <h2>
      <a id="user-content-license" class="anchor" href="#license"></a>
      License
    </h2>
  `)
  const a = frag.querySelector('.anchor')
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
  const frag = JSDOM.fragment(`
    <p>foo </p>
    <p>  bar</p>
    <p>   </p>
  `)
  const [foo, bar, space] = frag.children

  t.equal(trimmedText(foo), 'foo')
  t.equal(trimmedText(bar), 'bar')
  t.equal(trimmedText(space), '')
  t.end()
})

test('headerLevel', t => {
  const frag = JSDOM.fragment(`
      <h1>foo</h1>
      <h2>bar</h2>
      <h3>baz</h3>
  `)
  const [foo, bar, baz] = frag.children

  t.equal(headerLevel(foo), 1)
  t.equal(headerLevel(bar), 2)
  t.equal(headerLevel(baz), 3)
  t.end()
})

test('element2Array', t => {
  const frag = JSDOM.fragment(`
    <p id="foo" tabindex="42">
      baz
    </p>
  `)
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
  const root = frag.firstElementChild
  const resultF = f(root)
  const resultG = g(root)

  t.equal(typeof f, 'function')
  t.equal(typeof g, 'function')
  t.deepEqual(resultF, ['foo', 42, 'baz'])
  t.deepEqual(resultG, ['foo', 42, 'baz'])
  t.end()
})

test('markdownElement2Array', t => {
  const frag = JSDOM.fragment(`
    <h1>
      <a id="user-content-license" class="anchor" href="#license"></a>
      License
    </h1>
  `)
  const h = frag.firstElementChild
  const f = markdownElement2Array(true)
  const g = markdownElement2Array(false)

  t.equal(typeof f, 'function')
  t.equal(typeof g, 'function')
  t.deepEqual(f(h), ['#license', 1, 'License'])
  t.deepEqual(g(h), ['#user-content-license', 1, 'License'])
  t.end()
})
