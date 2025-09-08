import { useEffect, useState } from "react"
import Blog from "./Blog"
import { useParams } from "react-router-dom"
import usersServices from "../services/usersServices"

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  useEffect(() => {
    const fetch = async () => {
      const response = await usersServices.getUser(id)
      setUser(response)
    }
    fetch()
  }, [id])

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