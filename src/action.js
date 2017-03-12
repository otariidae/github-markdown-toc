const key = require('./action-type.js')
const { key: pageKey, checkPageType } = require('./check-page-type.js')
const {
  fetchReleaseHeader,
  fetchMarkdownHeader,
  fetchWikiHeader
} = require('./get-header-data.js')

class AppAction {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
  }
  async moveToPage () {
    let headers
    const type = checkPageType(location.href)
    if (type === pageKey.RELEASE) {
      headers = fetchReleaseHeader()
    } else if (type === pageKey.CODE) {
      headers = await fetchMarkdownHeader()
    } else if (type === pageKey.WIKI) {
      headers = await fetchWikiHeader()
    } else {
      headers = []
    }
    const isAvailable = Boolean(headers.length)
    const data = {
      headers,
      isAvailable
    }
    this.dispatcher.emit(key.MOVE_TO_PAGE, data)
  }
  toggleNav () {
    this.dispatcher.emit(key.TOGGLE_NAV)
  }
}

module.exports = AppAction
