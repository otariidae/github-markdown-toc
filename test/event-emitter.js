import test from 'tape'
import EventEmitter from '../modules/event-emitter/index.js'

test('event-emitter', t => {
  t.test('on', t => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const func = () => {
    }
    emitter.on(type, func)
    t.ok(emitter._handlers.get(type).has(func))
    t.end()
  })
  t.test('off', t => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const func = () => {
    }
    emitter.on(type, func)
    t.ok(emitter.off(type, func))
    t.end()
  })
  t.test('emit', t => {
    const emitter = new EventEmitter()
    const type = 'foo'
    const data = 'baz'
    const func = (arg) => {
      t.equal(arg, data)
      t.end()
    }
    emitter.on(type, func)
    emitter.emit(type, data)
  })
  t.end()
})
