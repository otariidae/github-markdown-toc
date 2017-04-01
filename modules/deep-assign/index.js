;'use strict'
import isPlainObject from 'is-plain-object'

/**
 * @param {Object} obj
 * @returns {Object}
 */
function copyObject (obj) {
  let copy = {}
  Object.entries(obj).forEach(([k, v]) => {
    if (isPlainObject(v)) {
      copy[k] = copyObject(v)
    }
  })
  return Object.assign({}, obj, copy)
}

/**
 * @param {*} target
 * @param {...*} sources
 * @returns {Object}
 */
export default function deepAssign (target, ...sources) {
  const copies = sources.map(source =>
    isPlainObject(source) ? copyObject(source) : source
  )
  return Object.assign(target, ...copies)
}
