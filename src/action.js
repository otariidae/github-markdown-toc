import { Action } from '../modules/flux/index.js'
import fetchHeader from './get-header-data.js'

export const key = {
  START_LOADING: Symbol('start-loading'),
  MOVE_TO_PAGE: Symbol('move-to-page'),
  TOGGLE_NAV: Symbol('toggle-nav')
}

export default class AppAction extends Action {
  startLoading () {
    this.dispatch(key.START_LOADING)
  }
  async moveToPage () {
    const headers = await fetchHeader()
    const isAvailable = Boolean(headers.length)
    const data = {
      headers,
      isAvailable
    }
    this.dispatch(key.MOVE_TO_PAGE, data)
  }
  toggleNav () {
    this.dispatch(key.TOGGLE_NAV)
  }
}
