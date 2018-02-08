import {
  wrapSectionInOutline,
  createEmptyHeadingList,
  createOutlineFrom,
  findSectionBySelector
} from './outline-utils.js'
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
   * @returns {Object}
   */
  getHeadingList () {
    return createEmptyHeadingList()
  }
}

export class ReleasePage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector('.markdown-body')
    if (!element) {
      return createEmptyHeadingList()
    }
    return createOutlineFrom(element)
  }
}

export class CodePage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector('.markdown-body')
    if (!element) {
      return createEmptyHeadingList()
    }
    return createOutlineFrom(element)
  }
}

export class WikiPage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector('.wiki-body .markdown-body')
    if (!element) {
      return createEmptyHeadingList()
    }
    const outline = createOutlineFrom(element)
    const section = findSectionBySelector(outline, '.wiki-body .markdown-body')
    return section ? wrapSectionInOutline(section) : outline
  }
}

export class UnknownPage extends GitHubPage {}
