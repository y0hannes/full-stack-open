import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogServices'
import LoginService from './services/loginServices'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, modifyBlog, removeBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  // load previously logged user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await LoginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`welcome back ${user.username}`)
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch {
      setErrorMessage('wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setErrorMessage('logged out successfully')
    setSuccessMessage(null)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setErrorMessage(null)
    }
    catch {
      setErrorMessage(`can not create a blog ${newBlog.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const { user: _user, ...blogToUpdate } = updatedBlog
      dispatch(modifyBlog(blogToUpdate))
      setSuccessMessage(`blog ${updatedBlog.title} was successfully updated`)
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch {
      setErrorMessage(`can not update blog ${updatedBlog.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async deletedBlog => {
    try {
      if (window.confirm(`Delete ${deletedBlog.title} ?`)) {
        dispatch(removeBlog(deletedBlog))
        setSuccessMessage(`blog ${deletedBlog.title} was successfully deleted`)
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    }
    catch {
      setErrorMessage(`can not delete blog ${deletedBlog.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
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
