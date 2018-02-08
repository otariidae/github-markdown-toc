import { pipe, prop, always, has } from '../../modules/functional-util/index.js'
import {
  trimmedText,
  isRoot,
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
 * @param {Element} element
 * @returns {Object}
 */
export function createOutlineFrom (element) {
  const root = isRoot(element) ? element : findSectioningRoot(element)
  const outline = createOutline(root)
  traverseOutline(outline)
  return outline
}

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
      section.text = trimmedText(section.heading)
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
 * @function
 * @param {object} section
 * @returns {boolean}
 */
const isEmptyHeading = pipe(prop('heading'), has('implied'))

/**
 * @param {object} outline
 * @returns {boolean}
 */
export function isEmptyOutline (outline) {
  if (outline.sections.length === 0) {
    return true
  }
  const sections = Array.from(outlineSectionIterator(outline))
  const hasNonEmptySection = sections.some(section => !isEmptyHeading(section))
  return !hasNonEmptySection
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
