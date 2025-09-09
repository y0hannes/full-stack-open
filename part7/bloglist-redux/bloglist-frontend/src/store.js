import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogsReducer';
import authReducer from './reducers/authReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: authReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;
