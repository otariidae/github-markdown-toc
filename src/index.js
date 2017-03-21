'use strict'

import App from './app.html'
import EventEmitter from 'tiny-emitter'
import AppAction from './action.js'
import AppStore from './store.js'

const dispatcher = new EventEmitter()
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
