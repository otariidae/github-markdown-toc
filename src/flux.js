import EventEmitter from 'tiny-emitter'
import deepAssign from './deep-asign.js'
const ON_CHANGE = Symbol('on-change')

export class Action {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
  }
  /**
   * Emit a event with data
   * @param {Symbol} key - event name
   * @param {*} data
   */
  dispatch (key, data) {
    this.dispatcher.emit(key, data)
  }
}

export class Store extends EventEmitter {
  constructor (dispatcher) {
    super()
    this.dispatcher = dispatcher
  }
  /**
   * @param {Object} data
   */
  setState (data) {
    this.state = deepAssign({}, this.state, data)
    this.emit(ON_CHANGE)
  }
  /**
   * @returns {Object}
   */
  getState () {
    return deepAssign({}, this.state)
  }
  /**
   * @param {Sybol} key
   * @param {function} func
   */
  register (key, func) {
    this.dispatcher.on(key, func)
  }
  /**
   * @param {function} func
   */
  onChange (func) {
    this.on(ON_CHANGE, func)
  }
}
