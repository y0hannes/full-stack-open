import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white rounded shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>

      <CommentForm />

      <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
        {blog.comments.map((comment) => (
          <li key={comment.id} className="border-b border-gray-200 pb-2">
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
