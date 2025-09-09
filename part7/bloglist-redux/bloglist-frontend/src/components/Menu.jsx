import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/authReducer';
import { createNotification } from '../reducers/notificationReducer';

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(createNotification('Logged out successfully'));
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex items-center justify-between">
      <div className="space-x-4">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Blog
        </Link>
        <Link
          to="/users"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Users
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-sm">
          {user.username} is logged in
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Menu;
