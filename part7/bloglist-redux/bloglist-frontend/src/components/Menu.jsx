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
    dispatch(createNotification('logged out successfully'));
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div style={padding}>
      <Link to="/" style={padding}>
        blog
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.username} is logged in
      <button onClick={handleLogout} type="submit">
        logout
      </button>
    </div>
  );
};

export default Menu;
