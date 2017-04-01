'use strict'
import { Store } from '../modules/flux/index.js'
import { key } from './action.js'

export default class AppStore extends Store {
  constructor (dispatcher) {
    super(dispatcher)
    this.setState({
      isLoading: false,
      isOpen: false,
      isEnabled: false,
      headers: []
    })
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
      isOpen: isAvailable ? this.getState().isOpen : false
    })
  }
  toggleNav () {
    this.setState({
      isOpen: !this.getState().isOpen
    })
  }
}
