const trim = (str: string): string => str.trim()

export const trimmedText = (node: Node): string => trim(node.textContent || "")

const toLowerCase = (str: string): string => str.toLowerCase()

const toLowerTagName = (elm: Element): string => toLowerCase(elm.tagName)

const createTagNameMatcher = (tagNames: string[]) => (elm: Element): boolean =>
  tagNames.map(toLowerCase).includes(toLowerTagName(elm))

const isSectioningRoot = createTagNameMatcher([
  "blockquote",
  "body",
  "details",
  "dialog",
  "fieldset",
  "figure",
  "td"
])

const isSectioningContent = createTagNameMatcher([
  "article",
  "aside",
  "nav",
  "section"
])

type Pred = (...args: any[]) => boolean

const or = (fun1: Pred, fun2: Pred): Pred => (...args) =>
  fun1(...args) || fun2(...args)

export const isRoot = or(isSectioningRoot, isSectioningContent)
