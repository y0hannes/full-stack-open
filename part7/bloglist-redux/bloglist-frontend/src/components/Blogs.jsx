import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { createNotification } from '../reducers/notificationReducer'
import { removeBlog, modifyBlog } from '../reducers/blogsReducer'

const Blogs = () => {

  const unSortedBlogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogs = [...unSortedBlogs].sort((a, b) => b.likes - a.likes)

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
      <h2>blogs</h2>
      {
        blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))
      }
    </div>
  )
}

export default Blogs