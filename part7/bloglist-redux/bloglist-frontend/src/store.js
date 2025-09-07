import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogsReducer'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: authReducer,
    notification: notificationReducer,
  }
})

export default store