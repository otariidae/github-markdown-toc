'use strict'
import EventEmitter from '../event-emitter/index.js'
import deepAssign from '../deep-assign/index.js'
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
