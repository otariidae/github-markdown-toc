import { describe, it as test, before, after } from 'kocha'
import t from 'assert'
import { Heading, HeadingRoot } from '../src/js/heading.js'

describe('Heading', () => {
  describe('new', () => {
    const root = new Heading()

    test('properties', () => {
      t.equal(root.link, '')
      t.equal(root.level, 1)
      t.equal(root.text, '')
      t.equal(root.parent, null)
      t.deepStrictEqual(root.children, [])
    })
  })
  test('appendChild', () => {
    const root = new Heading('#foo', 1)
    const child = new Heading('#bar', 6)
    root.appendChild(child)

    t.ok(Object.is(root.children[0], child))
    t.ok(Object.is(child.parent, root))
  })
})

describe('HeadingRoot', () => {
  const root = new HeadingRoot()

  test('inheritance', () => {
    t.ok(root instanceof Heading)
  })
  test('properties', () => {
    t.equal(root.link, '')
    t.equal(root.level, 0)
    t.equal(root.text, '')
    t.equal(root.parent, null)
    t.deepStrictEqual(root.children, [])
  })
})
