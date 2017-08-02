'use strict'

import App from './components/app.html'
import { Dispatcher } from '../modules/flux/index.js'
import AppAction from './js/action.js'
import AppStore from './js/store.js'

const dispatcher = new Dispatcher()
const action = new AppAction(dispatcher)
const store = new AppStore(dispatcher)

const dataAttr = 'githubMarkdownTocOpen'
const body = document.body

const rootElm = document.createElement('github-markdown-toc-container')
const app = new App({
  data: store.getState(),
  target: rootElm
})
body.appendChild(rootElm)
store.onChange(() => {
  app.set(store.getState())
})
store.onChange(() => {
  const { isOpen } = store.getState()
  if (isOpen) {
    body.dataset[dataAttr] = ''
  } else {
    delete body.dataset[dataAttr]
  }
})
app.on('toggle-nav', action.toggleNav.bind(action))
window.addEventListener('pjax:start', action.startLoading.bind(action))
window.addEventListener('pjax:end', action.moveToPage.bind(action))
// init
action.moveToPage()
