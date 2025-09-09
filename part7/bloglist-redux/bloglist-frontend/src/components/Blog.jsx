import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className="p-4 border border-gray-300 rounded hover:shadow-md transition-shadow">
      <Link
        to={`/${blog.id}`}
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {blog.title} <span className="text-gray-600">by {blog.author}</span>
      </Link>
    </div>
  );
};

export default Blog;
