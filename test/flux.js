import test from 'tape'
import { Action, Store } from '../src/flux.js'
import EventEmitter from 'tiny-emitter'

const key = {
  BAR: Symbol('bar'),
  HOGE: Symbol('hoge')
}

class TestAction extends Action {
  foo (data) {
    this.dispatch(key.BAR, data)
  }
}

class TestStore extends Store {
  constructor (dispatcher) {
    super(dispatcher)
    this.state = {}
    this.register(key.HOGE, this.onHoge.bind(this))
  }
  onHoge (data) {
    this.setState(data)
  }
}

test('flux-action', t => {
  const testData = {
    baz: true
  }
  const dispatcher = new EventEmitter()
  const action = new TestAction(dispatcher)
  dispatcher.on(key.BAR, data => {
    t.deepEqual(data, testData)
    t.end()
  })
  action.foo(testData)
})

test('flux-store', t => {
  const testData = {
    piyo: false
  }
  const dispatcher = new EventEmitter()
  const store = new TestStore(dispatcher)
  store.onChange(() => {
    const state = store.getState()
    t.deepEqual(state, testData)
    t.notOk(Object.is(state, testData))
    t.end()
  })
  dispatcher.emit(key.HOGE, testData)
})
