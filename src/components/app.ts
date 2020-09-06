import { html } from "lit-html"
import List from "./tree-list"
import { Tree } from "../js/outline-utils"

const navId = "github-markdown-toc__nav-panel"

interface AppProp {
  isEnabled: boolean
  isLoading: boolean
  isOpen: boolean
  heading: Tree
  onButtonClick: (event: Event) => void
}

export default ({
  isEnabled,
  isLoading,
  isOpen,
  heading,
  onButtonClick,
}: AppProp) => html`
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
