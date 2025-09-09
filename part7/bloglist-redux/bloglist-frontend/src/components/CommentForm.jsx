import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogsReducer"

const CommentForm = () => {
  const [content, setContent] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()

  const createComment = event => {
    event.preventDefault()
    const comment = {content}
    dispatch(commentBlog(id, comment))
    setContent('')
  }

  return (
    <form onSubmit={createComment}>
      <input
        type="text"
        placeholder="any comment"
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      <button type="submit">Add comment</button>
    </form>
  )
}

export default CommentForm