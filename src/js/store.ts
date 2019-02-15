import { AnyAction, Store } from "../../modules/flux";
import { startLoading, moveToPage, toggleNav } from "./action"
import { createEmptyHeadingList, isEmptyTree, Tree } from "./outline-utils"
import produce from "immer"
import createFromUrl from "./page"
import { isType } from "typescript-fsa"

interface State {
  isLoading: boolean
  isOpen: boolean
  isEnabled: boolean
  heading: Tree
}

export default class AppStore extends Store<State> {
  protected getInitialState() {
    return {
      isLoading: false,
      isOpen: false,
      isEnabled: false,
      heading: createEmptyHeadingList()
    }
  }
  protected reduce(state: State, action: AnyAction): State {
    return produce(state, state => {
      if (isType(action, startLoading)) {
        state.isLoading = true
      } else if (isType(action, moveToPage)) {
        const { url, html } = action.payload
        const page = createFromUrl(url)
        const heading = page.getHeadingList(html)
        const isAvailable = !isEmptyTree(heading)
        state.heading = heading
        state.isLoading = false
        state.isEnabled = isAvailable
        state.isOpen = isAvailable ? this.state.isOpen : false
      } else if (isType(action, toggleNav)) {
        state.isOpen = !state.isOpen
      }

      return state
    })
  }
}
