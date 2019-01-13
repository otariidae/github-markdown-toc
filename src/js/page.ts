import { createEmptyHeadingList, createTreeFrom } from './outline-utils'
import PageType from './page-type'

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
  /**
   * @returns {Object}
   */
  getHeadingList () {
    return createEmptyHeadingList()
  }
}
GitHubPage._selector = 'body'

export class ReleasePage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(ReleasePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}
ReleasePage._selector = '.repository-content'

export class CodePage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(CodePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}
CodePage._selector = '.markdown-body'

export class WikiPage extends GitHubPage {
  /**
   * @returns {Object}
   */
  getHeadingList (root) {
    const element = root.querySelector(WikiPage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}
WikiPage._selector = '.wiki-body .markdown-body'

export class UnknownPage extends GitHubPage {}
