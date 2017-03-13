import { Action } from './flux.js'
import key from './action-type.js'
import { key as pageKey, checkPageType } from './check-page-type.js'
import {
  fetchReleaseHeader,
  fetchMarkdownHeader,
  fetchWikiHeader
} from './get-header-data.js'

class AppAction extends Action {
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

export default AppAction
