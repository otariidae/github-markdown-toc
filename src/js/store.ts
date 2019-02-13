import { Store } from "../../modules/flux"
import { key } from "./action"
import { createEmptyHeadingList } from "./outline-utils"
import produce from "immer"

const { START_LOADING, MOVE_TO_PAGE, TOGGLE_NAV } = key

export default class AppStore extends Store {
  get initalState() {
    return {
      isLoading: false,
      isOpen: false,
      isEnabled: false,
      heading: createEmptyHeadingList()
    }
  }
  reduce(state, action) {
    return produce(state, state => {
      const { type, payload } = action

      if (type === START_LOADING) {
        state.isLoading = true
      } else if (type === MOVE_TO_PAGE) {
        const { isAvailable, heading } = payload
        state.heading = heading
        state.isLoading = false
        state.isEnabled = isAvailable
        state.isOpen = isAvailable ? this.state.isOpen : false
      } else if (type === TOGGLE_NAV) {
        state.isOpen = !state.isOpen
      }

      return state
    })
  }
}
