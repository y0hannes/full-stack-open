import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { createNotification } from '../reducers/notificationReducer';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const createBlog = async (newBlog) => {
    try {
      blogFormRef?.current?.toggleVisibility();
      dispatch(addBlog(newBlog));
      dispatch(
        createNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      );
    } catch {
      dispatch(
        createNotification(`Error: can not create a blog ${newBlog.title}`)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new </h2>

      <form onSubmit={handleSubmit}>
        <label>
          title
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          author
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          url
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit" id="create-btn">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
