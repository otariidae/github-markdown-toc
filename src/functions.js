import { prop, filter, pipe } from './functional-util.js'

/**
 * @typedef {Object} HeaderObject
 * @property {string} link
 * @property {number} level
 * @property {string} text
 */

/**
 * @typedef {HeaderObject[]} HeaderList
 */

/**
 * @param {string} link
 * @param {number} level
 * @param {string} text
 * @returns {HeaderObject}
 */
export function createHeader (link, level, text) {
  return {
    link,
    level,
    text
  }
}

/**
 * @param {string} query
 * @returns {function(root: Element): NodeList}
 */
export function querySelectorAll (query) {
  return function querySelectorAllInner (root) {
    return root.querySelectorAll(query)
  }
}

/**
 * @param {string} query
 * @returns {function(root: Element): Element[]}
 */
export function querySelectorAllArray (query) {
  return pipe(querySelectorAll(query), Array.from)
}

export const hasEmptyText = pipe(prop('textContent'), Boolean)

export const filterEmptyText = fun => pipe(filter(hasEmptyText), fun)

export const selectAllHeaderElement = querySelectorAllArray('h1, h2, h3, h4, h5, h6')

