export enum PageTypes {
  RELEASE,
  CODE,
  WIKI,
  UNKNOWN
}

export function createPageTypesFromURL(url: string): PageTypes {
  const { pathname } = new URL(url)
  // the first element is empty
  const [, user, project, type, ...paths] = pathname.split("/")
  if (type === "releases" && paths.length === 0) {
    return PageTypes.RELEASE
  } else if (type === "blob" || type === "tree" || (user && project && !type)) {
    return PageTypes.CODE
  } else if (type === "wiki") {
    return PageTypes.WIKI
  } else {
    return PageTypes.UNKNOWN
  }
}
