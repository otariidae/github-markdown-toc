import { describe, it as test } from "kocha"
import { strict as t } from "assert"
import { EventTarget } from "event-target-shim"
global.EventTarget = EventTarget
import { createAction, Store } from "./index.ts"

const key = {
  INCREMENT: "increment",
  DECREMENT: "decrement"
}

const originalAction = {
  onClick() {
    return {
      type: key.INCREMENT
    }
  }
}

class TestStore extends Store {
  get initalState() {
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
    const action = createAction(originalAction, store)

    test("returned value", () => {
      t.deepEqual(action.onClick(), { type: key.INCREMENT })
    })
    test("state change", () => {
      t.deepEqual(store.state, { count: 1 })
    })
  })

  describe("store", () => {
    const store = new TestStore()
    const action = createAction(originalAction, store)

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
