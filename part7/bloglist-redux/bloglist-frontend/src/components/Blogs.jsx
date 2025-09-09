import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const unSortedBlogs = useSelector((state) => state.blogs);
  const blogs = [...unSortedBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Blogs App</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
