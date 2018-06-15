import { prop, pipe, or } from '../../modules/functional-util/index.js'

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
export const trimmedText = pipe(
  prop('textContent'),
  trim
)

/**
 * @param {string} str
 * @returns {string}
 */
const toLowerCase = str => str.toLowerCase()

/**
 * @function
 * @param {Element}
 * @returns {string}
 */
const toLowerTagName = pipe(
  prop('tagName'),
  toLowerCase
)

/**
 * @param {string[]}
 * @returns {function(Element): boolean}
 */
function createTagNameMatcher (tagNames) {
  const loweredTagNames = tagNames.map(toLowerCase)
  return pipe(
    toLowerTagName,
    loweredTagNames.includes.bind(loweredTagNames)
  )
}

/**
 * @function
 * @param {Element}
 * @returns {booelan}
 */
const isSectioningRoot = createTagNameMatcher([
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
const isSectioningContent = createTagNameMatcher([
  'article',
  'aside',
  'nav',
  'section'
])

/**
 * @function
 * @param {Element}
 * @returns {booelan}
 */
export const isRoot = or(isSectioningRoot, isSectioningContent)
