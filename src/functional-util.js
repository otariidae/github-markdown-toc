/**
 * @param {string|Symbol} property
 * @returns {function(object: Object)}
 */
export function prop (property) {
  return function propInner (object) {
    return object[property]
  }
}

/**
 * @param {function} fun
 * @returns {function(arr: Array): Array}
 */
export function map (fun) {
  return function mapInner (arr) {
    return arr.map(fun)
  }
}

/**
 * @param {function: boolean} fun
 * @returns {function(arr: Array): Array}
 */
export function filter (fun) {
  return function filterInner (arr) {
    return arr.filter(fun)
  }
}

/**
 * @param {function} f
 * @param {function} g
 * @returns {function(...args)}
 */
function _pipe (f, g) {
  return function (...args) {
    return g(f(...args))
  }
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
 * @returns {function(arg: Array)}
 */
export function apply (fun) {
  return function applyInner (arg) {
    return fun(...arg)
  }
}

/**
 * @param {*} arg
 * @returns {function}
 */
export function always (arg) {
  return function alwaysInner () {
    return arg
  }
}
