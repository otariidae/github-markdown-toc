/**
 * event emitter
 */
export default class EventEmitter {
  /** @private */
  _handlers = new Map()
  /**
   * @param {string|Symbol} type
   * @param {function} handler
   */
  on (type, handler) {
    if (!this._has(type)) {
      this._handlers.set(type, new Set())
    }
    this._handlers.get(type).add(handler)
  }
  /**
   * @param {string|Symbol} type
   * @param {function} handler
   * @returns {boolean}
   */
  off (type, handler) {
    if (!this._has(type)) {
      return false
    }
    return this._handlers.get(type).delete(handler)
  }
  /**
   * @param {string|Symbol} type
   * @param {*} data
   */
  emit (type, data) {
    if (this._has(type)) {
      this._handlers.get(type).forEach(func => func(data))
    }
  }
  /**
   * @param {string|Symbol} type
   * @returns {boolean}
   */
  _has (type) {
    return this._handlers.has(type)
  }
}
