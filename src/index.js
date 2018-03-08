'use strict'

import App from './components/app.js'
import { Dispatcher } from '../modules/flux/index.js'
import AppAction from './js/action.js'
import AppStore from './js/store.js'
import { render } from 'lit-html/lib/lit-extended'

const dispatcher = new Dispatcher()
const action = new AppAction(dispatcher)
const store = new AppStore(dispatcher)

const dataAttr = 'githubMarkdownTocOpen'
const body = document.body

const rootElm = document.createElement('github-markdown-toc-container')
const onButtonClick = () => {
  const { isEnabled } = store.getState()
  if (!isEnabled) {
    return
  }
  action.toggleNav()
}
body.appendChild(rootElm)
store.onChange(() => {
  render(App(Object.assign({}, store.getState(), { onButtonClick })), rootElm)
})
store.onChange(() => {
  const { isOpen } = store.getState()
  if (isOpen) {
    body.dataset[dataAttr] = ''
  } else {
    delete body.dataset[dataAttr]
  }
})
window.addEventListener('pjax:start', action.startLoading.bind(action))
window.addEventListener('pjax:end', action.moveToPage.bind(action))
// init
action.moveToPage()
