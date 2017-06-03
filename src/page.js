import { prop, map, pipe, always } from './functional-util.js'
import { createHeaders, querySelector, querySelectorAllArray, selectAllHeaderElement, trimmedText, headerLevel, hrefOrID, element2Array } from './functions.js'
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
   * @returns {Promise<HeaderList>}
   */
  async getHeaderList () {
    return createHeaders(await this.elementsToArray())(this.headers)
  }
  /**
   * @private
   * @returns {Promise<function: Array, Error>}
   */
  async elementsToArray () {
    return () => []
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
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    return map(element2Array(
      pipe(querySelector('a'), prop('href')),
      always(1),
      trimmedText
    ))
  }
}

class CodePage extends GitHubPage {
  constructor () {
    super()
    const readme = document.querySelector('.markdown-body')
    this.headers = readme ? selectAllHeaderElement(readme) : this.headers
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    const isJSEnabled = await checkJSEnabled()
    return map(element2Array(
      pipe(querySelector('.anchor'), hrefOrID(isJSEnabled)),
      headerLevel,
      trimmedText
    ))
  }
}

class WikiPage extends GitHubPage {
  constructor () {
    super()
    const markdown = document.querySelector('.wiki-body .markdown-body')
    this.headers = markdown ? selectAllHeaderElement(markdown) : this.headers
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    const isJSEnabled = await checkJSEnabled()
    return map(element2Array(
      pipe(querySelector('.anchor'), hrefOrID(isJSEnabled)),
      headerLevel,
      trimmedText
    ))
  }
}

class UnknownPage extends GitHubPage {
}
