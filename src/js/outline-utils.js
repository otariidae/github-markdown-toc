import { always, curry1 } from '../../modules/functional-util/index.js'
import {
  isSectioningRoot,
  isSectioningContent,
  findSectioningRoot,
  hasParentBySelector
} from './functions.js'
import createOutline from 'h5o'

/**
 * @function
 * @returns {Object}
 */
export const createEmptyHeadingList = always({
  heading: {
    implied: true
  },
  sections: []
})

/**
 * @param {Object}
 * @returns {Object}
 */
export function wrapSectionInOutline (section) {
  return {
    sections: [section]
  }
}

/**
 * @param {string} query
 * @param {Element} root
 * @returns {Object}
 */
function _createOutlineFrom (element) {
  const root =
    isSectioningRoot(element) || isSectioningContent(element)
      ? element
      : findSectioningRoot(element)
  const outline = createOutline(root)
  traverseOutline(outline)
  return outline
}

/**
 * @function
 * @param {string} query
 * @returns {function(Element): Element[]}
 */
export const createOutlineFrom = curry1(_createOutlineFrom)

/**
 * @param {Object} outline
 */
function traverseOutline (outline) {
  for (const section of outlineSectionIterator(outline)) {
    if (isEmptyHeading(section)) {
      section.text = ''
      section.link = null
    } else {
      const a = section.heading.querySelector('a')
      section.link = a ? a.href : null
      section.text = section.heading.textContent
    }
  }
}

/**
 * @param {object} outline
 * @returns {Generator}
 */
export function * outlineSectionIterator (outline) {
  for (const section of outline.sections) {
    yield section
    yield * outlineSectionIterator(section)
  }
}

/**
 * @param {object} section
 * @returns {boolean}
 */
function isEmptyHeading (section) {
  return 'implied' in section.heading
}

/**
 * @param {object} outline
 * @returns {boolean}
 */
export function isEmptyOutline (outline) {
  if (outline.sections.length === 0) {
    return true
  } else {
    for (const section of outlineSectionIterator(outline)) {
      if (!isEmptyHeading(section)) {
        return false
      }
    }
    return true
  }
}

/**
 * @param {object} outline
 * @param {string} selector
 * @returns {?Object}
 */
export function findSectionBySelector (outline, selector) {
  for (const section of outlineSectionIterator(outline)) {
    if (isEmptyHeading(section)) {
      continue
    }
    if (hasParentBySelector(section.heading, selector)) {
      return section
    }
  }
  return null
}
