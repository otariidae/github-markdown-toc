import { createEmptyHeadingList, createTreeFrom, Tree } from "./outline-utils"
import { createPageTypesFromURL, PageTypes } from "./page-type"

interface GitHubPage {
  getHeadingList(root?: ParentNode): Tree
}

export class ReleasePage implements GitHubPage {
  private static readonly _selector: string = ".repository-content"
  public getHeadingList(root: ParentNode) {
    const element = root.querySelector(ReleasePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}

export class CodePage implements GitHubPage {
  private static readonly _selector: string = ".markdown-body"
  public getHeadingList(root: ParentNode) {
    const element = root.querySelector(CodePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}

export class WikiPage implements GitHubPage {
  private static readonly _selector: string = ".wiki-body .markdown-body"
  public getHeadingList(root: ParentNode) {
    const element = root.querySelector(WikiPage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}

export class UnknownPage implements GitHubPage {
  public getHeadingList() {
    return createEmptyHeadingList()
  }
}

export default function createFromUrl(url: string): GitHubPage {
  const pagetype = createPageTypesFromURL(url)
  if (pagetype === PageTypes.RELEASE) return new ReleasePage()
  if (pagetype === PageTypes.CODE) return new CodePage()
  if (pagetype === PageTypes.WIKI) return new WikiPage()
  if (pagetype === PageTypes.UNKNOWN) return new UnknownPage()
  throw new Error("invalid pagetype detected")
}
