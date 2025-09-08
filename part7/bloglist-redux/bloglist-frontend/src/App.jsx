import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import Menu from './components/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { logoutUser, initializeUser } from './reducers/authReducer'
import { createNotification } from './reducers/notificationReducer'
import Users from './components/Users'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import { Route, useMatch, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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

  return (
    <div>
      <Notification />
      <Menu />
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
        </div>
      }
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        {/* <Route path='/:id' element={<BlogDetail blog={blog} />} /> */}
      </Routes>
    </div>
  )
}

export default App