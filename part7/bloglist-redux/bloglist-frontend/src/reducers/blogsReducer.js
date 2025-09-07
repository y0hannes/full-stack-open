import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogServices'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch(setBlog(blogs))
  }
}

export const addBlog = blog => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(blog)
    dispatch(createBlog(newBlog))
  }
}

export const modifyBlog = blog => {
  return async (dispatch) => {
    await blogServices.update(blog)
    dispatch(updateBlog(blog))
  }
}

export const removeBlog = blog => {
  return async (dispatch) => {
    await blogServices.remove(blog)
    dispatch(deleteBlog(blog.id))
  }
}

export const {setBlog, createBlog, updateBlog, deleteBlog} = blogSlice.actions
export default blogSlice.reducer