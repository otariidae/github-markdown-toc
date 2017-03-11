const EventEmitter = require('tiny-emitter')
const deepAssign = require('./deep-asign.js')
const key = require('./action-type.js')
const ON_CHANGE = Symbol('on-change')

class AppStore extends EventEmitter {
  constructor (dispatcher) {
    super()
    this.dispatcher = dispatcher
    this.state = {
      isOpen: false,
      isEnabled: false,
      headers: []
    }
    this.dispatcher.on(key.MOVE_TO_PAGE, this.toPage.bind(this))
    this.dispatcher.on(key.TOGGLE_NAV, this.toggleNav.bind(this))
  }
  toPage ({ isAvailable, headers }) {
    this.setState({
      headers,
      isEnabled: isAvailable,
      isOpen: isAvailable ? this.state.isOpen : false
    })
  }
  toggleNav () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  setState (data) {
    this.state = deepAssign({}, this.state, data)
    this.emit(ON_CHANGE)
  }
  onChange (func) {
    this.on(ON_CHANGE, func)
  }
  getState () {
    return deepAssign({}, this.state)
  }
}

module.exports = AppStore
