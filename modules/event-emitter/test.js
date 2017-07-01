import { describe, it as test } from 'kocha'
import t from 'assert'
import EventEmitter from './index.js'

describe('event-emitter', () => {
  test('on', () => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const func = () => {}
    emitter.on(type, func)
    t.ok(emitter._handlers.get(type).has(func))
  })
  describe('off', () => {
    const emitter = new EventEmitter()

    test('defined type', () => {
      const type = 'foo'
      const func = () => {}
      emitter.on(type, func)
      t.ok(emitter.off(type, func))
      t.ifError(emitter.off(type, () => {}))
    })
    test('undefined type', () => {
      t.ifError(emitter.off('undefined type', () => {}))
    })
  })
  test('emit', done => {
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

