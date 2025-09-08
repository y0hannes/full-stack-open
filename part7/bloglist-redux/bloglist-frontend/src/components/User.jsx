import Blog from "./Blog"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)

  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }
  return (
    <div>
      <p>
        {user.name}
      </p>
      added blogs
      {user.blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog} />
      ))}
    </div>
  )
}

export default User