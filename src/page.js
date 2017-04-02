import PageType from './page-type.js'
import checkJSEnabled from './check-js-enabled.js'

/*
  WIP
*/

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
export default class GitHubPage {
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
    this.headers = this.headers.filter(h => {
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
  constructor () {
    super()
    this.headers = Array.from(document.querySelectorAll('.release-title'))
    this.validateHeaders()
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    return this.headers.map(h => {
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
  constructor () {
    super()
    const readme = document.querySelector('.markdown-body')
    if (!readme) {
      this.headers = []
    } else {
      this.headers = Array.from(readme.querySelectorAll(this.headerSelector))
    }
    this.validateHeaders()
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return this.headers.map(h => {
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
  constructor () {
    super()
    const markdown = document.querySelector('.wiki-body .markdown-body')
    if (!markdown) {
      this.headers = []
    } else {
      this.headers = Array.from(markdown.querySelectorAll(this.headerSelector))
    }
    this.validateHeaders()
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return this.headers.map(h => {
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
