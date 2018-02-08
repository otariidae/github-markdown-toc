import { describe, it as test } from 'kocha'
import t from 'assert'
import { JSDOM } from 'jsdom'
import {
  createOutlineFrom,
  outlineSectionIterator,
  isEmptyOutline,
  findSectionBySelector
} from '../src/js/outline-utils.js'

describe('createOutlineFrom', () => {
  test('div', () => {
    const { document } = new JSDOM(`
      <div id="root">
        <h1>TEST</h1>
      </div>
    `).window
    const root = document.getElementById('root')
    const outline = createOutlineFrom(root)

    t.ok(Object.is(outline.sections[0].startingNode, document.body))
  })
})

describe('outlineSectionIterator', () => {
  test('iterator', () => {
    const outline = {
      sections: []
    }
    const iterator = outlineSectionIterator(outline)
    t.ok(Symbol.iterator in iterator)
  })
  test('count', () => {
    const outline = {
      sections: [
        { sections: [] }, // 1
        {
          sections: [
            // 2
            { sections: [] }, // 3
            { sections: [] } //4
          ]
        }
      ]
    }
    const iterator = outlineSectionIterator(outline)
    t.equal([...iterator].length, 4)
  })
})

describe('isEmptyOutline', () => {
  test('embeded empty sections', () => {
    const { document } = new JSDOM(`
    <section>
      <section>
      </section>
    </section>
    `).window
    const outline = createOutlineFrom(document.body)
    t.ok(isEmptyOutline(outline))
  })
  test('0 length', () => {
    const { document } = new JSDOM('').window
    const outline = createOutlineFrom(document.body)
    t.ok(isEmptyOutline(outline))
  })
  test('not empty', () => {
    const { document } = new JSDOM(`
      <h1>TEST</h1>
    `).window
    const outline = createOutlineFrom(document.body)
    t.ifError(isEmptyOutline(outline))
  })
})

describe('findSectionBySelector', () => {
  const { document } = new JSDOM(`
    <div class="matched-class">
      <h1>TEST</h1>
    </div>
  `).window
  const outline = createOutlineFrom(document.body)
  test('found', () => {
    const h1 = document.querySelector('h1')
    t.ok(
      Object.is(findSectionBySelector(outline, '.matched-class').heading, h1)
    )
  })
  test('not found', () => {
    t.equal(findSectionBySelector(outline, '.non-matched-class'), null)
  })
})
