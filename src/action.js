const key = require('./action-type.js')
const { Action } = require('material-flux')
const checkPageType = require('./check-page-type.js')
const {
  fetchReleaseHeader,
  fetchMarkdownHeader,
  fetchWikiHeader
} = require('./get-header-data.js')

class AppAction extends Action {
  async moveToPage () {
    let headers
    const type = checkPageType(location.href)
    if (type === 'release') {
      headers = fetchReleaseHeader()
    } else if (type === 'code') {
      headers = await fetchMarkdownHeader()
    } else if (type === 'wiki') {
      headers = await fetchWikiHeader()
    } else {
      headers = []
    }
    const isAvailable = Boolean(headers.length)
    const data = {
      headers,
      isAvailable
    }
    this.dispatch(key.MOVE_TO_PAGE, data)
  }
  toggleNav () {
    this.dispatch(key.TOGGLE_NAV)
  }
}

module.exports = AppAction
