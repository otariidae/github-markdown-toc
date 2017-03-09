const key = require('./action-type.js')
const { Action } = require('material-flux')
const checkJSEnabled = require('./check-js-enabled.js')
const checkPageType = require('./check-page-type.js')
const headerSelector = 'h1, h2, h3, h4, h5, h6'

class AppAction extends Action {
  async moveToPage () {
    let headers
    const type = checkPageType(location.href)
    if (type === 'release') {
      headers = this.fetchReleaseHeader()
    } else if (type === 'code') {
      headers = await this.fetchMarkdownHeader()
    } else if (type === 'wiki') {
      headers = await this.fetchWikiHeader()
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
    const readme = document.querySelector('.markdown-body')
    if (!readme) {
      return []
    }
    const hs = readme.querySelectorAll(headerSelector)
    return await this.getHeaderDataFromMarkdownDOM(hs)
  }
  async fetchWikiHeader () {
    const markdown = document.querySelector('.wiki-body .markdown-body')
    if (!markdown) {
      return []
    }
    let hs = markdown.querySelectorAll(headerSelector)
    hs = Array.from(hs).filter(h => {
      return Boolean(h.textContent.trim())
    })
    return await this.getHeaderDataFromMarkdownDOM(hs)
  }
  async getHeaderDataFromMarkdownDOM (nodelist) {
    const isJSEnabled = await checkJSEnabled()
    const arr = Array.isArray(nodelist) ? nodelist : Array.from(nodelist)
    return arr.map(h => {
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
