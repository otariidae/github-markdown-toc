import { describe, it as test } from 'kocha'
import t from 'assert'
import checkJSEnebled from '../src/check-js-enabled.js'

describe('checkJSEnabled', () => {
  const fakeChrome = {
    runtime: {
      sendMessage(option, callback) {
        t.equal(option.type, 'is-js-enabled')
        t.equal(typeof callback, 'function')
        callback(true)
      }
    }
  }
  test('option & callback', done => {
    global.chrome = fakeChrome
    checkJSEnebled()
      .catch(done)
      .then(() => {
        delete global.chrome
      })
      .then(done)
  })
  test('resolved value', done => {
    global.chrome = fakeChrome
    checkJSEnebled()
      .catch(done)
      .then(value => {
        t.ok(value)
        delete global.chrome
      })
      .then(done)
  })
})
