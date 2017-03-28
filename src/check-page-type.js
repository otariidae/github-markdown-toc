/**
 * @type {Object.<string, Symbol>}
 */
export const key = {
  RELEASE: Symbol('release'),
  CODE: Symbol('code'),
  WIKI: Symbol('wiki'),
  UNKNOWN: Symbol('unknown')
}

/**
 * @param {string[])
 * @returns {boolean}
 */
function isReleasePage ([, , type, ...paths]) {
  return type === 'releases' && paths.length === 0
}

/**
 * @param {string[]}
 * @returns {boolean}
 */
function isCodePage ([user, project, type]) {
  return type === 'blob' || type === 'tree' || (user && project && !type)
}

/**
 * @param {string[]}
 * @returns {boolean}
 */
function isWikiPage ([, , type]) {
  return type === 'wiki'
}

/**
 * @param {string} url
 * @returns {Symbol}
 */
export default function checkPageType (url) {
  const { pathname: path } = new URL(url)
  // the first element is empty
  const [, ...paths] = path.split('/')
  if (isReleasePage(paths)) {
    return key.RELEASE
  } else if (isCodePage(paths)) {
    return key.CODE
  } else if (isWikiPage(paths)) {
    return key.WIKI
  }
  return key.UNKNOWN
}
