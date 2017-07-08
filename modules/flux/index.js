import EventEmitter from '../event-emitter/index.js'
import deepAssign from '../deep-assign/index.js'
const ON_CHANGE = Symbol('on-change')

export class Action {
  /** @private */
  _dispatcher
  /**
   * @param {EventEmitter} dispatcher
   */
  constructor (dispatcher) {
    this._dispatcher = dispatcher
  }
  /**
   * Emit a event with data
   * @param {Symbol} key - event name
   * @param {*} data
   */
  dispatch (key, data) {
    this._dispatcher.emit(key, data)
  }
}

export class Store extends EventEmitter {
  /** @private */
  _state = {}
  /** @private */
  _dispatcher
  /**
   * @param {EventEmitter} dispatcher
   */
  constructor (dispatcher) {
    super()
    this._dispatcher = dispatcher
  }
  /**
   * @param {object} data
   */
  setState (data) {
    this._state = deepAssign({}, this._state, data)
    this.emit(ON_CHANGE)
  }
  /**
   * @returns {object}
   */
  getState () {
    return deepAssign({}, this._state)
  }
  /**
   * @param {Symbol} key
   * @param {function} func
   */
  register (key, func) {
    this._dispatcher.on(key, func)
  }
  /**
   * @param {function} func
   */
  onChange (func) {
    this.on(ON_CHANGE, func)
  }
  /**
   * @param {function} func
   * @returns {boolean}
   */
  removeChangeListener (func) {
    return this.off(ON_CHANGE, func)
  }
}

export const Dispatcher = EventEmitter
