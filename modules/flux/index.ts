import EventEmitter from "../event-emitter"

export interface AnyAction {
  type: string | symbol
  payload?: any
}

enum Types {
  ON_CHANGE = "on-change",
  ON_ACTION = "on-action"
}

export abstract class Store<T> extends EventEmitter {
  private _state: T
  protected abstract getInitialState(): T
  protected abstract reduce(state: T, action: AnyAction): T
  constructor() {
    super()
    this._state = this.getInitialState()

    this.on(Types.ON_ACTION, (action: AnyAction) => {
      // update state
      this._state = this.reduce(this._state, action)
      this.emit(Types.ON_CHANGE)
    })
  }
  public dispatch(action: AnyAction) {
    this.emit(Types.ON_ACTION, action)
  }
  public get state(): T {
    return this._state
  }
  public onChange(func: () => void) {
    this.on(Types.ON_CHANGE, func)
  }
  public removeChangeListener(func: () => void) {
    this.off(Types.ON_CHANGE, func)
  }
}
