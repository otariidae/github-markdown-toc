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
 * @param {function} fun
 * @param {Array} arg
 * @returns {*}
 */
const _apply = (fun, arg) => fun(...arg)

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
export const apply = curry1(_apply)

/**
 * @param {*} arg
 * @returns {function}
 */
export const always = arg => () => arg
