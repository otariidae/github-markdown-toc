const isPlainObject = require('is-plain-object')

function copyObject (obj) {
  let copy = {}
  if (isPlainObject(obj)) {
    Object.keys(obj).forEach(k => {
      if (isPlainObject(obj[k])) {
        copy[k] = copyObject(obj[k])
      }
    })
  }
  return Object.assign({}, obj, copy)
}

function deepAssign (target, ...sources) {
  const copies = sources.map(source => copyObject(source))
  return Object.assign(target, ...copies)
}

module.exports = deepAssign
