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
 * @param {string|Symbol} property
 * @returns {function(object)}
 */
export const prop = curry1(_prop)
