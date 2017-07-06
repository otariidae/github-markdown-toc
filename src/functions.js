import {
  curry1,
  prop,
  filter,
  pipe,
  apply,
  always
} from '../modules/functional-util/index.js'

export class Heading {
  /**
   * @param {string} link
   * @param {number} level
   * @param {string} text
   */
  constructor (link = '', level = 1, text = '') {
    this.link = link
    this.level = level
    this.text = text
    this.parent = null
    this.children = []
  }
  /**
   * @param {Heading} child
   * @returns {Heading}
   */
  appendChild (child) {
    this.children.push(child)
    child.parent = this
    return child
  }
}

export class HeadingRoot extends Heading {
  constructor () {
    super(null, 0, null)
  }
}

/**
 * @param {string} link
 * @param {number} level
 * @param {string} text
 * @returns {Heading}
 */
export function createHeading (link, level, text) {
  return new Heading(link, level, text)
}

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
 * @function
 * @param {Element}
 * @returns {string}
 */
export const id2link = pipe(prop('id'), hash)

/**
 * @param {boolean} isHref
 * @returns {function(HTMLAnchorElement): string}
 */
export const hrefOrID = isHref => (isHref ? prop('hash') : id2link)

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
 * @returns {number}
 */
export const headingLevel = pipe(prop('tagName'), prop(1), Number)

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
 * @param {object} current
 * @param {object} previous
 * @returns {Object}
 */
function findParent (current, previous) {
  if (current.level > previous.level) {
    return previous
  } else if (current.level === previous.level) {
    return previous.parent
  } else {
    return findParent(current, previous.parent)
  }
}

/**
 * @param {Array} arr
 * @returns {HeadingRoot}
 */
export function createTree (arr) {
  const root = new HeadingRoot()
  arr.map(apply(createHeading)).reduce((previous, current) => {
    const parent = findParent(current, previous)
    return parent.appendChild(current)
  }, root)
  return root
}

/**
 * @param {function} fun
 * @returns {function(Element): HeadingRoot}
 */
export function createHeadings (fun) {
  return pipe(filterEmptyText, fun, createTree)
}

/**
 * @function
 * @param {Element}
 * @returns {HTMLHeadingElement[]}
 */
export const selectAllHeadingElement = querySelectorAllArray(
  'h1, h2, h3, h4, h5, h6'
)

/**
 * @param {string} query
 * @returns {function(Element): Element[]}
 */
export function selectAllHeaderElementFrom (query) {
  return root => {
    const element = root.querySelector(query)
    if (!element) return []
    return selectAllHeadingElement(element)
  }
}

/**
 * @param {function(Element, ...*): string} link
 * @param {function(Element, ...*): number} level
 * @param {function(Element, ...*): string} text
 * @param {object} [options]
 * @returns {function(Element): (string|number)[]}
 */
export function element2Array (link, level, text, ...options) {
  return element => [link, level, text].map(fun => fun(element, ...options))
}

/**
 * @param {number} level
 * @returns {function(Element): (string|number)[]}
 */
export function element2ArrayAnchorAndFlatLevel (level) {
  return element2Array(
    pipe(querySelector('a'), prop('href')),
    always(level),
    trimmedText
  )
}

/**
 * @param {boolean} isJSEnabled
 * @returns {function(Element): (string|number)[]}
 */
export function markdownElement2Array (isJSEnabled) {
  return element2Array(
    pipe(querySelector('.anchor'), hrefOrID(isJSEnabled)),
    headingLevel,
    trimmedText
  )
}
