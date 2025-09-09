import { createSlice } from '@reduxjs/toolkit';
import loginServices from '../services/loginServices';
import blogServices from '../services/blogServices';

const initialState = null;

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(State) {
      return null;
    },
  },
});

export const initializeUser = (loggedUser) => {
  return async (dispatch) => {
    const user = JSON.parse(loggedUser);
    dispatch(login(user));
    blogServices.setToken(user.token);
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginServices.login(credentials);
    dispatch(login(user));
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogServices.setToken(user.token);
    return user;
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logout());
    window.localStorage.removeItem('loggedUser');
  };
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
