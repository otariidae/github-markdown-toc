import EventEmitter from "../event-emitter"
import produce from "immer"
const ON_CHANGE = "on-change"
const ON_ACTION = "on-action"

const clone = arg => produce(arg, arg => arg)

export const createAction = (actions, store) => {
  const copy = {}

  // Wrap action creators
  // When an action creator is called, trigger store.dispatch
  for (const [prop, actionCreator] of Object.entries(actions)) {
    copy[prop] = (...args) => {
      const action = actionCreator(...args)
      store.dispatch(action)
      return action
    }
  }

  return copy
}

export class Store extends EventEmitter {
  constructor() {
    super()
    /** @private */
    this._state = this.initalState

    this.on(ON_ACTION, action => {
      // update state
      this._state = this.reduce(this._state, action)
      this.emit(ON_CHANGE)
    })
  }
  /**
   * dispatch an action
   * @param {action} Object
   */
  dispatch(action) {
    this.emit(ON_ACTION, action)
  }
  /**
   * @returns {object}
   */
  get state() {
    return clone(this._state)
  }
  /**
   * @param {function} func
   */
  onChange(func) {
    this.on(ON_CHANGE, func)
  }
  /**
   * @param {function} func
   */
  removeChangeListener(func) {
    this.off(ON_CHANGE, func)
  }
}
