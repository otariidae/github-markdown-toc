import { html, TemplateResult } from "lit-html"
import { Tree } from "../js/outline-utils"

const Link = (item: Tree): TemplateResult | string => {
  if (item.link) {
    return html`
      <a href="${item.link}">${item.text}</a>
    `
  }
  return item.text
}

const TreeList = (root: Tree): TemplateResult => html`
  <ol>
    ${
      root.sections.map(
        item => html`
          <li>
            ${Link(item)} ${item.sections.length !== 0 ? TreeList(item) : null}
          </li>
        `
      )
    }
  </ol>
`

export default TreeList
