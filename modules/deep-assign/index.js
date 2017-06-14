import isPlainObject from '../is-plain-object/index.js'

/**
 * @param {object} obj
 * @returns {object}
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
 * @returns {object}
 */
export default function deepAssign (target, ...sources) {
  const copies = sources.map(source =>
    isPlainObject(source) ? copyObject(source) : source
  )
  return Object.assign(target, ...copies)
}
