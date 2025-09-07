import { configureStore } from "@reduxjs/toolkit"
import blogReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer
  }
})

export default store