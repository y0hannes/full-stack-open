import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogsReducer';
import { createNotification } from '../reducers/notificationReducer';

const CommentForm = () => {
  const [content, setContent] = useState('');
  const id = useParams().id;
  const dispatch = useDispatch();

  const createComment = (event) => {
    event.preventDefault();
    if (!content.trim()) return;
    const comment = { content };
    dispatch(commentBlog(id, comment));
    dispatch(createNotification('Comment is added to blog'));
    setContent('');
  };

  return (
    <form onSubmit={createComment} className="flex space-x-2 mt-4">
      <input
        type="text"
        placeholder="Add a comment..."
        value={content}
        onChange={({ target }) => setContent(target.value)}
        className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
};

export default CommentForm;
