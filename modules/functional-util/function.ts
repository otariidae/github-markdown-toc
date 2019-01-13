/**
 * @param {function} fun
 * @returns {function}
 */
export function curry1 (fun) {
  return (...arg) => {
    if (arg.length < fun.length) return fun.bind(null, ...arg)
    return fun(...arg)
  }
}

/**
 * @param {function} f
 * @param {function} g
 * @returns {function(...args)}
 */
const _pipe = (f, g) => (...args) => g(f(...args))

/**
 * @param {...function} funs
 * @returns {function}
 */
export const pipe = (...funs) => funs.reduce(_pipe)

/**
 * @param {*} arg
 * @returns {function}
 */
export const always = arg => () => arg

/**
 * @function
 * @param {Object} prop
 * @returns {boolean}
 */
const _has = (prop, obj) => prop in obj

/**
 * @param {string|Symbol} prop
 * @returns {function(Object): boolean}
 */
export const has = curry1(_has)

/**
 * @param {function} f
 * @param {function} g
 * @returns {function}
 */
export const or = (f, g) => (...args) => f(...args) || g(...args)

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
