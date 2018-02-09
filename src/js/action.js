import { Action } from '../../modules/flux/index.js'
import createFromUrl from './page.js'
import { isEmptyOutline } from './outline-utils.js'

export const key = {
  START_LOADING: Symbol('start-loading'),
  MOVE_TO_PAGE: Symbol('move-to-page'),
  TOGGLE_NAV: Symbol('toggle-nav')
}

export default class AppAction extends Action {
  startLoading () {
    this.dispatch(key.START_LOADING)
  }
  moveToPage () {
    const page = createFromUrl(location.href)
    const heading = page.getHeadingList(document.body)
    const isAvailable = !isEmptyOutline(heading)
    const data = {
      heading,
      isAvailable
    }
    this.dispatch(key.MOVE_TO_PAGE, data)
  }
  toggleNav () {
    this.dispatch(key.TOGGLE_NAV)
  }
}
