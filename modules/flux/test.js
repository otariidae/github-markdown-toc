import { describe, it as test } from 'kocha'
import t from 'assert'
import { EventTarget } from 'event-target-shim'
global.EventTarget = EventTarget
import { Action, Store, Dispatcher } from './index.js'

const key = {
  BAR: 'bar',
  HOGE: 'hoge'
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
      t.deepStrictEqual(data, testData)
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
        t.deepStrictEqual(state, testData)
        t.ifError(Object.is(state, testData))
        done()
      })
      dispatcher.emit(key.HOGE, testData)
    })
    test('removeChangeListener', () => {
      const dispatcher = new Dispatcher()
      const store = new TestStore(dispatcher)
      const func = () => {
        t.fail()
      }
      store.onChange(func)
      store.removeChangeListener(func)
      store.setState({
        foo: 'bar'
      })
    })
  })
})
