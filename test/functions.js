import test from 'tape'
import { JSDOM } from 'jsdom'
import { createHeader, querySelectorAll, querySelectorAllArray, hasText, filterEmptyText, selectAllHeaderElement } from '../src/functions.js'

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
})
