import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogServices'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, modifyBlog, removeBlog } from './reducers/blogsReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/authReducer'
import { createNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(createNotification(`welcome back ${user.username}`))
    }
    catch (exception) {
      dispatch(createNotification('Error: wrong credentials'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(createNotification('logged out successfully'))
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      dispatch(createNotification(`a new blog ${newBlog.title} by ${newBlog.author}`))
    }
    catch {
      dispatch(createNotification(`Error: can not create a blog ${newBlog.title}`))
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const { user: _user, ...blogToUpdate } = updatedBlog
      dispatch(modifyBlog(blogToUpdate))
      dispatch(createNotification(`blog ${updatedBlog.title} was successfully updated`))
    }
    catch {
      dispatch(createNotification(`Error: can not update blog ${updatedBlog.title}`))
    }
  }

  const deleteBlog = async (deletedBlog) => {
    try {
      if (window.confirm(`Delete ${deletedBlog.title} ?`)) {
        dispatch(removeBlog(deletedBlog))
        dispatch(createNotification(`blog ${deletedBlog.title} was successfully deleted`))
      }
    }
    catch {
      dispatch(createNotification(`Error: can not delete blog ${deletedBlog.title}`))
    }
  }

  return (
    <div>
      <Notification />
      {
        user === null &&
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
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
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>

          <h2>blogs</h2>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App