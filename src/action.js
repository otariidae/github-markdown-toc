import { Action } from '../modules/flux/index.js'
import pageFactory from './page.js'

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
    const page = pageFactory.createFromUrl(location.href)
    const header = await page.getHeaderList()
    const isAvailable = Boolean(header.children.length)
    const data = {
      header,
      isAvailable
    }
    this.dispatch(key.MOVE_TO_PAGE, data)
  }
  toggleNav () {
    this.dispatch(key.TOGGLE_NAV)
  }
}
