export class Heading {
  /**
   * @param {string} link
   * @param {number} level
   * @param {string} text
   */
  constructor (link = '', level = 1, text = '') {
    this.link = link
    this.level = level
    this.text = text
    this.parent = null
    this.children = []
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
