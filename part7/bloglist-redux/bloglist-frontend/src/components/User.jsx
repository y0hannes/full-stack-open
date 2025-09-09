import Blog from './Blog';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600">Added blogs:</p>

      <div className="space-y-2">
        {user.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default User;
