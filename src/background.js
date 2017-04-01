'use strict'
chrome.runtime.onMessage.addListener(({ type }, { url }, sendResponse) => {
  if (type === 'is-js-enabled') {
    chrome.contentSettings.javascript.get({
      primaryUrl: url
    }, ({ setting }) => {
      const state = setting === 'allow'
      sendResponse(state)
    })
    return true
  }
})
