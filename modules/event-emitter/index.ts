// transform event handler for EventEmitter to one for EventTarget
const eventHandlerWrapper = eventHandler => customEvent =>
  eventHandler(customEvent.detail)

/**
 * event emitter
 */
export default class EventEmitter extends EventTarget {
  constructor () {
    super()
    /** @private */
    this._handlers = new Map() // map original handler to wrapped handler
  }
  /**
   * @param {string} type
   * @param {function} handler
   * @param {...options} Object
   */
  on (type, handler, ...options) {
    const wrappedHandler = eventHandlerWrapper(handler)
    this._handlers.set(handler, wrappedHandler)
    this.addEventListener(type, wrappedHandler, ...options)
  }
  /**
   * @param {string} type
   * @param {function} handler
   * @param {...options} Object
   */
  off (type, handler, ...options) {
    const wrappedHandler = this._handlers.get(handler)

    if (wrappedHandler === undefined) {
      return
    }

    this.removeEventListener(type, wrappedHandler, ...options)
  }
  /**
   * @param {string} type
   * @param {*} data
   */
  emit (type, data) {
    this.dispatchEvent(
      new CustomEvent(type, {
        detail: data
      })
    )
  }
}
