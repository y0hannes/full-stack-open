import CommentForm from "./CommentForm"

const Comments = ({ blog }) => {

  return (
    <div>
      <h3>comments</h3>
      <CommentForm />
      <ul>
        {blog.comments.map(
          comment =>
            <li key={comment.id}>{comment.content} </li>
        )}
      </ul>
    </div>
  )
}

export default Comments