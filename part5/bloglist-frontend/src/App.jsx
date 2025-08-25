import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef(false)

  // load previously logged user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const getBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    catch (error) {
      setErrorMessage('error fetching blogs')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
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

      getBlogs()
    }
    catch (error) {
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
      const response = await blogService.create(newBlog)
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setBlogs(blogs.concat(newBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setErrorMessage(null)
    }
    catch (error) {
      setErrorMessage('can not create a blog')
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App