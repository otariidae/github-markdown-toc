/**
 * @param {string|Symbol} property
 * @returns {function(object)}
 */
export const prop = property => object => object[property]

/**
 * @param {function} fun
 * @returns {function(Array): Array}
 */
export const map = fun => arr => arr.map(fun)

/**
 * @param {function: boolean} fun
 * @returns {function(Array): Array}
 */
export const filter = fun => arr => arr.filter(fun)
