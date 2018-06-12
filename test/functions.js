import { describe, it as test } from 'kocha'
import { strict as t } from 'assert'
import { JSDOM } from 'jsdom'
import { trimmedText } from '../src/js/functions.js'

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
