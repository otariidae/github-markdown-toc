/**
 * @param {string|Symbol} property
 * @returns {function(object)}
 */
export function prop (property) {
  return object => object[property]
}

/**
 * @param {function} fun
 * @returns {function(Array): Array}
 */
export function map (fun) {
  return arr => arr.map(fun)
}

/**
 * @param {function: boolean} fun
 * @returns {function(Array): Array}
 */
export function filter (fun) {
  return arr => arr.filter(fun)
}

/**
 * @param {function} f
 * @param {function} g
 * @returns {function(...args)}
 */
function _pipe (f, g) {
  return (...args) => g(f(...args))
}

/**
 * @param {...function} funs
 * @returns {function}
 */
export function pipe (...funs) {
  return funs.reduce(_pipe)
}

/**
 * @param {function} fun
 * @returns {function(Array)}
 */
export function apply (fun) {
  return arg => fun(...arg)
}

/**
 * @param {*} arg
 * @returns {function}
 */
export function always (arg) {
  return () => arg
}
