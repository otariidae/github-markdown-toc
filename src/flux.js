import EventEmitter from 'tiny-emitter'
import deepAssign from './deep-assign.js'
const ON_CHANGE = Symbol('on-change')

export class Action {
  /**
   * @param {EventEmitter} dispatcher
   */
  constructor (dispatcher) {
    /** @private */
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
  /**
   * @param {EventEmitter} dispatcher
   */
  constructor (dispatcher) {
    super()
    /** @private */
    this._state = {}
    /** @private */
    this._dispatcher = dispatcher
  }
  /**
   * @param {Object} data
   */
  setState (data) {
    this._state = deepAssign({}, this._state, data)
    this.emit(ON_CHANGE)
  }
  /**
   * @returns {Object}
   */
  getState () {
    return deepAssign({}, this._state)
  }
  /**
   * @param {Sybol} key
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
}
