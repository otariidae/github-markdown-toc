export default class PageType {
  static RELEASE = Symbol('release')
  static CODE = Symbol('code')
  static WIKI = Symbol('wiki')
  static UNKNOWN = Symbol('unknown')
  /** @private */
  _type
  /**
   * @param {string} url
   */
  constructor (url) {
    const { pathname } = new URL(url)
    // the first element is empty
    const [, user, project, type, ...paths] = pathname.split('/')
    if (type === 'releases' && paths.length === 0) {
      this._type = PageType.RELEASE
    } else if (
      type === 'blob' ||
      type === 'tree' ||
      (user && project && !type)
    ) {
      this._type = PageType.CODE
    } else if (type === 'wiki') {
      this._type = PageType.WIKI
    } else {
      this._type = PageType.UNKNOWN
    }
  }
  /**
   * @returns {boolean}
   */
  isReleasePage () {
    return this._type === PageType.RELEASE
  }
  /**
   * @returns {boolean}
   */
  isCodePage () {
    return this._type === PageType.CODE
  }
  /**
   * @returns {boolean}
   */
  isWikiPage () {
    return this._type === PageType.WIKI
  }
  /**
   * @returns {boolean}
   */
  isUnknownPage () {
    return this._type === PageType.UNKNOWN
  }
}
