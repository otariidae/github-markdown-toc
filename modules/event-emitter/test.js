import { describe, it as test } from 'kocha'
import t from 'assert'
import { JSDOM } from 'jsdom'
const { CustomEvent } = new JSDOM('').window
import { EventTarget } from 'event-target-shim'
global.EventTarget = EventTarget
global.CustomEvent = CustomEvent
const { default: EventEmitter } = require('./index.js')

describe('event-emitter', () => {
  global.EventTarget = EventTarget
  global.CustomEvent = CustomEvent
  test('off', () => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const func = () => {
      t.fail()
    }
    emitter.on(type, func)

    emitter.off(type, func)
    emitter.off(type, () => {})
    emitter.off('undefined-type', () => {})

    emitter.emit(type)
  })

  test('on-emit', done => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const data = 'baz'
    const func = arg => {
      t.equal(arg, data)
      done()
    }

    emitter.on(type, func)
    emitter.emit(type, data)
  })
})
