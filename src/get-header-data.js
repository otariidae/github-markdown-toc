import checkJSEnabled from './check-js-enabled.js'
const headerSelector = 'h1, h2, h3, h4, h5, h6'

export function fetchReleaseHeader () {
  const hs = document.querySelectorAll('.release-title')
  if (!hs) {
    return []
  }
  return Array.from(hs).map(h => {
    const { href: link } = h.querySelector('a')
    // all level is 1
    const tag = 'lv1'
    const text = h.textContent.trim()
    return {
      link,
      tag,
      text
    }
  })
}

export async function fetchMarkdownHeader () {
  const readme = document.querySelector('.markdown-body')
  if (!readme) {
    return []
  }
  const hs = readme.querySelectorAll(headerSelector)
  return await getHeaderDataFromMarkdownDOM(hs)
}

export async function fetchWikiHeader () {
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

async function getHeaderDataFromMarkdownDOM (nodelist) {
  const isJSEnabled = await checkJSEnabled()
  const arr = Array.isArray(nodelist) ? nodelist : Array.from(nodelist)
  return arr.map(h => {
    let { id, href } = h.querySelector('.anchor')
    id = `#${id}`
    href = new URL(href).hash
    const link = isJSEnabled ? href : id
    const tag = h.tagName.replace('H', 'lv')
    const text = h.textContent.trim()
    return {
      link,
      tag,
      text
    }
  })
}
