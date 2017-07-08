export class Heading {
  parent = null
  children = []
  /**
   * @param {string} link
   * @param {number} level
   * @param {string} text
   */
  constructor (link = '', level = 1, text = '') {
    this.link = link
    this.level = level
    this.text = text
  }
  /**
   * @param {Heading} child
   * @returns {Heading}
   */
  appendChild (child) {
    this.children.push(child)
    child.parent = this
    return child
  }
}

export class HeadingRoot extends Heading {
  constructor () {
    super(null, 0, null)
  }
}
