const trim = (str: string): string => str.trim()

export const trimmedText = (node: Node): string => trim(node.textContent || "")

export const isSectioningRoot = (element: Element): boolean =>
  [
    "blockquote",
    "body",
    "details",
    "dialog",
    "fieldset",
    "figure",
    "td",
  ].includes(element.tagName.toLowerCase())
