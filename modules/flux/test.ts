import { describe, it as test } from "kocha"
import { strict as t } from "assert"
import { EventTarget } from "event-target-shim"
;(global as any).EventTarget = EventTarget
import { Store } from "./index"

const key = {
  INCREMENT: "increment",
  DECREMENT: "decrement"
}

const action = {
  onClick() {
    return {
      type: key.INCREMENT
    }
  }
}

class TestStore extends Store<{ count: number }> {
  getInitialState() {
    return {
      count: 0
    }
  }
  reduce(state, action) {
    if (action.type === key.INCREMENT) {
      state.count++
    }
    return state
  }
}

describe("flux", () => {
  describe("action", () => {
    const store = new TestStore()

    test("returned value", () => {
      t.deepEqual(action.onClick(), { type: key.INCREMENT })
    })
    test("state change", () => {
      store.dispatch(action.onClick())
      t.deepEqual(store.state, { count: 1 })
    })
  })

  describe("store", () => {
    const store = new TestStore()

    test("initial state", () => {
      t.deepEqual(store.state, { count: 0 })
    })
    test("onChange", done => {
      store.onChange(done)
      store.dispatch({ type: key.INCREMENT })
      store.removeChangeListener(done)
    })
    test("removeChangeListener", () => {
      const func = () => t.fail()
      store.onChange(func)
      store.removeChangeListener(func)
      store.dispatch({ type: key.INCREMENT })
    })
  })
})
