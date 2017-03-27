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
  const [, user, project, ...paths] = path.split('/')
  if (paths[0] === 'releases' && paths.length === 1) {
    return key.RELEASE
  } else if (paths[0] === 'blob' || paths[0] === 'tree' || (user && project && !paths.length)) {
    return key.CODE
  } else if (paths[0] === 'wiki') {
    return key.WIKI
  }
  return key.UNKNOWN
}
