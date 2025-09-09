import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>

      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition"
          >
            <Link
              to={`/users/${user.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {user.username}
            </Link>
            <span className="text-sm text-gray-600">
              {user.blogs.length} blogs
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
