const key = require('./action-type.js')
const { Action } = require('material-flux')
const checkJSEnabled = require('./check-js-enabled.js')
const checkPageType = require('./check-page-type.js')

class AppAction extends Action {
  async moveToPage () {
    let headers
    const type = checkPageType(location.href)
    if (type === 'release') {
      headers = this.fetchReleaseHeader()
    } else if (type === 'code' || type === 'wiki') {
      headers = await this.fetchMarkdownHeader()
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
  fetchReleaseHeader () {
    const hs = document.querySelectorAll('.release-title')
    if (!hs) {
      return []
    }
    return Array.from(hs).map(h => {
      const { href: link } = h.querySelector('a')
      // all level is 1
      const tag = 'lv1'
      const text = h.textContent.trim()
      return {
        link,
        tag,
        text
      }
    })
  }
  async fetchMarkdownHeader () {
    const isJSEnabled = await checkJSEnabled()
    const readme = document.querySelector('.markdown-body')
    if (!readme) {
      return []
    }
    const hs = readme.querySelectorAll('h1, h2, h3, h4, h5, h6')
    return Array.from(hs).map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const tag = h.tagName.replace('H', 'lv')
      const text = h.textContent.trim()
      return {
        link,
        tag,
        text
      }
    })
  }
}

module.exports = AppAction
