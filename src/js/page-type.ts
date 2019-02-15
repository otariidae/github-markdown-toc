enum Types {
  RELEASE,
  CODE,
  WIKI,
  UNKNOWN
}

export default class PageType {
  private readonly _type: Types
  constructor(url: string) {
    const { pathname } = new URL(url)
    // the first element is empty
    const [, user, project, type, ...paths] = pathname.split("/")
    if (type === "releases" && paths.length === 0) {
      this._type = Types.RELEASE
    } else if (
      type === "blob" ||
      type === "tree" ||
      (user && project && !type)
    ) {
      this._type = Types.CODE
    } else if (type === "wiki") {
      this._type = Types.WIKI
    } else {
      this._type = Types.UNKNOWN
    }
  }
  public isReleasePage(): boolean {
    return this._type === Types.RELEASE
  }
  public isCodePage(): boolean {
    return this._type === Types.CODE
  }
  public isWikiPage(): boolean {
    return this._type === Types.WIKI
  }
  public isUnknownPage(): boolean {
    return this._type === Types.UNKNOWN
  }
}
