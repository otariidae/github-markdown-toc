import { createEmptyHeadingList, isEmptyTree, Tree } from "./outline-utils"
import createFromUrl from "./page"
import { createSlice } from "@reduxjs/toolkit"

interface State {
  isLoading: boolean
  isOpen: boolean
  isEnabled: boolean
  heading: Tree
}

const initialState: State = {
  isLoading: false,
  isOpen: false,
  isEnabled: false,
  heading: createEmptyHeadingList(),
}

const slice = createSlice({
  name: "toc",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    moveToPage: (state, action) => {
      const { url, html } = action.payload
      const page = createFromUrl(url)
      const heading = page.getHeadingList(html)
      const isAvailable = !isEmptyTree(heading)
      state.heading = heading
      state.isLoading = false
      state.isEnabled = isAvailable
      state.isOpen = isAvailable ? state.isOpen : false
    },
    toggleNav: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { actions, reducer } = slice
