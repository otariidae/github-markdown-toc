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
 * @param {string} url
 * @returns {Symbol}
 */
export default function checkPageType (url) {
  const { pathname: path } = new URL(url)
  const [, user, project, ...pathes] = path.split('/')
  if (pathes[0] === 'releases' && pathes.length === 1) {
    return key.RELEASE
  } else if (pathes[0] === 'blob' || pathes[0] === 'tree' || (user && project && !pathes.length)) {
    return key.CODE
  } else if (pathes[0] === 'wiki') {
    return key.WIKI
  }
  return key.UNKNOWN
}
