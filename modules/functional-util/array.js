import { curry1 } from './function.js'

/**
 * @private
 * @param {string|Symbol} property
 * @param {object} object
 * @returns {*}
 */
function _prop (property, object) {
  return object[property]
}

/**
 * @private
 * @param {function} fun
 * @param {Array} arr
 * @returns {Array}
 */
function _map (fun, arr) {
  return arr.map(fun)
}

/**
 * @private
 * @param {function} fun
 * @param {Array} arr
 * @returns {Array}
 */
function _filter (fun, arr) {
  return arr.filter(fun)
}

/**
 * @param {string|Symbol} property
 * @returns {function(object)}
 */
export const prop = curry1(_prop)

/**
 * @param {function} fun
 * @returns {function(Array): Array}
 */
export const map = curry1(_map)

/**
 * @param {function: boolean} fun
 * @returns {function(Array): Array}
 */
export const filter = curry1(_filter)
