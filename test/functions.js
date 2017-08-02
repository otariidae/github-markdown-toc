import { describe, it as test } from 'kocha'
import t from 'assert'
import { JSDOM } from 'jsdom'
import { map } from '../modules/functional-util/index.js'
import {
  createHeading,
  querySelector,
  querySelectorAll,
  querySelectorAllArray,
  hash,
  id2link,
  hrefOrID,
  trimmedText,
  headingLevel,
  hasText,
  filterEmptyText,
  createTree,
  createHeadings,
  selectAllHeadingElement,
  element2Array,
  element2ArrayAnchorAndFlatLevel,
  markdownElement2Array
} from '../src/js/functions.js'
import { Heading, HeadingRoot } from '../src/js/heading.js'

// shared classes
const { NodeList, Element } = new JSDOM('').window

test('createHeading', () => {
  t.deepStrictEqual(
    createHeading('foo', 42, 'bar'),
    new Heading('foo', 42, 'bar')
  )
})

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
      const result = querySelector('h1')(frag)
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
      const result = querySelectorAll('h1, h2')(frag)
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

  test('createTree', () => {
    const a = [
      ['https://example.com', 1, 'foo'],
      ['https://example.com', 2, 'goo'],
      ['https://example.com', 1, 'hoo']
    ]
    const result = createTree(a)

    t.ok(result instanceof HeadingRoot)
    t.ok(result.children.every(item => item instanceof Heading))
    t.equal(result.children[0].text, 'foo')
    t.equal(result.children[0].children[0].text, 'goo')
    t.equal(result.children[1].text, 'hoo')
  })

  test('createHeadings', () => {
    const frag = JSDOM.fragment(`
      <h1>foo</h1>
      <h3>bar</h3>
      <h2>baz</h2>
    `)
    const elements = Array.from(frag.children)
    const f = createHeadings(
      map(p => ['#example', headingLevel(p), p.textContent])
    )
    const result = f(elements)

    t.equal(typeof f, 'function')
    t.ok(result instanceof Heading)
    t.ok(result.children.every(item => item instanceof Heading))
    t.ok(result.children[0].children.every(item => item instanceof Heading))
    t.equal(result.children.length, 1)
    t.equal(result.children[0].children.length, 2)
    t.equal(result.children[0].text, 'foo')
    t.equal(result.children[0].children[0].text, 'bar')
    t.equal(result.children[0].children[1].text, 'baz')
  })

  test('selectAllHeadingElement', () => {
    const result = selectAllHeadingElement(frag)
    const [_foo, _bar] = result

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

  test('id2link', () => {
    t.equal(id2link(foo), '#foo')
    t.equal(id2link(baz), '#baz')
  })
}

describe('hrefOrID', () => {
  const frag = JSDOM.fragment(`
    <h2>
      <a id="user-content-license" class="anchor" href="#license"></a>
      License
    </h2>
  `)
  const a = frag.querySelector('.anchor')

  test('true', () => {
    const f = hrefOrID(true)
    t.equal(typeof f, 'function')
    t.equal(f(a), '#license')
  })
  test('false', () => {
    const g = hrefOrID(false)
    t.equal(typeof g, 'function')
    t.equal(g(a), '#user-content-license')
  })
})

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

test('headingLevel', () => {
  const frag = JSDOM.fragment(`
      <h1>foo</h1>
      <h2>bar</h2>
      <h3>baz</h3>
  `)
  const [foo, bar, baz] = frag.children

  t.equal(headingLevel(foo), 1)
  t.equal(headingLevel(bar), 2)
  t.equal(headingLevel(baz), 3)
})

describe('element2Array', () => {
  const frag = JSDOM.fragment(`
    <p id="foo" tabindex="42">
      baz
    </p>
  `)
  const root = frag.firstElementChild

  test('simple', () => {
    const f = element2Array(() => 'foo', () => 42, () => 'baz')
    const result = f(root)
    t.equal(typeof f, 'function')
    t.deepStrictEqual(result, ['foo', 42, 'baz'])
  })
  test('basic use', () => {
    const f = element2Array(
      elm => elm.id,
      elm => Number(elm.getAttribute('tabindex')),
      elm => elm.textContent.trim()
    )
    const result = f(root)
    t.equal(typeof f, 'function')
    t.deepStrictEqual(result, ['foo', 42, 'baz'])
  })
})

describe('element2ArrayAnchorAndFlatLevel', () => {
  const frag = JSDOM.fragment(`
    <h1>
      <a href="/tag/v1.0.0">1.0.0</a>
    </h1>
  `)
  const h = frag.firstElementChild

  test('1', () => {
    const f = element2ArrayAnchorAndFlatLevel(1)
    t.equal(typeof f, 'function')
    t.deepStrictEqual(f(h), ['/tag/v1.0.0', 1, '1.0.0'])
  })
  test('42', () => {
    const f = element2ArrayAnchorAndFlatLevel(42)
    t.equal(typeof f, 'function')
    t.deepStrictEqual(f(h), ['/tag/v1.0.0', 42, '1.0.0'])
  })
})

describe('markdownElement2Array', () => {
  const frag = JSDOM.fragment(`
    <h1>
      <a id="user-content-license" class="anchor" href="#license"></a>
      License
    </h1>
  `)
  const h = frag.firstElementChild

  test('true', () => {
    const f = markdownElement2Array(true)
    t.equal(typeof f, 'function')
    t.deepStrictEqual(f(h), ['#license', 1, 'License'])
  })
  test('false', () => {
    const g = markdownElement2Array(false)
    t.equal(typeof g, 'function')
    t.deepStrictEqual(g(h), ['#user-content-license', 1, 'License'])
  })
})
