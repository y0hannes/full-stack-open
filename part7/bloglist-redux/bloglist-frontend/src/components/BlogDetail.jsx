import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { modifyBlog, removeBlog } from '../reducers/blogsReducer';
import Comments from './Comments';

const BlogDetail = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const updateBlog = async (updatedBlog) => {
    try {
      const { user: _user, ...blogToUpdate } = updatedBlog;
      dispatch(modifyBlog(blogToUpdate));
      dispatch(
        createNotification(
          `Blog "${updatedBlog.title}" was successfully updated`
        )
      );
    } catch {
      dispatch(
        createNotification(
          `Error: could not update blog "${updatedBlog.title}"`
        )
      );
    }
  };

  const deleteBlog = async (deletedBlog) => {
    try {
      if (window.confirm(`Delete "${deletedBlog.title}"?`)) {
        dispatch(removeBlog(deletedBlog));
        dispatch(
          createNotification(
            `Blog "${deletedBlog.title}" was successfully deleted`
          )
        );
        navigate('/');
      }
    } catch {
      dispatch(
        createNotification(
          `Error: could not delete blog "${deletedBlog.title}"`
        )
      );
    }
  };

  const increaseLike = (event) => {
    event.preventDefault();
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{blog.title}</h2>
        <p className="text-gray-600 text-sm">by {blog.author}</p>
      </div>

      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {blog.url}
      </a>

      <div className="flex items-center gap-4">
        <p className="text-gray-800 font-medium">Likes: {blog.likes}</p>
        <button
          onClick={increaseLike}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded"
        >
          Like
        </button>
      </div>

      <div>
        <button
          onClick={handleRemove}
          className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
        >
          Remove
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetail;
