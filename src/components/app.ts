import { html } from 'lit-html'
import List from './tree-list'

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
    ?aria-disabled="${!isEnabled}"
    ?aria-busy="${isLoading}"
    ?data-open="${isOpen}"
  >
    <nav id="${navId}" ?aria-hidden="${!isOpen}">
      <noscript> <p class="flash flash-warn">Enable JavaScript</p> </noscript>
      ${List(heading)}
    </nav>
    <button
      type="button"
      @click="${onButtonClick}"
      class="toggle-btn"
      aria-controls="${navId}"
      ?disabled="${!isEnabled}"
    ></button>
  </div>
`
