import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const setNotification = (content, sec) => {
  return async (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, sec * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer