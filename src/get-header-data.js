import checkJSEnabled from './check-js-enabled.js'
import checkPageType, { key } from './check-page-type.js'
const headerSelector = 'h1, h2, h3, h4, h5, h6'

/**
 * @returns {HeaderList}
 */
function fetchReleaseHeader () {
  const hs = document.querySelectorAll('.release-title')
  if (!hs) {
    return []
  }
  return Array.from(hs).map(h => {
    const { href: link } = h.querySelector('a')
    const text = h.textContent.trim()
    /**
     * @type {HeaderObject}
     */
    return {
      link,
      level: 1,
      text
    }
  })
}

/**
 * @returns {Promise<HeaderList, Error>}
 */
async function fetchMarkdownHeader () {
  const readme = document.querySelector('.markdown-body')
  if (!readme) {
    return []
  }
  const hs = readme.querySelectorAll(headerSelector)
  return await getHeaderDataFromMarkdownDOM(hs)
}

/**
 * @returns {Promise<HeaderList, Error>}
 */
async function fetchWikiHeader () {
  const markdown = document.querySelector('.wiki-body .markdown-body')
  if (!markdown) {
    return []
  }
  let hs = markdown.querySelectorAll(headerSelector)
  hs = Array.from(hs).filter(h => {
    return Boolean(h.textContent.trim())
  })
  return await getHeaderDataFromMarkdownDOM(hs)
}

/**
 * @typedef {Object} HeaderObject
 * @property {string} link
 * @property {number} level
 * @property {string} text
 */

/**
 * @typedef {HeaderObject[]} HeaderList
 */

/**
 * @param {NodeList|Element[]} nodelist
 * @returns {Promise<HeaderList, Error>}
 */
async function getHeaderDataFromMarkdownDOM (nodelist) {
  const isJSEnabled = await checkJSEnabled()
  const arr = Array.isArray(nodelist) ? nodelist : Array.from(nodelist)
  return arr.map(h => {
    let { id, href } = h.querySelector('.anchor')
    id = `#${id}`
    href = new URL(href).hash
    const link = isJSEnabled ? href : id
    const level = Number(h.tagName[1])
    const text = h.textContent.trim()
    /**
     * @type {HeaderObject}
     */
    return {
      link,
      level,
      text
    }
  })
}

/**
 * @returns {HeaderList}
 */
export default async function fetchHeader () {
  const type = checkPageType(location.href)
  if (type === key.RELEASE) {
    return fetchReleaseHeader()
  } else if (type === key.CODE) {
    return await fetchMarkdownHeader()
  } else if (type === key.WIKI) {
    return await fetchWikiHeader()
  } else {
    return []
  }
}
