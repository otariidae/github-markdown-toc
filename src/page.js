import { map, pipe } from './functional-util.js'
import { createHeader, querySelectorAllArray, filterEmptyText, selectAllHeaderElement } from './functions.js'
import PageType from './page-type.js'
import checkJSEnabled from './check-js-enabled.js'

/**
 * @abstract
 */
export default class GitHubPage {
  constructor () {
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
    return pipe(filterEmptyText, (map(h => {
      const { href: link } = h.querySelector('a')
      const level = 1
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    })))(this.headers)
  }
}

class CodePage extends GitHubPage {
  constructor () {
    super()
    const readme = document.querySelector('.markdown-body')
    this.headers = readme ? selectAllHeaderElement(readme) : this.headers
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return pipe(filterEmptyText, (map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    })))(this.headers)
  }
}

class WikiPage extends GitHubPage {
  constructor () {
    super()
    const markdown = document.querySelector('.wiki-body .markdown-body')
    this.headers = markdown ? selectAllHeaderElement(markdown) : this.headers
  }
  /**
   * @returns {Promise<HeaderList, Error>}
   */
  async getHeaderList () {
    const isJSEnabled = await checkJSEnabled()
    return pipe(filterEmptyText, (map(h => {
      let { id, href } = h.querySelector('.anchor')
      id = `#${id}`
      href = new URL(href).hash
      const link = isJSEnabled ? href : id
      const level = Number(h.tagName[1])
      const text = h.textContent.trim()
      return createHeader(link, level, text)
    })))(this.headers)
  }
}

class UnknownPage extends GitHubPage {
}
