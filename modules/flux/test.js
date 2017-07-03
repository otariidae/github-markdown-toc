import { describe, it as test } from 'kocha'
import t from 'assert'
import { Action, Store, Dispatcher } from './index.js'

const key = {
  BAR: Symbol('bar'),
  HOGE: Symbol('hoge')
}

class TestAction extends Action {
  foo(data) {
    this.dispatch(key.BAR, data)
  }
}

class TestStore extends Store {
  constructor(dispatcher) {
    super(dispatcher)
    this.state = {}
    this.register(key.HOGE, this.onHoge.bind(this))
  }
  onHoge(data) {
    this.setState(data)
  }
}

describe('flux', () => {
  test('action', done => {
    const testData = {
      baz: true
    }
    const dispatcher = new Dispatcher()
    const action = new TestAction(dispatcher)
    dispatcher.on(key.BAR, data => {
      t.deepEqual(data, testData)
      done()
    })
    action.foo(testData)
  })

  describe('store', () => {
    test('onChange', done => {
      const testData = {
        piyo: false
      }
      const dispatcher = new Dispatcher()
      const store = new TestStore(dispatcher)
      store.onChange(() => {
        const state = store.getState()
        t.deepEqual(state, testData)
        t.ifError(Object.is(state, testData))
        done()
      })
      dispatcher.emit(key.HOGE, testData)
    })
    test('removeChangeListener', done => {
      const dispatcher = new Dispatcher()
      const store = new TestStore(dispatcher)
      const func = () => {}
      store.onChange(func)
      t.ok(store.removeChangeListener(func))
      done()
    })
  })
})
