import {
  LOGIN_UPDATE,
  LOGIN_UPDATE_PASSWORD,
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOGOUT,
  LOGIN_PRELOAD,
  LOGIN_CANCEL_PRELOAD,
} from '../constants/login';

import api from '../api';

export const updateLogin = login => ({
  type: LOGIN_UPDATE,
  login,
});

export const updatePassword = password => ({
  type: LOGIN_UPDATE_PASSWORD,
  password,
});

export const signIn = (login, password) => (dispatch) => {
  dispatch({
    type: LOGIN_SEND,
  });

  api.signIn(login, password, (error, user) => {
    if (error) {
      dispatch({
        type: LOGIN_FAILED,
        error,
      });
      return;
    }

    localStorage.setItem('login', login);
    localStorage.setItem('password', password);

    dispatch({
      type: LOGIN_SUCCESS,
      user,
    });
  });
};

export const signOut = () => {
  localStorage.removeItem('login');
  localStorage.removeItem('password');

  return {
    type: LOGIN_LOGOUT,
  };
};

export const preloadUser = () => (dispatch) => {
  const login = localStorage.getItem('login');
  const password = localStorage.getItem('password');

  if (!login || !password) {
    return;
  }

  dispatch({
    type: LOGIN_PRELOAD,
  });

  api.signIn(login, password, (error, user) => {
    if (error) {
      dispatch({
        type: LOGIN_CANCEL_PRELOAD,
      });
      return;
    }

    dispatch({
      type: LOGIN_SUCCESS,
      user,
    });
  });
};
