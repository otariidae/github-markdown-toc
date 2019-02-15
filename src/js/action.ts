import actionCreatorFactory from "typescript-fsa"

enum key {
  START_LOADING = "start-loading",
  MOVE_TO_PAGE = "move-to-page",
  TOGGLE_NAV = "toggle-nav"
}

const actionCreator = actionCreatorFactory()

export const startLoading = actionCreator<void>(key.START_LOADING)

export const moveToPage = actionCreator<{
  url: string
  html: HTMLBodyElement
}>(key.MOVE_TO_PAGE)

export const toggleNav = actionCreator<void>(key.TOGGLE_NAV)
