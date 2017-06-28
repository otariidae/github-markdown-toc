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
