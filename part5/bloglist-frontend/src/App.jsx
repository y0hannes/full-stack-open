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
    catch {
      setErrorMessage('error fetching blogs')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      await blogService.create(newBlog)
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setBlogs(blogs.concat(newBlog))
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
      await blogService.update(blogToUpdate)
      setBlogs(blogs.map(
        (blog) => blog.id !== updatedBlog.id ? blog : updatedBlog
      ))
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
        await blogService.remove(deletedBlog)
        setBlogs(blogs.filter(
          (blog) => blog.id !== deletedBlog.id
        ))
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
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
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