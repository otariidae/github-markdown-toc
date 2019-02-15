// transform event handler for EventEmitter to one for EventTarget
function eventHandlerWrapper(eventHandler: Listener) {
  return (customEvent: CustomEvent<any>) => eventHandler(customEvent.detail)
}

type Listener = (...args: any[]) => void

/**
 * event emitter
 */
export default class EventEmitter extends EventTarget {
  private _handlers = new Map()
  public on(
    type: string,
    handler: Listener,
    options?: boolean | AddEventListenerOptions
  ) {
    const wrappedHandler = eventHandlerWrapper(handler)
    this._handlers.set(handler, wrappedHandler)
    this.addEventListener(type, wrappedHandler as any, options)
  }
  public off(
    type: string,
    handler: Listener,
    options?: EventListenerOptions | boolean
  ) {
    const wrappedHandler = this._handlers.get(handler)

    if (wrappedHandler === undefined) {
      return
    }

    this.removeEventListener(type, wrappedHandler, options)
  }
  public emit(type: string, data?: any) {
    this.dispatchEvent(
      new CustomEvent(type, {
        detail: data
      })
    )
  }
}
