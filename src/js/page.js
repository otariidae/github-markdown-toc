import {
  wrapSectionInOutline,
  createEmptyHeadingList,
  createOutlineFrom,
  findSectionBySelector
} from './outline-utils.js'
import PageType from './page-type.js'

/**
 * @param {string} url
 * @returns {GitHubPage}
 */
export default function createFromUrl (url) {
  const pagetype = new PageType(url)
  if (pagetype.isReleasePage()) return new ReleasePage()
  if (pagetype.isCodePage()) return new CodePage()
  if (pagetype.isWikiPage()) return new WikiPage()
  return new UnknownPage()
}

/**
 * @abstract
 */
export class GitHubPage {
  static _selector = 'body'
  /**
   * @returns {Object}
   */
  getHeadingList () {
    return createEmptyHeadingList()
  }
}

export class ReleasePage extends GitHubPage {
  static _selector = '.markdown-body'
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(ReleasePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createOutlineFrom(element)
  }
}

export class CodePage extends GitHubPage {
  static _selector = '.markdown-body'
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(CodePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createOutlineFrom(element)
  }
}

export class WikiPage extends GitHubPage {
  static _selector = '.wiki-body .markdown-body'
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(WikiPage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    const outline = createOutlineFrom(element)
    const section = findSectionBySelector(outline, WikiPage._selector)
    return section ? wrapSectionInOutline(section) : outline
  }
}

export class UnknownPage extends GitHubPage {}
