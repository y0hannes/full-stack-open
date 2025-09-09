import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const unSortedBlogs = useSelector((state) => state.blogs);
  const blogs = [...unSortedBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
