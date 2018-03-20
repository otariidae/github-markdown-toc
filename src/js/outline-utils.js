import { pipe, prop, always, has } from '../../modules/functional-util/index.js'
import { trimmedText, isRoot } from './functions.js'
import createOutline from 'h5o'

/**
 * @function
 * @returns {Object}
 */
export const createEmptyHeadingList = always({
  text: '',
  link: null,
  sections: []
})

/**
 * @param {Element} element
 * @returns {Object}
 */
export function createOutlineFrom (element) {
  const root = isRoot(element) ? element : wrapWithRoot(element)
  return createOutline(root)
}

function wrapWithRoot (element) {
  const frag = document.createDocumentFragment()
  const root = document.createElement('body')
  root.appendChild(element.cloneNode(true))
  frag.appendChild(root)
  return root
}

export function createTreeFrom (element) {
  const outline = createOutlineFrom(element)
  return outline2tree(outline)
}

/**
 * traverse outline
 * @param {Object} outline
 */
function outline2tree (outline) {
  const sections = outline.sections.map(outline2tree)

  if (outline.heading === undefined || isEmptyHeading(outline)) {
    return {
      link: null,
      text: '',
      sections
    }
  } else {
    const a = outline.heading.querySelector('a')
    return {
      link: a ? a.href : null,
      text: trimmedText(outline.heading),
      sections
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

export function isEmptyTree (tree) {
  if (tree.sections.length === 0) {
    return true
  }
  const sections = Array.from(outlineSectionIterator(tree))
  const hasNonEmptyNode = sections.some(section => section.text !== '')
  return !hasNonEmptyNode
}
