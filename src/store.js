const EventEmitter = require('tiny-emitter')
const deepAssign = require('./deep-asign.js')
const key = require('./action-type.js')
const ON_CHANGE = Symbol('on-change')

class AppStore extends EventEmitter {
  constructor (dispatcher) {
    super()
    this.dispatcher = dispatcher
    this.state = {
      isLoading: false,
      isOpen: false,
      isEnabled: false,
      headers: []
    }
    this.dispatcher.on(key.START_LOADING, this.loading.bind(this))
    this.dispatcher.on(key.MOVE_TO_PAGE, this.toPage.bind(this))
    this.dispatcher.on(key.TOGGLE_NAV, this.toggleNav.bind(this))
  }
  loading () {
    this.setState({
      isLoading: true
    })
  }
  toPage ({ isAvailable, headers }) {
    this.setState({
      headers,
      isLoading: false,
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
