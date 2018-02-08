import { describe, it as test } from 'kocha'
import t from 'assert'
import { JSDOM } from 'jsdom'
import {
  querySelector,
  querySelectorAll,
  querySelectorAllArray,
  hash,
  trimmedText,
  hasText,
  filterEmptyText
} from '../src/js/functions.js'

// shared classes
const { NodeList, Element } = new JSDOM('').window

{
  const frag = JSDOM.fragment(`
    <article class="markdown-body">
      <h1>foo</h1>
      <h2>bar</h2>
      <p>baz</p>
    </article>
  `)
  const foo = frag.querySelector('h1')
  const bar = frag.querySelector('h2')

  describe('querySelector', () => {
    test('basic', () => {
      const result = querySelector('h1', frag)
      t.ok(Object.is(result, foo))
    })
    test('curry', () => {
      const f = querySelector('h1')
      const result = f(frag)

      t.equal(typeof f, 'function')
      t.ok(Object.is(result, foo))
    })
  })

  test('querySelectorAll', () => {
    test('basic', () => {
      const result = querySelectorAll('h1, h2', frag)
      const [_foo, _bar] = result

      t.ok(result instanceof NodeList)
      t.equal(result.length, 2)
      t.ok(Object.is(_foo, foo))
      t.ok(Object.is(_bar, bar))
    })

    test('curry', () => {
      const f = querySelectorAll('h1, h2')
      const result = f(frag)
      const [_foo, _bar] = result

      t.equal(typeof f, 'function')
      t.ok(result instanceof NodeList)
      t.equal(result.length, 2)
      t.ok(Object.is(_foo, foo))
      t.ok(Object.is(_bar, bar))
    })
  })

  test('querySelectorAllArray', () => {
    const f = querySelectorAllArray('h1, h2')
    const result = f(frag)
    const [_foo, _bar] = result

    t.equal(typeof f, 'function')
    t.ok(Array.isArray(result))
    t.equal(result.length, 2)
    t.ok(Object.is(_foo, foo))
    t.ok(Object.is(_bar, bar))
  })
}

{
  const frag = JSDOM.fragment(`
    <p id="foo">bar</p>
    <p id="baz"></p>
  `)
  const elements = Array.from(frag.children)
  const [foo, baz] = elements
  test('hasText', () => {
    t.ok(hasText(foo))
    t.ifError(hasText(baz))
  })

  test('filterEmptyText', () => {
    const result = filterEmptyText(elements)
    const [_foo] = result

    t.ok(foo instanceof Element)
    t.equal(result.length, 1)
    t.ok(Object.is(_foo, foo))
  })
}

test('hash', () => {
  t.equal(hash('foo'), '#foo')
})

describe('trimmedText', () => {
  const frag = JSDOM.fragment(`
    <p>foo </p>
    <p>  bar</p>
    <p>   </p>
  `)
  const [foo, bar, space] = frag.children

  test('right', () => {
    t.equal(trimmedText(foo), 'foo')
  })
  test('left', () => {
    t.equal(trimmedText(bar), 'bar')
  })
  test('all', () => {
    t.equal(trimmedText(space), '')
  })
})
