import { prop, pipe } from '../../modules/functional-util/index.js'

/**
 * @param {string} str
 * @returns {string}
 */
const trim = str => str.trim()

/**
 * @function
 * @param {Node}
 * @returns {string}
 */
export const trimmedText = pipe(prop('textContent'), trim)

/**
 * @param {string[]}
 * @returns {function(Element): boolean}
 */
function createTagNameMatcher (tagNames) {
  const loweredTagNames = tagNames.map(str => str.toLowerCase())
  return element => {
    const tagName = element.tagName.toLowerCase()
    return loweredTagNames.includes(tagName)
  }
}

/**
 * @function
 * @param {Element}
 * @returns {booelan}
 */
export const isSectioningRoot = createTagNameMatcher([
  'blockquote',
  'body',
  'details',
  'dialog',
  'fieldset',
  'figure',
  'td'
])

/**
 * @function
 * @param {Element}
 * @returns {booelan}
 */
export const isSectioningContent = createTagNameMatcher([
  'article',
  'aside',
  'nav',
  'section'
])

/**
 * @param {Element}
 * @returns {Element}
 */
export function findSectioningRoot (element) {
  const parent = element.parentElement
  return isSectioningRoot(parent) || isSectioningContent(parent)
    ? parent
    : findSectioningRoot(parent)
}

/**
 * @param {Element}
 * @param {string}
 * @returns {boolean}
 */
export function hasParentBySelector (element, selector) {
  return element.matches(`${selector} *`)
}
