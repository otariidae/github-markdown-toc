export default function isPlainObject (obj) {
  if (!obj) {
    return false
  }
  const proto = Object.getPrototypeOf(obj)
  return Object.prototype.toString.call(obj) === '[object Object]' && (proto === Object.getPrototypeOf({}) || proto === null)
}
