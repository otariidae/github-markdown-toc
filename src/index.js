'use strict'

const App = require('./app.html')
const AppContext = require('./context.js')
const checkPageType = require('./check-page-type.js')

const context = new AppContext()
const dataAttr = 'githubMarkdownTocOpen'
const body = document.body

function movePage () {
  const type = checkPageType(location.href)
  if (type !== 'unknown') {
    context.action.moveToPage(type)
  } else {
    context.action.moveToUnknown()
  }
}

const rootElm = document.createElement('github-markdown-toc-container')
const $app = new App({
  data: context.store.getState(),
  target: rootElm
})
body.appendChild(rootElm)
context.store.onChange(() => {
  $app.set(context.store.getState())
})
context.store.onChange(() => {
  const { isOpen } = context.store.getState()
  if (isOpen) {
    body.dataset[dataAttr] = ''
  } else {
    delete body.dataset[dataAttr]
  }
})
$app.on('toggle-nav', context.action.toggleNav.bind(context.action))
window.addEventListener('pjax:end', movePage)
// init
movePage()
