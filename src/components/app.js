import { html } from 'lit-html/lib/lit-extended'
import List from './tree-list.js'

const navId = 'github-markdown-toc__nav-panel'

export default ({
  isEnabled,
  isLoading,
  isOpen,
  heading,
  onButtonClick
}) => html`
<div
  class="github-markdown-toc"
  aria-disabled$="${!isEnabled}"
  aria-busy$="${isLoading}"
  data-open$="${isOpen}">
  <nav id="${navId}" aria-hidden$="${!isOpen}">
    <noscript>
      <p class="flash flash-warn">Enable JavaScript</p>
    </noscript>
    ${List(heading)}
  </nav>
  <button
    type="button"
    on-click="${onButtonClick}"
    class="toggle-btn"
    aria-controls$="${navId}"
    disabled?="${!isEnabled}"></button>
</div>`
