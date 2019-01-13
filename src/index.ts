'use strict'

import '@webcomponents/custom-elements'
import App from './components/app'
import { createAction } from '../modules/flux'
import originalAction from './js/action'
import AppStore from './js/store'
import { render } from 'lit-html'

const store = new AppStore()
const action: any = createAction(originalAction, store)

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
