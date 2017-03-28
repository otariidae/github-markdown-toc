import PageType from './check-page-type.js'
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
 * @abstract
 */
export class GitHubPage {
  constructor () {
    /** @private */
    this.headerSelector = 'h1, h2, h3, h4, h5, h6'
    /** @type {Element[]} */
    this.headers = []
  }
  /**
   * @returns {Promise<Array>}
   */
  async getHeaderList () {
    return []
  }
  validateHeaders () {
    this.headers.filter(h => {
      return Boolean(h.textContent.trim())
    })
  }
  /**
   * @param {string} url
   */
  static createFromUrl (url) {
    const pagetype = new PageType(url)
    if (pagetype.isReleasePage()) {
      return new ReleasePage()
    } else if (pagetype.isCodePage()) {
      return new CodePage()
    } else if (pagetype.isWikiPage()) {
      return new WikiPage()
    } else if (pagetype.isUnknownPage()) {
      return new UnknownPage()
    }
  }
}

class ReleasePage extends GitHubPage {
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const hs = document.querySelectorAll('.release-title')
    return this.fromDOM(hs)
  }
  /**
   * @param {NodeList} nodelist
   * @returns {Promise<HeaderList, Error>}
   */
  fromDOM (nodelist) {
    let arr = Array.from(nodelist)
    arr = this.validateHeaders(arr)
    return arr.map(h => {
      const { href: link } = h.querySelector('a')
      const text = h.textContent.trim()
      /**
       * @type {HeaderObject}
       */
      return {
        link,
        level: 1,
        text
      }
    })
  }
}

class CodePage extends GitHubPage {
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const readme = document.querySelector('.markdown-body')
    if (!readme) {
      return []
    }
    const hs = readme.querySelectorAll(this.headerSelector)
    return await this.fromDOM(hs)
  }
  /**
   * @param {NodeList} nodelist
   * @returns {Promise<HeaderList, Error>}
   */
  async fromDOM (nodelist) {
    const isJSEnabled = await checkJSEnabled()
    let arr = Array.from(nodelist)
    arr = this.validateHeaders(arr)
    return arr.map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      /**
       * @type {HeaderObject}
       */
      return {
        link,
        level,
        text
      }
    })
  }
}

class WikiPage extends GitHubPage {
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const markdown = document.querySelector('.wiki-body .markdown-body')
    if (!markdown) {
      return []
    }
    const hs = markdown.querySelectorAll(this.headerSelector)
    return await this.fromDOM(hs)
  }
  /**
   * @param {NodeList} nodelist
   * @returns {Promise<HeaderList, Error>}
   */
  async fromDOM (nodelist) {
    const isJSEnabled = await checkJSEnabled()
    let arr = Array.from(nodelist)
    arr = this.validateHeaders(arr)
    return arr.map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      /**
       * @type {HeaderObject}
       */
      return {
        link,
        level,
        text
      }
    })
  }
}

class UnknownPage extends GitHubPage {
}
