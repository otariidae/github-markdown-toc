import test from 'tape'
import EventEmitter from '../src/event-emitter.js'

test('event-emitter', t => {
  const emitter = new EventEmitter()
  const type = 'foo'
  const data = 'baz'
  t.test('on', t => {
    emitter.on(type, arg => {
      t.equal(arg, data)
      t.end()
    })
    emitter.emit(type, data)
  })
  t.end()
})
