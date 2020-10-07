"use strict"

import "@webcomponents/custom-elements"
import App from "./components/app"
import { actions, reducer } from "./js/slice"
import { render } from "lit-html"
import { configureStore } from "@reduxjs/toolkit"

const dataAttr = "githubMarkdownTocOpen"
const body = document.body
const store = configureStore({
  reducer: reducer,
})

const rootElm = document.createElement("github-markdown-toc-container")
const onButtonClick = () => {
  const { isEnabled } = store.getState()
  if (!isEnabled) {
    return
  }
  store.dispatch(actions.toggleNav())
}
body.appendChild(rootElm)
store.subscribe(() => {
  render(App(Object.assign({}, store.getState(), { onButtonClick })), rootElm)
})
store.subscribe(() => {
  const { isOpen } = store.getState()
  if (isOpen) {
    body.dataset[dataAttr] = ""
  } else {
    delete body.dataset[dataAttr]
  }
})
window.addEventListener("pjax:start", () => {
  store.dispatch(actions.startLoading())
})
window.addEventListener("pjax:end", () => {
  store.dispatch(
    actions.moveToPage({
      url: location.href,
      html: document.body as HTMLBodyElement,
    })
  )
})
// init
store.dispatch(
  actions.moveToPage({
    url: location.href,
    html: document.body as HTMLBodyElement,
  })
)
