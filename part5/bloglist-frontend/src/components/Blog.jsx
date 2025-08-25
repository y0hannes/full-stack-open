import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const increaseLike = event => {
    event.preventDefault()
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const removeBlog = event => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button
          onClick={toggleVisiblity}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        Likes {blog.likes}
        <button
          onClick={increaseLike}>
          Like
        </button>
        <br />
        {blog.author}
        <br />
        <button
          onClick={removeBlog}>
          remove
        </button>
      </div>
    </div >
  )
}

export default Blog