import {
  curry1,
  prop,
  filter,
  pipe
} from '../../modules/functional-util/index.js'

/**
 * @param {string} query
 * @param {Element} root
 * @returns {Node}
 */
function _querySelector (query, root) {
  return root.querySelector(query)
}

/**
 * @param {string} query
 * @param {Element} root
 * @returns {NodeList}
 */
function _querySelectorAll (query, root) {
  return root.querySelectorAll(query)
}

/**
 * @function
 * @param {string} query
 * @returns {function(Element): Node}
 */
export const querySelector = curry1(_querySelector)

/**
 * @function
 * @param {string} query
 * @returns {function(Element): NodeList}
 */
export const querySelectorAll = curry1(_querySelectorAll)

/**
 * @param {string} query
 * @returns {function(Element): Element[]}
 */
export function querySelectorAllArray (query) {
  return pipe(querySelectorAll(query), Array.from)
}

/**
 * @param {string} str
 * @returns {string}
 */
export const hash = str => `#${str}`

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
 * @function
 * @param {Node}
 * @returns {boolean}
 */
export const hasText = pipe(prop('textContent'), Boolean)

/**
 * @function
 * @param {Node[]}
 * @returns {Node[]}
 */
export const filterEmptyText = filter(hasText)

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
