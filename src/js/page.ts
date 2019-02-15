import { createEmptyHeadingList, createTreeFrom, Tree } from "./outline-utils"
import PageType from "./page-type"

interface GitHubPage {
  getHeadingList(root?: Element): Tree
}

export class ReleasePage implements GitHubPage {
  private static readonly _selector: string = ".repository-content"
  public getHeadingList(root: Element) {
    const element = root.querySelector(ReleasePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}

export class CodePage implements GitHubPage {
  private static readonly _selector: string = ".markdown-body"
  public getHeadingList(root: Element) {
    const element = root.querySelector(CodePage._selector)
    if (!element) {
      return createEmptyHeadingList()
    }
    return createTreeFrom(element)
  }
}

export class WikiPage implements GitHubPage {
  private static readonly _selector: string = ".wiki-body .markdown-body"
  public getHeadingList(root: Element) {
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
  const pagetype = new PageType(url)
  if (pagetype.isReleasePage()) return new ReleasePage()
  if (pagetype.isCodePage()) return new CodePage()
  if (pagetype.isWikiPage()) return new WikiPage()
  return new UnknownPage()
}
