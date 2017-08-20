import { describe, it as test } from 'kocha'
import t from 'assert'
import EventEmitter from './index.js'

describe('event-emitter', () => {
  describe('on', () => {
    test('string', () => {
      const emitter = new EventEmitter()
      const type = 'foo'
      emitter.on(type, () => {})

      t.ok(emitter._has(type))
    })

    test('symbol', () => {
      const emitter = new EventEmitter()
      const type = Symbol('foo')
      emitter.on(type, () => {})

      t.ok(emitter._has(type))
    })

    test('2 handlers', () => {
      const emitter = new EventEmitter()
      const type0 = 'foo'
      const type1 = Symbol('foo')
      const func = () => {}
      emitter.on(type0, () => {})
      emitter.on(type1, () => {})

      t.ok(emitter._has(type0))
      t.ok(emitter._has(type1))
    })
  })

  describe('off', () => {
    test('defined type and defined handler', () => {
      const emitter = new EventEmitter()
      const type = 'foo'
      const func = () => {}
      emitter.on(type, func)

      t.ok(emitter.off(type, func))
    })

    test('defined type and undefined handler', () => {
      const emitter = new EventEmitter()
      const type = 'foo'
      emitter.on(type, () => {
        return 'foo'
      })

      t.ifError(emitter.off(type, () => {}))
    })

    test('undefined type', () => {
      const emitter = new EventEmitter()
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
