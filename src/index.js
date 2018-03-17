'use strict'

import App from './components/app.js'
import { createAction } from '../modules/flux/index.js'
import originalAction from './js/action.js'
import AppStore from './js/store.js'
import { render } from 'lit-html/lib/lit-extended'

const store = new AppStore()
const action = createAction(originalAction, store)

const dataAttr = 'githubMarkdownTocOpen'
const body = document.body

const rootElm = document.createElement('github-markdown-toc-container')
const onButtonClick = () => {
  const { isEnabled } = store.state
  if (!isEnabled) {
    return
  }
  action.toggleNav()
}
body.appendChild(rootElm)
store.onChange(() => {
  render(App(Object.assign({}, store.state, { onButtonClick })), rootElm)
})
store.onChange(() => {
  const { isOpen } = store.state
  if (isOpen) {
    body.dataset[dataAttr] = ''
  } else {
    delete body.dataset[dataAttr]
  }
})
window.addEventListener('pjax:start', action.startLoading)
window.addEventListener('pjax:end', action.moveToPage)
// init
action.moveToPage()
