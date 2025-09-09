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
        createNotification(`blog ${updatedBlog.title} was successfully updated`)
      );
    } catch {
      dispatch(
        createNotification(`Error: can not update blog ${updatedBlog.title}`)
      );
    }
  };

  const deleteBlog = async (deletedBlog) => {
    try {
      if (window.confirm(`Delete ${deletedBlog.title} ?`)) {
        dispatch(removeBlog(deletedBlog));
        dispatch(
          createNotification(
            `blog ${deletedBlog.title} was successfully deleted`
          )
        );
        navigate('/');
      }
    } catch {
      dispatch(
        createNotification(`Error: can not delete blog ${deletedBlog.title}`)
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
    <div>
      {blog.title} {blog.author}
      {blog.url}
      <br />
      Likes {blog.likes}
      <button onClick={increaseLike}>Like</button>
      <br />
      <button onClick={handleRemove}>remove</button>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetail;
