import checkJSEnabled from './check-js-enabled.js'
import checkPageType, { key } from './check-page-type.js'
const headerSelector = 'h1, h2, h3, h4, h5, h6'

/**
 * @returns {HeaderList}
 */
function fetchReleaseHeader () {
  const hs = document.querySelectorAll('.release-title')
  return getHeaderDataFromReleaseDOM(hs)
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
  const hs = markdown.querySelectorAll(headerSelector)
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
 * @param {NodeList} nodelist
 * @returns {Promise<HeaderList, Error>}
 */
function getHeaderDataFromReleaseDOM (nodelist) {
  let arr = Array.from(nodelist)
  arr = validateHeaders(arr)
  return arr.map(h => {
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
 * @param {NodeList} nodelist
 * @returns {HeaderList}
 */
async function getHeaderDataFromMarkdownDOM (nodelist) {
  const isJSEnabled = await checkJSEnabled()
  let arr = Array.from(nodelist)
  arr = validateHeaders(arr)
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
 * @param {Element[]} arr
 * @returns {Element[]}
 */
function validateHeaders (arr) {
  return arr.filter(h => {
    return Boolean(h.textContent.trim())
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
