const AppAction = require('./action.js')
const AppStore = require('./store.js')
const { Context } = require('material-flux')

class AppContext extends Context {
  constructor () {
    super()
    this.action = new AppAction(this)
    this.store = new AppStore(this)
  }
}

module.exports = AppContext
