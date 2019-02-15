import { trimmedText, isRoot } from "./functions"
import createOutline, { Outline, Section } from "h5o"

export interface Tree {
  text: string
  link: string | null
  sections: Tree[]
}

export const createEmptyHeadingList = (): Tree => ({
  text: "",
  link: null,
  sections: []
})

function wrapWithRoot(element: Element): HTMLElement {
  const frag = document.createDocumentFragment()
  const root = document.createElement("body")
  root.appendChild(element.cloneNode(true))
  frag.appendChild(root)
  return root
}

export function createOutlineFrom(element: Element): Outline {
  const root = isRoot(element) ? element : wrapWithRoot(element)
  return createOutline(root)
}

const isEmptyHeading = (section: Section): boolean =>
  "implied" in section.heading

function outline2tree(outline: Outline | Section): Tree {
  const sections = outline.sections.map(outline2tree)

  if ("heading" in outline && !isEmptyHeading(outline)) {
    const heading = outline.heading as HTMLHeadingElement
    const a = heading.querySelector("a")
    return {
      link: a ? a.href : null,
      text: trimmedText(heading),
      sections
    }
  }
  return {
    link: null,
    text: "",
    sections
  }
}

export function createTreeFrom(element: Element): Tree {
  const outline = createOutlineFrom(element)
  return outline2tree(outline)
}

export function outlineSectionIterator(outline: Tree): Iterable<Tree>
export function outlineSectionIterator(
  outline: Outline | Section
): Iterable<Section>
export function* outlineSectionIterator(outline: any): Iterable<any> {
  for (const section of outline.sections) {
    yield section
    yield* outlineSectionIterator(section)
  }
}

export function isEmptyOutline(outline: Outline): boolean {
  if (outline.sections.length === 0) {
    return true
  }
  const sections = [...outlineSectionIterator(outline)]
  const hasNonEmptySection = sections.some(section => !isEmptyHeading(section))
  return !hasNonEmptySection
}

export function isEmptyTree(tree: Tree): boolean {
  if (tree.sections.length === 0) {
    return true
  }
  const sections = [...outlineSectionIterator(tree)]
  const hasNonEmptyNode = sections.some((section: Tree) => section.text !== "")
  return !hasNonEmptyNode
}
