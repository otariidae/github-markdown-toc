import { map } from '../../modules/functional-util/index.js'
import {
  createHeadings,
  querySelectorAllArray,
  selectAllHeaderElementFrom,
  element2ArrayAnchorAndFlatLevel,
  markdownElement2Array
} from './functions.js'
import PageType from './page-type.js'

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
   * @returns {Promise<Heading>}
   */
  async getHeadingList () {
    return createHeadings(await this.elementsToArray())(
      this.getHeadings(document)
    )
  }
  /**
   * @private
   * @returns Array
   */
  getHeadings () {
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
  getHeadings (root) {
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
  getHeadings (root) {
    return selectAllHeaderElementFrom('.markdown-body')(root)
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    return map(markdownElement2Array())
  }
}

export class WikiPage extends GitHubPage {
  /**
   * @private
   * @returns {Element[]}
   */
  getHeadings (root) {
    return selectAllHeaderElementFrom('.wiki-body .markdown-body')(root)
  }
  /**
   * @private
   * @returns {Promise<function(Element[]): Array, Error>}
   */
  async elementsToArray () {
    return map(markdownElement2Array())
  }
}

export class UnknownPage extends GitHubPage {}