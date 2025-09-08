import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogServices'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import Menu from './components/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, modifyBlog, removeBlog } from './reducers/blogsReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/authReducer'
import { createNotification } from './reducers/notificationReducer'
import Users from './components/Users'
import User from './components/User'
import { Link, Route, useMatch, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogFormRef = useRef(false)

  // load previously logged user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      dispatch(initializeUser(loggedUser))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(createNotification('logged out successfully'))
  }

  // const userById = id => {
  //   return users.find(user => user.id === id)
  // }

  // const match = useMatch('/users/:id')
  // const profile = match
  //   ? userById(Number(match.params.id))
  //   : null

  return (
    <div>
      <Notification />
      {/* <Menu /> */}
      {
        user === null &&
        <LoginForm />
      }
      {user &&
        <div>
          <p>
            {user.username} is logged in
            <button
              onClick={handleLogout}
              type="submit"
            >
              logout
            </button>
          </p>

          <Togglable
            buttonLabel="Add new blog"
            ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs />
        </div>
      }
      {/* <Routes>
        <Route path='/' element={<Blog />} />
        <Route parh='/users' element={<Users />} />
        <Route parh='/users/:id' element={<User profile={profile} />} />
      </Routes> */}
    </div>
  )
}

export default App