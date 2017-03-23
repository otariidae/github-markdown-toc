/**
 * @returns {Promise<boolean, Error>}
 */
export default function checkJSEnebled () {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({
      type: 'is-js-enabled'
    }, resolve)
  })
}
