import { describe, it as test } from "kocha"
import { strict as t } from "assert"
import { JSDOM } from "jsdom"
const { CustomEvent } = new JSDOM("").window
import { EventTarget } from "event-target-shim"
;(global as any).EventTarget = EventTarget
;(global as any).CustomEvent = CustomEvent
import EventEmitter from "./index"

describe("event-emitter", () => {
  ;(global as any).EventTarget = EventTarget
  ;(global as any).CustomEvent = CustomEvent
  test("off", () => {
    const emitter = new EventEmitter()
    const type = "foo"
    const func = () => {
      t.fail()
    }
    emitter.on(type, func)

    emitter.off(type, func)
    emitter.off(type, () => {})
    emitter.off("undefined-type", () => {})

    emitter.emit(type)
  })

  test("on-emit", done => {
    const emitter = new EventEmitter()
    const type = "foo"
    const data = "baz"
    const func = arg => {
      t.equal(arg, data)
      done()
    }

    emitter.on(type, func)
    emitter.emit(type, data)
  })
})
