import { html } from 'lit-html/lib/lit-extended'

const Link = item => {
  if (item.link) {
    return html`
      <a href="${item.link}">${item.text}</a>
    `
  }
  return item.text
}

const TreeList = root => html`
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
