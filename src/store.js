const { Store } = require('./flux.js')
const key = require('./action-type.js')

class AppStore extends Store {
  constructor (dispatcher) {
    super(dispatcher)
    this.state = {
      isLoading: false,
      isOpen: false,
      isEnabled: false,
      headers: []
    }
    this.register(key.START_LOADING, this.loading.bind(this))
    this.register(key.MOVE_TO_PAGE, this.toPage.bind(this))
    this.register(key.TOGGLE_NAV, this.toggleNav.bind(this))
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
}

module.exports = AppStore
