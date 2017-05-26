import { prop, map, filter, pipe } from './functional-util.js'
import PageType from './page-type.js'
import checkJSEnabled from './check-js-enabled.js'

/**
 * @typedef {Object} HeaderObject
 * @property {string} link
 * @property {number} level
 * @property {string} text
 */

/**
 * @typedef {HeaderObject[]} HeaderList
 */

/**
 * @param {string} link
 * @param {number} level
 * @param {string} text
 * @returns {HeaderObject}
 */
function createHeader (link, level, text) {
  return {
    link,
    level,
    text
  }
}

/**
 * @param {string} query
 * @returns {function(root: Element): NodeList}
 */
function querySelectorAll (query) {
  return function querySelectorAllInner (root) {
    return root.querySelectorAll(query)
  }
}

/**
 * @param {string} query
 * @returns {function(root: Element): Element[]}
 */
function querySelectorAllArray (query) {
  return pipe(querySelectorAll(query), Array.from)
}

const hasEmptyText = pipe(prop('textContent'), Boolean)

const filterEmptyText = fun => pipe(filter(hasEmptyText), fun)

/**
 * @abstract
 */
export default class GitHubPage {
  constructor () {
    /** @private */
    this._headerSelector = 'h1, h2, h3, h4, h5, h6'
    /** @type {Element[]} */
    this.headers = []
  }
  /**
   * @returns {Promise<Array>}
   */
  async getHeaderList () {
    return this.headers
  }
  /**
   * @param {string} url
   */
  static createFromUrl (url) {
    const pagetype = new PageType(url)
    if (pagetype.isReleasePage()) return new ReleasePage()
    if (pagetype.isCodePage()) return new CodePage()
    if (pagetype.isWikiPage()) return new WikiPage()
    return new UnknownPage()
  }
}

class ReleasePage extends GitHubPage {
  constructor () {
    super()
    this.headers = querySelectorAllArray('.release-title')(document)
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    return filterEmptyText(map(h => {
      const { href: link } = h.querySelector('a')
      const level = 1
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    }))(this.headers)
  }
}

class CodePage extends GitHubPage {
  constructor () {
    super()
    const readme = document.querySelector('.markdown-body')
    this.headers = readme ? querySelectorAllArray(this._headerSelector)(readme) : this.headers
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return filterEmptyText(map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    }))(this.headers)
  }
}

class WikiPage extends GitHubPage {
  constructor () {
    super()
    const markdown = document.querySelector('.wiki-body .markdown-body')
    this.headers = markdown ? querySelectorAllArray(this._headerSelector)(markdown) : this.headers
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return filterEmptyText(map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    }))(this.headers)
  }
}

class UnknownPage extends GitHubPage {
}
