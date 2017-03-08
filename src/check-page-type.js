function checkPageType (url) {
  const { pathname: path } = new URL(url)
  const [, user, project, ...pathes] = path.split('/')
  if (pathes[0] === 'releases' && pathes.length === 1) {
    return 'release'
  } else if (pathes[0] === 'blob' || pathes[0] === 'tree' || (user && project && !pathes.length)) {
    return 'code'
  } else if (pathes[0] === 'wiki') {
    return 'wiki'
  }
  return 'unknown'
}

module.exports = checkPageType
