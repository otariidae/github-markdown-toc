const { Store } = require('material-flux')
const key = require('./action-type.js')

class AppStore extends Store {
  constructor (context) {
    super(context)
    this.state = {
      context,
      isOpen: false,
      isEnabled: false,
      headers: []
    }
    this.register(key.MOVE_TO_PAGE, this.toPage)
    this.register(key.MOVE_TO_UNKNOWN, this.toUnknown)
    this.register(key.TOGGLE_NAV, this.toggleNav)
  }
  toPage ({ isAvailable, headers }) {
    this.setState({
      headers,
      isEnabled: isAvailable,
      isOpen: isAvailable ? this.state.isOpen : false
    })
  }
  toUnknown () {
    this.setState({
      isEnabled: false,
      isOpen: false
    })
  }
  toggleNav () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}

module.exports = AppStore
