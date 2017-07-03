import { map } from '../modules/functional-util/index.js'
import {
  createHeaders,
  querySelectorAllArray,
  selectAllHeaderElementFrom,
  element2ArrayAnchorAndFlatLevel,
  markdownElement2Array
} from './functions.js'
import PageType from './page-type.js'
import checkJSEnabled from './check-js-enabled.js'

/**
 * @abstract
 */
export default class PageFactory {
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

/**
 * @abstract
 */
export class GitHubPage {
  /**
   * @returns {Promise<Header>}
   */
  async getHeaderList () {
    return createHeaders(await this.elementsToArray())(
      this.getHeaders(document)
    )
  }
  /**
   * @private
   * @returns Array
   */
  getHeaders () {
    return []
  }
  /**
   * @private
   * @returns {Promise<function: Array, Error>}
   */
  async elementsToArray () {
    return () => []
  }
}

export class ReleasePage extends GitHubPage {
  /**
   * @private
   * @returns {Element[]}
   */
  getHeaders (root) {
    return querySelectorAllArray('.release-title')(root)
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    return map(element2ArrayAnchorAndFlatLevel(1))
  }
}

export class CodePage extends GitHubPage {
  /**
   * @private
   * @returns {Element[]}
   */
  getHeaders (root) {
    return selectAllHeaderElementFrom('.markdown-body')(root)
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    const isJSEnabled = await checkJSEnabled()
    return map(markdownElement2Array(isJSEnabled))
  }
}

export class WikiPage extends GitHubPage {
  /**
   * @private
   * @returns {Element[]}
   */
  getHeaders (root) {
    return selectAllHeaderElementFrom('.wiki-body .markdown-body')(root)
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    const isJSEnabled = await checkJSEnabled()
    return map(markdownElement2Array(isJSEnabled))
  }
}

export class UnknownPage extends GitHubPage {}
