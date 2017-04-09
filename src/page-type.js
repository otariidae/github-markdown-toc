export default class PageType {
  /**
   * @param {string} url
   */
  constructor (url) {
    /** @public */
    this.RELEASE = Symbol('release')
    this.CODE = Symbol('code')
    this.WIKI = Symbol('wiki')
    this.UNKNOWN = Symbol('unknown')
    const { pathname } = new URL(url)
    // the first element is empty
    const [, user, project, type, ...paths] = pathname.split('/')
    if (type === 'releases' && paths.length === 0) {
      this._type = this.RELEASE
    } else if (type === 'blob' || type === 'tree' || (user && project && !type)) {
      this._type = this.CODE
    } else if (type === 'wiki') {
      this._type = this.WIKI
    } else {
      this._type = this.UNKNOWN
    }
  }
  /**
   * @returns {Symbol}
   */
  getType () {
    return this._type
  }
  /**
   * @returns {boolean}
   */
  isReleasePage () {
    return this._type === this.RELEASE
  }
  /**
   * @returns {boolean}
   */
  isCodePage () {
    return this._type === this.CODE
  }
  /**
   * @returns {boolean}
   */
  isWikiPage () {
    return this._type === this.WIKI
  }
  /**
   * @returns {boolean}
   */
  isUnknownPage () {
    return this._type === this.UNKNOWN
  }
}
