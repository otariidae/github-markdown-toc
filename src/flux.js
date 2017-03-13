const EventEmitter = require('tiny-emitter')
const deepAssign = require('./deep-asign.js')
const ON_CHANGE = Symbol('on-change')

class Action {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
  }
  dispatch (key, data) {
    this.dispatcher.emit(key, data)
  }
}

class Store extends EventEmitter {
  constructor (dispatcher) {
    super()
    this.dispatcher = dispatcher
  }
  setState (data) {
    this.state = deepAssign({}, this.state, data)
    this.emit(ON_CHANGE)
  }
  getState () {
    return deepAssign({}, this.state)
  }
  register (key, func) {
    this.dispatcher.on(key, func)
  }
  onChange (func) {
    this.on(ON_CHANGE, func)
  }
}

module.exports = {
  Action,
  Store
}
