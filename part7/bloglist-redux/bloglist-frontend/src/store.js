import { configureStore } from "@reduxjs/toolkit"
import blogReducer from './reducers/blogsReducer'
import authReducer from "./reducers/authReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: authReducer
  }
})

export default store