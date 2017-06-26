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
 * @param {function} fun
 * @returns {function(Array)}
 */
export const apply = fun => arg => fun(...arg)

/**
 * @param {*} arg
 * @returns {function}
 */
export const always = arg => () => arg
