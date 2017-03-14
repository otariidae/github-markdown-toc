import { Action } from './flux.js'
import checkPageType, { key as pageKey } from './check-page-type.js'
import {
  fetchReleaseHeader,
  fetchMarkdownHeader,
  fetchWikiHeader
} from './get-header-data.js'

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
    let headers
    const type = checkPageType(location.href)
    if (type === pageKey.RELEASE) {
      headers = fetchReleaseHeader()
    } else if (type === pageKey.CODE) {
      headers = await fetchMarkdownHeader()
    } else if (type === pageKey.WIKI) {
      headers = await fetchWikiHeader()
    } else {
      headers = []
    }
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
