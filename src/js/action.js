import createFromUrl from './page.js'
import { isEmptyTree } from './outline-utils.js'

export const key = {
  START_LOADING: 'start-loading',
  MOVE_TO_PAGE: 'move-to-page',
  TOGGLE_NAV: 'toggle-nav'
}

// action creators
export default {
  startLoading () {
    return {
      type: key.START_LOADING,
      payload: {}
    }
  },
  moveToPage () {
    const page = createFromUrl(location.href)
    const heading = page.getHeadingList(document.body)
    const isAvailable = !isEmptyTree(heading)

    return {
      type: key.MOVE_TO_PAGE,
      payload: {
        heading,
        isAvailable
      }
    }
  },
  toggleNav () {
    return {
      type: key.TOGGLE_NAV,
      payload: {}
    }
  }
}
